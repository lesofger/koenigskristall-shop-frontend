import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Gem, Heart } from "lucide-react";

const CTAcomponent = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-light text-primary mb-6 tracking-wide">
          Entdecke deine Kristallreise
        </h2>
        <p className="text-lg text-muted-foreground mb-8 font-light leading-relaxed">
          Jetzt wo du die Geheimnisse der Kristallpflege kennst, bist du bereit für deine eigene spirituelle Reise. 
          Entdecke meine sorgfältig ausgewählten Kristalle, die darauf warten, dich zu begleiten.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
          <Link to="/shop" className="group">
            <Card className="bg-background/80 backdrop-blur-sm border border-primary/20 p-6 hover:shadow-crystal transition-all duration-300 cursor-pointer">
              <CardContent className="p-0 text-center">
                <Gem className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-serif text-lg font-light text-black mb-2">
                  Zum Kristall-Shop
                </h3>
                <p className="text-muted-foreground text-sm">
                  Entdecke meine handverlesene Kristall-Kollektion
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/consulting" className="group">
            <Card className="bg-background/80 backdrop-blur-sm border border-primary/20 p-6 hover:shadow-crystal transition-all duration-300 cursor-pointer">
              <CardContent className="p-0 text-center">
                <Heart className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-serif text-lg font-light text-black mb-2">
                  Persönliche Beratung
                </h3>
                <p className="text-muted-foreground text-sm">
                  Lass dich bei der Kristallauswahl begleiten
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTAcomponent;