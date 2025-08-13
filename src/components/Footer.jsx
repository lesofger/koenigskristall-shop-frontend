

//NOT READY JUST PUSH FOR STRIPE TEST 


import { Link } from "react-router-dom";
import { 
  Heart, 
  Youtube, 
  Instagram, 
  MessageCircle, 
  Mail, 
  Phone,
  Gem,
  Sparkles
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-primary/5 to-secondary/10 border-t border-border">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* Brand Section - Takes more space */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Gem className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-light text-primary tracking-wide">
                  Königskristall
                </h3>
                <p className="text-xs text-muted-foreground">Spirituelle Kristallberatung</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              
            </p>
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Made with ♡ for your spiritual journey</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-serif text-lg font-light text-primary mb-4 tracking-wide">
              Navigation
            </h4>
            <nav className="space-y-3">
              <Link 
                to="/" 
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Startseite
              </Link>
              <Link 
                to="/shop" 
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Kristall-Shop
              </Link>
              <Link 
                to="/inspired" 
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Kristall-Bibliothek
              </Link>
              <Link 
                to="/consulting" 
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Beratung
              </Link>
              <Link 
                to="/about" 
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Über mich
              </Link>
              <Link 
                to="/faq" 
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Häufige Fragen
              </Link>
            </nav>
          </div>

          {/* Contact & Social Media */}
          <div>
            <h4 className="font-serif text-lg font-light text-primary mb-4 tracking-wide">
              Kontakt & Social Media
            </h4>
            <div className="space-y-3">
              {/* Email */}
              <a 
                href="mailto:info@koenigskristall.de"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm">shop@koenigskristall.de</span>
              </a>
              
              {/* Phone */}
              <a 
                href="tel:+4912345678900"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm">+49 123 456 78 900</span>
              </a>
              
              {/* Opening Hours */}
              <div className="pt-2">
                <p className="text-xs font-medium text-primary mb-2">Öffnungszeiten:</p>
                <p className="text-xs text-muted-foreground mb-1">Mo-Fr: 9:00-18:00 Uhr</p>
                <p className="text-xs text-muted-foreground mb-3">Sa: 10:00-16:00 Uhr</p>
              </div>
              
              <div className="pt-2">
                <p className="text-xs font-medium text-primary mb-3">Folge mir hier:</p>
                <div className="flex gap-3">
                  {/* YouTube */}
                  <a
                    href="https://youtube.com/@koenigskristall"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 hover:scale-110 transition-all duration-300"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                  
                  {/* Instagram */}
                  <a
                    href="https://instagram.com/koenigskristall"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center hover:bg-pink-200 hover:scale-110 transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  
                  {/* TikTok */}
                  <a
                    href="https://tiktok.com/@koenigskristall"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 hover:scale-110 transition-all duration-300"
                    aria-label="TikTok"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

     </footer>
  );
};

export default Footer;