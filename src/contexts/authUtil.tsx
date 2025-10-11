import {createContext, useContext} from "react";
import {Session, User} from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signInWithGoogle: (redirectTo?: string) => Promise<void>
  signOut: () => Promise<void>
  getAccessToken: () => Promise<string | null>
  codeError: string | null
  processedCode: string | null // 新增 processedCode
  authWithCode: (code: string, redirectParam?: string | null, error?: string | null, errorDescription?: string | null) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}