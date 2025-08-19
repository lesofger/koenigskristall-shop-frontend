import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import crystalHeroBg from "@/assets/homePicture.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${crystalHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-float">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-background mb-6 tracking-wide">
            Willkommen
            <span className="block text-accent font-normal">bei Koenigskristall</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-background/90 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            Ich freue mich, dass du hier bist, schau dich gerne ein wenig um und entdecke die Welt der Kristalle.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/shop">
              <Button 
                size="lg" 
                className="bg-background text-foreground hover:bg-background/70 px-8 py-6 text-lg font-light tracking-wide shadow-crystal"
              >
                Kristalle 
              </Button>
            </Link>
            
            <Link to="/about">
              <Button 
                variant="outline" 
                size="lg"
                className="bg-background text-muted-foreground hover:bg-background/70 px-8 py-6 text-lg font-light tracking-wide shadow-crystal"
              >
                Über Mich
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-background/70">
        <div className="flex flex-col items-center">
          <span className="text-sm tracking-widest mb-2">SCROLL</span>
          <div className="w-px h-12 bg-background/40"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;