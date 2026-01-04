import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {User, CreditCard, ArrowLeft, LogOut, ExternalLink} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {usePageTracking} from "@/hooks/use-analytics";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import {useEffect, useState} from "react";
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
        if (!response.ok) {
          // 不抛出异常，改为设置错误状态以避免被本地捕获后产生警告
          const text = await response.text().catch(() => '');
          setError('Failed to fetch wallet data' + (text ? `: ${text}` : ''));
          setWalletData(null);
          setApiToken(null);
          return;
        }
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
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10">
                <User className="w-7 h-7 text-primary"/>
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-serif font-medium text-foreground">User Dashboard</h1>
                <p className="text-muted-foreground font-light">
                  {session?.user ? `Welcome back, ${session?.user?.email}` : "Sign in to access your dashboard"}
                </p>
              </div>
            </div>
            <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-foreground"
            >
                <ArrowLeft className="w-4 h-4 mr-2"/>
                Back to Home
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Account Section */}
          <Card className="bg-card border-border shadow-card hover:shadow-card-hover transition-all duration-300">
            <CardHeader className="pb-4 border-b border-border/50">
              <CardTitle className="flex items-center gap-3 text-xl font-serif font-medium">
                <User className="w-5 h-5 text-primary"/>
                Account Status
              </CardTitle>
              {/* 移除月份选择器 */}
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              {session?.user ? (
                <>
                  {error && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  {/* 1. Current Balance Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="text-lg font-medium text-foreground tracking-tight">Current Balance</h3>
                      {walletLoading && (
                        <svg className="animate-spin ml-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-secondary/30 rounded-xl p-5 text-center flex flex-col justify-between h-32 border border-border/50">
                        <p className="text-muted-foreground text-sm font-medium">Balance</p>
                        {walletLoading ? (
                          <span className="inline-block w-8 h-8 mx-auto animate-pulse bg-primary/10 rounded" />
                        ) : (
                          <p className="text-3xl font-serif font-medium text-primary">{walletData ? walletHelpers.getBalanceRemaining(walletData) : '0'}</p>
                        )}
                      </div>
                      <div className="bg-secondary/30 rounded-xl p-5 text-center flex flex-col justify-between h-32 border border-border/50">
                        <p className="text-muted-foreground text-sm font-medium">Total Spend</p>
                        {walletLoading ? (
                          <span className="inline-block w-8 h-8 mx-auto animate-pulse bg-primary/10 rounded" />
                        ) : (
                          <p className="text-3xl font-serif font-medium text-foreground">{walletData ? walletHelpers.getTotalSpendFormatted(walletData) : '0'}</p>
                        )}
                      </div>
                      <div className="bg-secondary/30 rounded-xl p-5 text-center flex flex-col justify-between h-32 border border-border/50">
                        <p className="text-muted-foreground text-sm font-medium">Est. Tokens</p>
                        {walletLoading ? (
                          <span className="inline-block w-8 h-8 mx-auto animate-pulse bg-primary/10 rounded" />
                        ) : (
                          <p className="text-3xl font-serif font-medium text-green-600">{walletData ? walletHelpers.getTokensRemaining(walletData) : '0'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* 2. Use your API Token Section */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <h4 className="text-lg font-medium text-foreground tracking-tight">Use your API Token</h4>
                      {walletLoading && (
                        <svg className="animate-spin ml-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                      )}
                    </div>
                    <div className="relative">
                      {walletLoading ? (
                        <div className="bg-secondary/50 rounded-xl p-4 mb-2 pr-20 min-h-[48px] flex items-center border border-border/50">
                          <span className="inline-block h-4 w-32 bg-primary/10 rounded animate-pulse" />
                        </div>
                      ) : apiToken ? (
                        <>
                          <div className="mb-2">
                            <pre className="bg-secondary/50 text-foreground rounded-xl p-4 font-mono text-xs overflow-x-auto select-all min-h-[48px] border border-border/50">
{`export ANTHROPIC_MODEL=vibe-normal\nexport ANTHROPIC_BASE_URL=https://api.vibe-llm.online/api/anthropic\nexport ANTHROPIC_AUTH_TOKEN=${apiToken}`}
                            </pre>
                          </div>
                          <div className="flex justify-end">
                            <button
                              className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity shadow-sm"
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
                          </div>
                        </>
                      ) : (
                        <div className="bg-secondary/50 rounded-xl p-4 mb-2 pr-20 min-h-[48px] flex items-center border border-border/50">
                          <span className="inline-block h-4 w-32 bg-primary/10 rounded animate-pulse" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Copy and paste the above lines into your <code>~/.bashrc</code> or <code>~/.zshrc</code> file, then run <code>source ~/.bashrc</code> or <code>source ~/.zshrc</code> to make it effective.</p>
                  </div>
                  {/* 3. Recent Usage Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="text-lg font-medium text-foreground tracking-tight">Recent Usage (Last 30 Days)</h3>
                      {usageLoading && (
                        <svg className="animate-spin ml-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                      )}
                    </div>
                    {usageLoading ? (
                      <div className="bg-secondary/30 rounded-xl p-8 flex items-center justify-center border border-border/50">
                        <p className="text-muted-foreground text-sm">Loading usage data...</p>
                      </div>
                    ) : (
                      <div className="bg-secondary/30 rounded-xl overflow-hidden border border-border/50">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-border/50 hover:bg-transparent">
                              <TableHead className="text-muted-foreground font-medium">Date</TableHead>
                              <TableHead className="text-muted-foreground font-medium">Tokens Used</TableHead>
                              <TableHead className="text-muted-foreground font-medium">Requests</TableHead>
                              <TableHead className="text-muted-foreground font-medium">Est. Cost</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {formatUsageData(usageHistory).length > 0 ? (
                              formatUsageData(usageHistory).map((row, index) => (
                                <TableRow key={index} className="border-border/50 hover:bg-secondary/50">
                                  <TableCell className="text-foreground font-mono text-xs">{row.date}</TableCell>
                                  <TableCell className="text-foreground font-mono text-xs">{row.tokens.toLocaleString()}</TableCell>
                                  <TableCell className="text-foreground font-mono text-xs">{row.requests.toLocaleString()}</TableCell>
                                  <TableCell className="text-foreground font-mono text-xs">${row.cost.toFixed(4)}</TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow className="border-border/50 hover:bg-transparent">
                                <TableCell colSpan={4} className="text-center text-muted-foreground py-8 text-sm">
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
                    className="w-full border-border text-muted-foreground hover:text-foreground hover:bg-secondary mt-8"
                  >
                    <LogOut className="w-4 h-4 mr-2"/>
                    Sign Out
                  </Button>
                </>
              ) : (
                <div className="space-y-8 py-8">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10">
                      <User className="w-8 h-8 text-primary"/>
                    </div>
                    <h3 className="text-xl font-serif font-medium text-foreground">Sign in to access your account</h3>
                    <p className="text-muted-foreground max-w-xs mx-auto">
                      Use your Google account to sign in and manage your Vibe LLM account.
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <GoogleSignInButton/>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Up Section */}
          <Card className="bg-card border-border shadow-card hover:shadow-card-hover transition-all duration-300 h-fit">
            <CardHeader className="pb-4 border-b border-border/50">
              <CardTitle className="flex items-center gap-3 text-xl font-serif font-medium">
                <CreditCard className="w-5 h-5 text-primary"/>
                Top Up Balance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Add credits to your Vibe LLM account to continue using our services. Your balance will be updated
                  within 1 hour after a successful payment.
                </p>

                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5">
                  <h4 className="text-blue-900 font-medium mb-3 text-sm">How it works:</h4>
                  <ul className="text-blue-700 text-sm space-y-2 list-disc list-inside">
                    <li>Click the "Top Up" button below</li>
                    <li>Complete your payment securely via Stripe</li>
                    <li>Your balance will be updated within 1 hour</li>
                    <li>Continue using Vibe LLM with your new credits</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-foreground font-medium text-sm uppercase tracking-wider">Top-Up Options</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-secondary/30 rounded-xl border border-border/50">
                      <span className="text-foreground font-medium">$5.00</span>
                      <span className="text-muted-foreground text-sm">~6M tokens</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-secondary/30 rounded-xl border border-border/50">
                      <span className="text-foreground font-medium">$20.00</span>
                      <span className="text-muted-foreground text-sm">~24M tokens</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-secondary/30 rounded-xl border border-border/50">
                      <span className="text-foreground font-medium">$50.00</span>
                      <span className="text-muted-foreground text-sm">~60M tokens</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleTopUp}
                  className="w-full bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300 text-lg py-6 rounded-xl shadow-lg shadow-primary/20"
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

        {/* Back Button - Removed as it's now in the header */}
      </div>
    </div>
  );
};

export default UserDashboard2;
