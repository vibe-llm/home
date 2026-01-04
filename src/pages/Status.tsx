import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, Loader2, Activity, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HealthResponse {
  status: string;
  path: string;
  mode: string;
  claude_api_router: string;
}

const Status = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["system-status"],
    queryFn: async () => {
      const res = await fetch("https://vibe-router.onrender.com/health");
      if (!res.ok) throw new Error("Failed to fetch status");
      return res.json() as Promise<HealthResponse>;
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const getStatusColor = (status: string) => {
    return status === "healthy" ? "text-green-600" : "text-red-600";
  };

  const getStatusIcon = (status: string) => {
    return status === "healthy" ? (
      <CheckCircle2 className="w-5 h-5 text-green-600" />
    ) : (
      <XCircle className="w-5 h-5 text-red-600" />
    );
  };

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
            <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-foreground mb-4 pl-0"
            >
                <ArrowLeft className="w-4 h-4 mr-2"/>
                Back to Home
            </Button>
            <h1 className="text-3xl font-serif font-medium text-foreground">System Status</h1>
            <p className="text-muted-foreground font-light mt-2">
                Real-time operational status of Vibe LLM services.
            </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="p-6 flex items-center gap-4">
              <XCircle className="w-8 h-8 text-destructive" />
              <div>
                <h3 className="font-medium text-destructive">Failed to load status</h3>
                <p className="text-sm text-destructive/80">Could not connect to status server.</p>
                <Button variant="outline" size="sm" onClick={() => refetch()} className="mt-2 border-destructive/30 hover:bg-destructive/10">
                    Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Overall Status */}
            <Card className={`border-l-4 ${data?.status === 'healthy' ? 'border-l-green-500' : 'border-l-red-500'} shadow-card`}>
                <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${data?.status === 'healthy' ? 'bg-green-100' : 'bg-red-100'}`}>
                            <Activity className={`w-6 h-6 ${data?.status === 'healthy' ? 'text-green-600' : 'text-red-600'}`} />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">Overall System Status</h3>
                            <p className="text-muted-foreground text-sm">
                                {data?.status === 'healthy' ? 'All systems operational' : 'System experiencing issues'}
                            </p>
                        </div>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-sm font-medium ${data?.status === 'healthy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {data?.status === 'healthy' ? 'Operational' : 'Issues Detected'}
                    </div>
                </CardContent>
            </Card>

            {/* Detailed Components */}
            <div className="grid gap-4">
                <Card className="shadow-sm border-border">
                    <CardHeader className="pb-3 border-b border-border/50">
                        <CardTitle className="text-base font-medium text-muted-foreground">Component Status</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-4">
                        <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-0 last:pb-0">
                            <span className="font-medium text-foreground">API Router</span>
                            <div className="flex items-center gap-2">
                                <span className={`text-sm font-medium ${getStatusColor(data?.claude_api_router || 'unknown')}`}>
                                    {data?.claude_api_router === 'healthy' ? 'Operational' : 'Issues'}
                                </span>
                                {getStatusIcon(data?.claude_api_router || 'unknown')}
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-2 last:border-0 last:pb-0">
                            <span className="font-medium text-foreground">Routing Mode</span>
                            <span className="text-sm text-muted-foreground font-mono bg-secondary px-2 py-1 rounded border border-border/50">
                                {data?.mode}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="text-center text-xs text-muted-foreground mt-8">
                Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Status;

