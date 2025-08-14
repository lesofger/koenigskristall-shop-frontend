import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const BottomFooter = () => {
  return (
    <footer>
    <div className="border-t border-border/30"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Copyright */}
          <div className="flex items-center gap-2">
            <p className="text-xs text-muted-foreground">
              © 2025 Königskristall. Alle Rechte vorbehalten.
            </p>
            <Heart className="w-3 h-3 text-primary" />
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <Link 
              to="/impressum" 
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Impressum
            </Link>
            <Link 
              to="/datenschutz" 
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Datenschutz
            </Link>
            <Link 
              to="/agb" 
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              AGB
            </Link>
            <Link 
              to="/widerruf" 
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Widerrufsrecht
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BottomFooter;
