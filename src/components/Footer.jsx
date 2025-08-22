import { Link } from "react-router-dom";
import { Heart, Youtube, Instagram, MessageCircle, Mail, Phone, Gem } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">
          {/* Brand & Social - links */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 mr-2" style={{backgroundImage: "url('/crystalLogo.png')", backgroundSize: "cover", backgroundPosition: "center"}}></div>
              <span className="font-serif text-xl font-light text-black tracking-wide">
                KOENIGSKRISTALL
              </span>
            </div>
            <div className="flex gap-3 mt-2">
              <a href="mailto:shop@koenigskristall.de" aria-label="E-Mail" className="text-muted-foreground hover:text-primary transition">
                <Mail className="w-5 h-5" />
              </a>
              <a href="tel:+4912345678900" aria-label="Telefon" className="text-muted-foreground hover:text-primary transition">
                <Phone className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@koenigskristall" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-red-600 hover:text-red-800 transition">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/koenigskristall" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-pink-600 hover:text-pink-800 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://tiktok.com/@koenigskristall" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-gray-900 hover:text-gray-700 transition">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation - mittig */}
          <nav className="flex flex-col gap-2 items-center">
            <Link to="/shop" className="text-sm text-muted-foreground hover:text-primary transition">Shop</Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition">Über mich</Link>
            <Link to="/consulting" className="text-sm text-muted-foreground hover:text-primary transition">Beratung</Link>
            <Link to="/inspired" className="text-sm text-muted-foreground hover:text-primary transition">Bibliothek</Link>
            
            
          </nav>

          {/* Copyright - rechts */}
          <div className="flex flex-col gap-2 items-center md:items-end">
            <span className="text-xs text-muted-foreground">
              Mit <span className="text-primary">♥</span> für dich gemacht.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;