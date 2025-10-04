import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, CreditCard, ArrowLeft, LogOut, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePageTracking } from "@/hooks/use-analytics";
import { useAuth } from "@/contexts/AuthContext";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import {useEffect, useState} from "react";
import {supabase} from "@/lib/supabase.ts";
import {Session} from "@supabase/supabase-js";
import { UserWallet, walletHelpers } from "@/lib/user_crm";
import { API_CONFIG, apiRequest } from "@/config/api";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

// Usage history item type
interface UsageHistoryItem {
  date: string;
  tokens: number;
  cost: number;
  requests: number;
}
const USAGE_LOOKBACK_DAYS = 3;

const UserDashboard2 = () => {
  const navigate = useNavigate();
  const { user, session, signOut } = useAuth();
  usePageTracking("User Dashboard");

  console.log('OAuth data');
  console.log('User:', user);
  console.log('session:', session);


  // 检查并显示 OAuth 回调日志
  useEffect(() => {
    const callbackLog = sessionStorage.getItem('oauth_callback_log');
    if (callbackLog) {
      try {
        const logData = JSON.parse(callbackLog);
        console.log('📋 Previous OAuth Callback Summary:');
        console.log('Timestamp:', logData.timestamp);
        console.log('User:', logData.user);
        console.log('session:', session);
        console.log('Redirected to:', logData.redirectTo);
        console.log('Access token length:', logData.accessTokenLength);
        console.log('Expires at:', logData.expiresAt);

        // 清除已读取的日志
        sessionStorage.removeItem('oauth_callback_log');
      } catch (error) {
        console.error('Error parsing callback log:', error);
      }
    }
  }, []);

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

  const [walletData, setWalletData] = useState<UserWallet | null>(null);
  const [usageHistory, setUsageHistory] = useState<UsageHistoryItem[]>([]);
  const [usageLoading, setUsageLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 自动加载余额和用量
  useEffect(() => {
    const fetchWalletData = async (email: string, token: string) => {
      try {
        const params = new URLSearchParams({ email });
        const response = await apiRequest(
          API_CONFIG.ENDPOINTS.USER_WALLET,
          { method: 'GET' },
          params
        );
        if (!response.ok) throw new Error('Failed to fetch wallet data');
        const data = await response.json();
        setWalletData(data as UserWallet);
      } catch (err) {
        setWalletData(null);
        setError('Failed to fetch wallet data.');
      }
    };
    const fetchUsageHistory = async (email: string) => {
      try {
        setUsageLoading(true);
        const today = new Date();
        const apiPromises = Array.from({ length: USAGE_LOOKBACK_DAYS }, (_, i) => {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          const params = new URLSearchParams({
            email,
            p_start: dateStr,
            p_end: dateStr
          });
          return apiRequest(
            API_CONFIG.ENDPOINTS.USER_COST,
            { method: 'GET' },
            params
          )
            .then(async (response) => {
              if (response.ok) {
                const data = await response.json();
                return {
                  date: dateStr,
                  tokens: data.token_used || 0,
                  cost: data.estimated_cost || 0,
                  requests: data.request_count || 0
                } as UsageHistoryItem;
              }
              return null;
            })
            .catch(() => null);
        });
        const results = await Promise.all(apiPromises);
        const usageData = results.filter((result): result is UsageHistoryItem => result !== null);
        setUsageHistory(usageData);
      } catch (err) {
        setUsageHistory([]);
      } finally {
        setUsageLoading(false);
      }
    };
    const load = async () => {
      setError(null);
      if (session?.user) {
        // 获取 accessToken
        let token = session?.access_token;
        if (!token && typeof window !== 'undefined') {
          token = window.localStorage.getItem('sb-access-token') || '';
        }
        await fetchWalletData(session.user.email, token || '');
        await fetchUsageHistory(session.user.email);
      } else {
        setWalletData(null);
        setUsageHistory([]);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user]);

  const formatUsageData = (data: UsageHistoryItem[]): UsageHistoryItem[] => {
    if (!data || data.length === 0) return [];
    return data
      .map((item) => ({
        ...item,
        date: new Date(item.date).toLocaleDateString(),
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-primary/10 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold text-foreground">User Dashboard</h1>
                <p className="text-muted-foreground">
                  {session?.user ? `Welcome, ${session?.user?.email}` : "Sign in to access your dashboard"}
                </p>
              </div>
            </div>
          </div>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Manage your Vibe LLM account and top up your balance
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Account Section */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <User className="w-6 h-6 text-primary" />
                Account Status
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage your authentication settings
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {!session?.user ? (
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-primary/10 flex items-center justify-center">
                      <User className="w-8 h-8 text-primary" />
                    </div>

                    <h3 className="text-xl font-semibold text-foreground">Sign in to access your account</h3>

                    <p className="text-muted-foreground">
                      Use your Google account to sign in and manage your Vibe LLM account.
                    </p>
                  </div>

                  <GoogleSignInButton />
                </div>
              ) : (
                <div className="space-y-4">
                  <Alert className="border-green-500/20 bg-green-500/10">
                    <AlertDescription className="text-green-300">
                      <strong>Authenticated:</strong> {session?.user?.email}
                    </AlertDescription>
                  </Alert>
                </div>
              )}
              {session?.user && (
                <>
                  {error && (
                    <Alert className="border-red-500/20 bg-red-500/10 mt-4">
                      <AlertDescription className="text-red-300">{error}</AlertDescription>
                    </Alert>
                  )}
                  {/* Balance Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                      <p className="text-muted-foreground text-sm">Current Balance</p>
                      <p className="text-2xl font-bold text-primary">{walletData ? walletHelpers.getBalanceRemaining(walletData) : '0'}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                      <p className="text-muted-foreground text-sm">Total Spend</p>
                      <p className="text-2xl font-bold text-foreground">{walletData ? walletHelpers.getTotalSpendFormatted(walletData) : '0'}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                      <p className="text-muted-foreground text-sm">Est. Tokens Available</p>
                      <p className="text-2xl font-bold text-green-400">{walletData ? walletHelpers.getTokensRemaining(walletData) : '0'}</p>
                    </div>
                  </div>
                  {/* Usage History Table */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Recent Usage (Last {USAGE_LOOKBACK_DAYS} Days)</h3>
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
                                  No usage data available for the past {USAGE_LOOKBACK_DAYS} days
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
                    className="w-full border-primary/30 text-foreground hover:bg-primary/5"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>

              )}
            </CardContent>
          </Card>

          {/* Top Up Section */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <CreditCard className="w-6 h-6 text-primary" />
                Top Up Balance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Add credits to your Vibe LLM account to continue using our services. Your balance will be updated within 1 hour after a successful payment.
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
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Top Up Now
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Payments are processed securely by Stripe. You will be redirected to complete your payment.
                </p>
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-4">
                  <p className="font-bold">Important Notice:</p>
                  <p>Please ensure you enter the email associated with your API token when making a payment to avoid delays in processing credits.</p>
                </div>
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
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Vibe LLM
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard2;
