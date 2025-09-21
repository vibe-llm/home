import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, CreditCard, DollarSign, ArrowLeft, CheckCircle, ExternalLink } from "lucide-react";
import { UserWallet, walletHelpers } from "@/lib/user_crm";
import { API_CONFIG, apiRequest } from "@/config/api";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [walletData, setWalletData] = useState<UserWallet | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWalletData = async (userEmail: string, userApiToken: string) => {
    try {
      const params = new URLSearchParams({ email: userEmail });
      const response = await apiRequest(
        API_CONFIG.ENDPOINTS.USER_WALLET,
        { method: 'GET' },
        params
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data as UserWallet;
    } catch (err) {
      console.error('Error fetching wallet data:', err);
      // Provide more specific error message for CORS issues
      if (err instanceof Error && err.message.includes('CORS')) {
        throw new Error('Unable to connect to the API. This may be due to browser security restrictions when accessing the site from GitHub Pages.');
      }
      throw err;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !apiToken) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchWalletData(email, apiToken);
      setWalletData(data);
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to fetch wallet data. Please check your email and API token.');
    } finally {
      setIsLoading(false);
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
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-primary/10 flex items-center justify-center">
            <User className="w-12 h-12 text-primary" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            User Dashboard
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Check your balance, usage, and manage your Vibe LLM account
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Balance & Usage Section */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <DollarSign className="w-6 h-6 text-primary" />
                Balance & Usage
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Stats updated hourly
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your-email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="apiToken" className="text-foreground">API Token *</Label>
                    <Input
                      id="apiToken"
                      type="password"
                      placeholder="vibe_xxxxxxxxxxxxxxxxxxxx"
                      value={apiToken}
                      onChange={(e) => setApiToken(e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    disabled={isLoading || !email || !apiToken}
                  >
                    {isLoading ? "Checking..." : "Submit"}
                  </Button>
                  
                  {error && (
                    <Alert className="border-red-500/20 bg-red-500/10 mt-4">
                      <AlertDescription className="text-red-300">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}
                </form>
              ) : (
                <div className="space-y-6">
                  <Alert className="border-green-500/20 bg-green-500/10">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-300">
                      Account verified successfully!
                    </AlertDescription>
                  </Alert>

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
                    <h3 className="text-lg font-semibold text-foreground mb-4">Recent Usage</h3>
                    <div className="bg-white/5 rounded-lg p-8 flex items-center justify-center">
                      <p className="text-muted-foreground text-lg">Feature coming soon</p>
                    </div>
                    {/* <div className="bg-white/5 rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-white/10">
                            <TableHead className="text-muted-foreground">Date</TableHead>
                            <TableHead className="text-muted-foreground">Tokens Used</TableHead>
                            <TableHead className="text-muted-foreground">Cost</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {fakeData.usageHistory.map((row, index) => (
                            <TableRow key={index} className="border-white/10">
                              <TableCell className="text-foreground">{row.date}</TableCell>
                              <TableCell className="text-foreground">{row.tokens}</TableCell>
                              <TableCell className="text-foreground">{row.cost}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div> */}
                  </div>

                  <Button 
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                    className="w-full border-primary/30 text-foreground hover:bg-primary/5"
                  >
                    Check Different Account
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

export default UserDashboard;
