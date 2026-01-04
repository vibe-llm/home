import { useNavigate } from "react-router-dom";
import GoogleSignInButton from "@/components/GoogleSignInButton";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
         <div
           className="flex items-center gap-3 text-h3 font-bold font-serif tracking-tight cursor-pointer"
           onClick={() => navigate('/')}
         >
            <img src="/favicon-32x32.png" alt="Vibe LLM" className="w-8 h-8" />
            Vibe LLM
         </div>

         <div>
            <GoogleSignInButton
              size="sm"
              className="w-auto px-4 py-2 text-sm h-9"
              text="Sign in"
            />
         </div>
      </div>
    </header>
  );
};

export default Header;
