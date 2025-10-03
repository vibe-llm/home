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

const UserDashboard2 = () => {
  const navigate = useNavigate();
  const { user, session, signOut } = useAuth();
  // const { signOut } = useAuth();
  // const [session, setSession] = useState<Session | null>(null)

  usePageTracking("User Dashboard");

  console.log('OAuth data');
  console.log('User:', user);
  console.log('session:', session);

  // 初始化 session
  // useEffect(() => {
  //   // Get initial session
  //   const getInitialSession = async () => {
  //     const {data: {session}} = await supabase.auth.getSession()
  //     setSession(session)
  //   }
  //   getInitialSession()
  // }, [])


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
            {session?.user && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="border-primary/30 text-foreground hover:bg-primary/5"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            )}
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

                  <Alert className="border-blue-500/20 bg-blue-500/10">
                    <AlertDescription className="text-blue-300">
                      Your account is active and ready to use. Connect your API token in settings to view balance and usage data.
                    </AlertDescription>
                  </Alert>

                  <Button
                    variant="outline"
                    onClick={handleSignOut}
                    className="w-full border-primary/30 text-foreground hover:bg-primary/5"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
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