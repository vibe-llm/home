import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {User, CreditCard, ArrowLeft, LogOut, ExternalLink} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {usePageTracking} from "@/hooks/use-analytics";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import {useEffect, useState} from "react";
import {supabase} from "@/lib/supabase.ts";
import {Session} from "@supabase/supabase-js";
import {UserWallet, walletHelpers} from "@/lib/user_crm";
import {API_CONFIG, apiRequest} from "@/config/api";
import {Table, TableHeader, TableBody, TableHead, TableRow, TableCell} from "@/components/ui/table";
import {useAuth} from "@/contexts/authUtil.tsx";

// Usage history item type
interface UsageHistoryItem {
  day: string; // ISO date string
  total_tokens: number;
  total_cost: number;
  request_count?: number;
}

const USAGE_LOOKBACK_DAYS = 30;

const UserDashboard2 = () => {
  const navigate = useNavigate();
  const {user, session, signOut} = useAuth();
  const [walletData, setWalletData] = useState<UserWallet | null>(null);
  const [usageHistory, setUsageHistory] = useState<UsageHistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [apiToken, setApiToken] = useState<string | null>(null);
  const [walletLoading, setWalletLoading] = useState(false);
  const [usageLoading, setUsageLoading] = useState(false);

  usePageTracking("User Dashboard");

  console.log('OAuth data');
  console.log('User:', user);
  console.log('session:', session);

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log('Sign out successful, navigating to dashboard2');
    } catch (error) {
      console.error('Error signing out:', error);
      console.log('Sign out failed, but still navigating to dashboard2');
    } finally {
      // Always navigate to dashboard2 page, regardless of success or failure
      // Use hash navigation for consistent behavior
      window.location.hash = '/dashboard2';
    }
  };

  const handleTopUp = () => {
    // Redirect to Stripe payment link
    window.open("https://buy.stripe.com/aFa8wR8Tv3yKbnjbiYcQU00", "_blank");
  };

  // 自动加载余额和用量
  useEffect(() => {
    const fetchWalletData = async (token: string) => {
      try {
        setWalletLoading(true);
        const response = await apiRequest(
          API_CONFIG.ENDPOINTS.USER_WALLET2,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) throw new Error('Failed to fetch wallet data');
        const data = await response.json();
        setWalletData(data as UserWallet);
        if (data.api_token) setApiToken(data.api_token); // 这里保存api_token
        else setApiToken(null);
        console.log('USER_WALLET2 data:', data);
      } catch (err) {
        setWalletData(null);
        setApiToken(null);
        console.error('Failed to fetch wallet2 data.', err);
      } finally {
        setWalletLoading(false);
      }
    };
    const fetchUsageHistory = async (token: string) => {
      try {
        setUsageLoading(true);
        // 过去30天的UTC日期
        const now = new Date();
        const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
        const start = new Date(end);
        start.setUTCDate(end.getUTCDate() - 29); // 包含今天共30天
        const p_start = start.toISOString().split('T')[0];
        const p_end = end.toISOString().split('T')[0];
        const response = await apiRequest(
          API_CONFIG.ENDPOINTS.USER_COST2,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          new URLSearchParams({
            p_start,
            p_end,
          })
        );
        if (response.ok) {
          const { data, msg, api_token } = await response.json();
          setUsageHistory(data || []);
          if (api_token) setApiToken(api_token);
          return { data, msg };
        } else {
          setUsageHistory([]);
          setApiToken(null);
          return { data: [], msg: 'error' };
        }
      } catch (err) {
        setUsageHistory([]);
        setApiToken(null);
        return { data: [], msg: 'error' };
      } finally {
        setUsageLoading(false);
      }
    };
    const load = async () => {
      setError(null);
      if (session?.access_token) {
        // 并行加载 wallet 和 usage，互不影响 spin
        fetchWalletData(session.access_token);
        fetchUsageHistory(session.access_token);
      } else {
        setWalletData(null);
        setUsageHistory([]);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user]);

  const formatUsageData = (data: UsageHistoryItem[]): Array<{
    date: string;
    tokens: number;
    cost: number;
    requests: number;
  }> => {
    if (!data || data.length === 0) return [];
    return data.map((item) => ({
      date: new Date(item.day).toLocaleDateString(),
      tokens: item.total_tokens ?? 0,
      cost: item.total_cost ?? 0,
      requests: item.request_count ?? 0,
    })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-primary/10 flex items-center justify-center">
                <User className="w-8 h-8 text-primary"/>
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold text-foreground">User Dashboard</h1>
                <p className="text-muted-foreground">
                  {session?.user ? `Welcome, ${session?.user?.email}` : "Sign in to access your dashboard"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Account Section */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <User className="w-6 h-6 text-primary"/>
                Account Status
              </CardTitle>
              {/* 移除月份选择器 */}
            </CardHeader>
            <CardContent className="space-y-6">
              {session?.user ? (
                <>
                  {error && (
                    <Alert className="border-red-500/20 bg-red-500/10 mt-4">
                      <AlertDescription className="text-red-300">{error}</AlertDescription>
                    </Alert>
                  )}
                  {/* 1. Current Balance Section */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block w-1.5 h-6 bg-primary rounded-sm" />
                      <h3 className="text-xl font-bold text-foreground tracking-tight">Current Balance</h3>
                      {walletLoading && (
                        <svg className="animate-spin ml-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white/5 rounded-lg p-4 text-center flex flex-col justify-end" style={{minHeight: '120px'}}>
                        <p className="text-muted-foreground text-sm">Current Balance</p>
                        <div className="flex-1" />
                        {walletLoading ? (
                          <span className="inline-block w-6 h-6 align-bottom animate-pulse bg-primary/30 rounded" />
                        ) : (
                          <p className="text-2xl font-bold text-primary leading-none align-bottom">{walletData ? walletHelpers.getBalanceRemaining(walletData) : '0'}</p>
                        )}
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 text-center flex flex-col justify-end" style={{minHeight: '120px'}}>
                        <p className="text-muted-foreground text-sm">Total Spend</p>
                        <div className="flex-1" />
                        {walletLoading ? (
                          <span className="inline-block w-6 h-6 align-bottom animate-pulse bg-primary/30 rounded" />
                        ) : (
                          <p className="text-2xl font-bold text-foreground leading-none align-bottom">{walletData ? walletHelpers.getTotalSpendFormatted(walletData) : '0'}</p>
                        )}
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 text-center flex flex-col justify-end" style={{minHeight: '120px'}}>
                        <p className="text-muted-foreground text-sm">Est. Tokens Available</p>
                        <div className="flex-1" />
                        {walletLoading ? (
                          <span className="inline-block w-6 h-6 align-bottom animate-pulse bg-green-400/30 rounded" />
                        ) : (
                          <p className="text-2xl font-bold text-green-400 leading-none align-bottom">{walletData ? walletHelpers.getTokensRemaining(walletData) : '0'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* 2. Use your API Token Section */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block w-1.5 h-6 bg-primary rounded-sm" />
                      <h4 className="text-lg font-bold text-foreground tracking-tight">Use your API Token:</h4>
                      {walletLoading && (
                        <svg className="animate-spin ml-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                      )}
                    </div>
                    <div className="relative">
                      {walletLoading ? (
                        <div className="bg-black/80 rounded p-4 mb-2 pr-20 min-h-[48px] flex items-center">
                          <span className="inline-block h-4 w-32 bg-primary/20 rounded animate-pulse" />
                        </div>
                      ) : apiToken ? (
                        <>
                          <pre className="bg-black/80 text-green-200 rounded p-4 font-mono text-[10px] overflow-x-auto select-all mb-2 pr-20">
{`export ANTHROPIC_MODEL=vibe-normal\nexport ANTHROPIC_BASE_URL=https://api.vibe-llm.online/api/anthropic\nexport ANTHROPIC_AUTH_TOKEN=${apiToken}`}
                          </pre>
                          <button
                            className="absolute top-1/2 -translate-y-1/2 right-4 px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors border border-primary/20 z-10"
                            style={{ pointerEvents: 'auto' }}
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `export ANTHROPIC_BASE_URL=https://api.vibe-llm.online/api/anthropic\nexport ANTHROPIC_AUTH_TOKEN=${apiToken}`
                              );
                            }}
                            type="button"
                            aria-label="Copy API token script"
                          >
                            Copy
                          </button>
                        </>
                      ) : (
                        <div className="bg-black/80 rounded p-4 mb-2 pr-20 min-h-[48px] flex items-center">
                          <span className="inline-block h-4 w-32 bg-primary/20 rounded animate-pulse" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Copy and paste the above lines into your <code>~/.bashrc</code> or <code>~/.zshrc</code> file, then run <code>source ~/.bashrc</code> or <code>source ~/.zshrc</code> to make it effective.</p>
                  </div>
                  {/* 3. Recent Usage Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block w-1.5 h-6 bg-primary rounded-sm" />
                      <h3 className="text-xl font-bold text-foreground tracking-tight">Recent Usage (Last 30 Days)</h3>
                      {usageLoading && (
                        <svg className="animate-spin ml-2 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                      )}
                    </div>
                    {usageLoading ? (
                      <div className="bg-white/5 rounded-lg p-8 flex items-center justify-center">
                        <p className="text-muted-foreground text-lg">Loading usage data...</p>
                      </div>
                    ) : (
                      <div className="bg-white/5 rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-white/10">
                              <TableHead className="text-muted-foreground">Date</TableHead>
                              <TableHead className="text-muted-foreground">Tokens Used</TableHead>
                              <TableHead className="text-muted-foreground">Requests</TableHead>
                              <TableHead className="text-muted-foreground">Est. Cost</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {formatUsageData(usageHistory).length > 0 ? (
                              formatUsageData(usageHistory).map((row, index) => (
                                <TableRow key={index} className="border-white/10">
                                  <TableCell className="text-foreground">{row.date}</TableCell>
                                  <TableCell className="text-foreground">{row.tokens.toLocaleString()}</TableCell>
                                  <TableCell className="text-foreground">{row.requests.toLocaleString()}</TableCell>
                                  <TableCell className="text-foreground">${row.cost.toFixed(4)}</TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow className="border-white/10">
                                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                                  No usage data available for the past 30 days
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleSignOut}
                    className="w-full border-primary/30 text-foreground hover:bg-primary/5 mt-8"
                  >
                    <LogOut className="w-4 h-4 mr-2"/>
                    Sign Out
                  </Button>
                </>
              ) : (
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-primary/10 flex items-center justify-center">
                      <User className="w-8 h-8 text-primary"/>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Sign in to access your account</h3>
                    <p className="text-muted-foreground">
                      Use your Google account to sign in and manage your Vibe LLM account.
                    </p>
                  </div>

                  <GoogleSignInButton/>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Up Section */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <CreditCard className="w-6 h-6 text-primary"/>
                Top Up Balance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Add credits to your Vibe LLM account to continue using our services. Your balance will be updated
                  within 1 hour after a successful payment.
                </p>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="text-blue-300 font-semibold mb-2">How it works:</h4>
                  <ul className="text-blue-200 text-sm space-y-1 list-disc list-inside">
                    <li>Click the "Top Up" button below</li>
                    <li>Complete your payment securely via Stripe</li>
                    <li>Your balance will be updated within 1 hour</li>
                    <li>Continue using Vibe LLM with your new credits</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-foreground font-semibold">Top-Up Options:</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-foreground">$5.00</span>
                      <span className="text-muted-foreground text-sm">~6M tokens</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-foreground">$20.00</span>
                      <span className="text-muted-foreground text-sm">~24M tokens</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-foreground">$50.00</span>
                      <span className="text-muted-foreground text-sm">~60M tokens</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleTopUp}
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg py-6"
                  size="lg"
                >
                  <ExternalLink className="w-5 h-5 mr-2"/>
                  Top Up Now
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Payments are processed securely by Stripe. You will be redirected to complete your payment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 h-auto"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-5 h-5 mr-2"/>
            Back to Vibe LLM
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard2;
