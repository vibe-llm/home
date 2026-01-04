import React, {useEffect, useState, useCallback} from 'react'
import {Session, User} from '@supabase/supabase-js'
import {supabase} from '@/lib/supabase'
import {AuthContext} from "@/contexts/authUtil.tsx";

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, _setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  // ====== OAuth code 处理逻辑 ======
  const [codeError, setCodeError] = useState<string | null>(null)
  // processedCode 长期存储，页面刷新不丢失
  const [processedCode, setProcessedCodeState] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('processed_code');
    }
    return null;
  });
  // 包装 setProcessedCode，写入 localStorage
  const setProcessedCode = (code: string | null) => {
    setProcessedCodeState(code);
    if (typeof window !== 'undefined') {
      if (code) {
        localStorage.setItem('processed_code', code);
      } else {
        localStorage.removeItem('processed_code');
      }
    }
  };

  const setSession = useCallback((_session: Session | null) => {
    if (!session || !_session || session.access_token != _session.access_token) {
      _setSession(_session)
      setUser(_session?.user ?? null)
    }
  }, [session])

  // 初始化 session
  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      setLoading(true)
      const {data: {session}} = await supabase.auth.getSession()
      setSession(session)
      setLoading(false)
    }
    if (loading) {
      void getInitialSession()
    }
  }, [loading, setSession])

  // 监听 session 的更新
  useEffect(() => {
    // Listen for auth changes
    if (!loading) {
      const {data: {subscription}} = supabase.auth.onAuthStateChange(
        async (event, _session) => {
          if (session?.access_token != _session?.access_token) {
            console.log('Auth state changed:', event, _session?.user?.email)

            // Handle SIGNED_IN event to ensure proper redirect
            if (event === 'SIGNED_IN' && _session) {
              console.log('User signed in successfully:', _session.user.email)
              setSession(_session)
              // The hash router will handle the redirect automatically
            }

            // Handle SIGNED_OUT event
            if (event === 'SIGNED_OUT') {
              console.log('User signed out - clearing local state')
              // Clear any stored auth state
              setSession(null)
            }
          }
          setLoading(false)
        }
      )

      return () => subscription.unsubscribe()
    }
  }, [loading, session, setSession])

  // 新增：显式 code 处理方法，供外部调用
  const authWithCode = async (code: string, redirectParam?: string | null, error?: string | null, errorDescription?: string | null) => {
    if (!code && !error) return;
    // 防止重复处理同一个 code
    if (code && processedCode === code) {
      setCodeError('该 code 已被处理')
      return
    }

    if (error) {
      setCodeError(errorDescription || error)
      return
    }

    if (code) {
      setCodeError(null)
      try {
        const {data, error} = await supabase.auth.exchangeCodeForSession(code)
        if (error && processedCode != code) {
          setCodeError(error.message)
          setProcessedCode(code)
          setSession(data.session)
          return
        }
        setCodeError(null)
        setProcessedCode(code)
      } catch (e) {
        setCodeError('发生未知错误:' + e)
      }
    }
  }

  const signInWithGoogle = async (redirectTo: string = '/dashboard') => {
    // 使用根路径作为回调 URL
    const baseUrl = window.location.origin
    const callbackUrl = baseUrl // 回调到根路径
    console.log('Environment:', import.meta.env.MODE)
    console.log('Base URL:', baseUrl)
    console.log('Signing in with Google, callback URL:', callbackUrl)
    console.log('Will redirect to:', redirectTo)

    // Store the final redirect destination in sessionStorage
    sessionStorage.setItem('oauth_redirect_to', redirectTo)

    const {error} = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: callbackUrl,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    })

    if (error) {
      console.error('Error signing in with Google:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      // First try to sign out globally with scope
      const {error: globalError} = await supabase.auth.signOut({scope: 'global'})

      if (globalError) {
        console.warn('Global sign out failed, trying local sign out:', globalError)

        // Check if it's a 403 error
        if (globalError.status === 403) {
          console.log('403 error detected, forcing local session cleanup')
          await forceLocalSignOut()
          return
        }

        // Fallback to local sign out
        const {error: localError} = await supabase.auth.signOut()
        if (localError && localError.status === 403) {
          console.log('Local sign out also got 403, forcing cleanup')
          await forceLocalSignOut()
          return
        }

        if (localError) {
          console.error('Error signing out:', localError)
          await forceLocalSignOut()
        }
      }
    } catch (error) {
      console.error('Error during sign out process:', error)
      await forceLocalSignOut()
      throw error
    }
  }

  const forceLocalSignOut = async () => {
    try {
      console.log('Force clearing local session and cache')

      // Clear Supabase session
      await supabase.auth.setSession({access_token: '', refresh_token: ''})

      // Clear local storage items related to auth
      const localStorageKeys = Object.keys(localStorage)
      localStorageKeys.forEach(key => {
        if (key.includes('supabase') || key.includes('auth')) {
          console.log('Removing localStorage key:', key)
          localStorage.removeItem(key)
        }
      })

      // Clear session storage items related to auth, but preserve PKCE flow items
      const sessionStorageKeys = Object.keys(sessionStorage)
      sessionStorageKeys.forEach(key => {
        // Skip PKCE-related items to prevent OAuth flow issues
        if (key.includes('supabase') && !key.includes('pkce') && !key.includes('verifier') && !key.includes('challenge')) {
          console.log('Removing sessionStorage key:', key)
          sessionStorage.removeItem(key)
        } else if (key.includes('auth') && !key.includes('oauth')) {
          console.log('Removing sessionStorage key:', key)
          sessionStorage.removeItem(key)
        }
      })

      // Update local state immediately
      setSession(null)

      console.log('Local auth cache cleared successfully')
    } catch (error) {
      console.error('Error during forced local sign out:', error)
      // Even if cleanup fails, update the state
      setSession(null)
    }
  }

  const getAccessToken = async () => {
    // 优先从当前 session 获取 access_token
    if (session?.access_token) {
      return session.access_token;
    }
    // 如果 session 不存在，尝试从 supabase 获取最新 session
    const {data, error} = await supabase.auth.getSession();
    if (error) {
      console.error('获取 session 失败:', error);
      return null;
    }
    if (data.session?.access_token) {
      setSession(data.session); // 同步本地 session
      return data.session.access_token;
    }
    return null;
  }

  const value = {
    user,
    session,
    loading,
    signInWithGoogle,
    signOut,
    getAccessToken,
    codeError,
    processedCode, // 新增 processedCode
    authWithCode,
  }

  // loading 时只渲染 loading UI，不渲染 children
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-hero">
        <div className="text-center max-w-2xl mx-auto p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground mb-4">正在加载...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}