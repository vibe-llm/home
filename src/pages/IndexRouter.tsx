import {useEffect, useState, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {supabase} from "@/lib/supabase.ts";
import {useAuth} from "@/contexts/authUtil.tsx";

// 规范化 hash 路径，确保 '#////abc' 变成 '#/abc'
function normalizeHash(hash: string): string {
  const path = hash.replace(/^#?\/*/, '');
  return path;
  // return '#/' + path;
}

// 解析 URL，获取 hash、search、param、code
function parseUrl() {
  const origin = window.location.origin || '';
  const pathname = window.location.pathname || '';
  const hash = window.location.hash || '';
  // 只用 search 解析主路径参数
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get('code');
  // 只用 hash 里的 ? 后部分解析 hash 参数
  let hashPath = hash;
  let hashParams = new URLSearchParams();
  if (hash.includes('?')) {
    const [h, p] = hash.split('?');
    hashPath = h;
    hashParams = new URLSearchParams(p);
  }
  return {
    hashPath, // 直接用 hashPath
    params: searchParams, // 直接用 searchParams
    code,
    hashParams,
  };
}

// 计算应该跳转的目标路径
function getRedirectTarget({code, locationHash}: { code: string | null, locationHash: string | null }) {
  if (locationHash && locationHash.length > 2) {
    return locationHash
  }
  if (code) {
    return '/dashboard2';
  }
  return '/home';
}

const IndexRouter = () => {
  const {
    loading,
    codeError,
    authWithCode,
    processedCode,
    session
  } = useAuth();
  const [hasRedirected, setHasRedirected] = useState(false);
  const {hashPath, params, code, hashParams} = useMemo(parseUrl, [window.location.href]);
  // const isDev = import.meta.env.DEV;
  const isDev = false; // 强制开启 dev 模式，方便调试
  const codeAccessToken = session?.access_token || null;
  const navigate = useNavigate();

  // 先分析出应该跳转的目标路径
  const redirectTarget = normalizeHash(getRedirectTarget({code, locationHash: hashPath}));

  useEffect(() => {
    if (loading) return;
    (async () => {
      // 仅在 code 存在且 window.location.hash 为空或长度小于等于2时，主动调用 authWithCode
      if (code != processedCode && (!hashPath || hashPath.length <= 2)) {
        const redirectParam = params.get('redirect') || params.get('redirect_to') || redirectTarget;
        const error = params.get('error');
        const errorDescription = params.get('error_description');
        await authWithCode(code, redirectParam, error, errorDescription);
      }
      // 非 dev 环境，处理跳转
      if (!isDev && !hasRedirected) {
        setHasRedirected(true);
        // 清理 search 参数，只保留 hash
        if (window.location.search) {
          window.history.replaceState(null, '', window.location.pathname + window.location.hash);
        }
        navigate(redirectTarget, { replace: true });
        window.location.reload();
        return;
      }
    })();
  }, [redirectTarget, hasRedirected, isDev, code, params, hashPath, processedCode, loading, navigate]);

  // dev 模式下展示调试信息和跳转按钮，仅在 isDev 时展示，否则只显示 loading
  if (isDev) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-hero">
        <div className="text-center max-w-2xl mx-auto p-8">
          <h2 className="mb-4 text-xl font-bold">开发环境调试信息</h2>
          <div className="mb-2">hashPath: <code>{hashPath}</code></div>
          <div className="mb-2">code: <code>{code || '(无)'}</code></div>
          <div className="mb-2">params: <code>{JSON.stringify(Object.fromEntries(params.entries()))}</code></div>
          <div className="mb-2">hashParams: <code>{JSON.stringify(Object.fromEntries((hashParams || new URLSearchParams()).entries()))}</code></div>
          <div className="flex gap-2 justify-center mb-6">
            <button
              onClick={() => navigate(redirectTarget)}
              className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-4 py-2 rounded text-sm"
            >跳转到 {redirectTarget}</button>
          </div>
          {/* 保留原有认证相关的开发环境展示 */}
          {codeAccessToken && !codeError && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm mt-8">
              <h3 className="text-lg font-semibold mb-4">🔑 Authentication Successful!</h3>
              <div className="text-left space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Access Token:</h4>
                  <div className="bg-black/30 border border-white/20 rounded p-3 font-mono text-xs break-all text-green-300">
                    {codeAccessToken}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => navigator.clipboard.writeText(codeAccessToken)}
                    className="bg-primary/20 hover:bg-primary/30 text-primary px-3 py-1 rounded text-xs transition-colors"
                  >📋 Copy Token</button>
                  <button
                    onClick={() => navigator.clipboard.writeText(`Bearer ${codeAccessToken}`)}
                    className="bg-primary/20 hover:bg-primary/30 text-primary px-3 py-1 rounded text-xs transition-colors"
                  >📋 Copy Bearer Token</button>
                </div>
                <div className="text-xs text-muted-foreground bg-black/20 p-3 rounded mt-4">
                  <p>📝 开发环境: 自动重定向已禁用</p>
                  <p>🔗 实际跳转目标: <code>{redirectTarget}</code></p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  // 非 dev 环境只显示 loading
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-hero">
      <div className="text-center max-w-2xl mx-auto p-8">
        <div className="text-lg text-white/80">Loading...</div>
      </div>
    </div>
  );
};

export default IndexRouter;
