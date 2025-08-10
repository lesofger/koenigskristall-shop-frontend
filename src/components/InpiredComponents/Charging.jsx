import { Card, CardContent } from "@/components/ui/card";
import { Zap, Sparkles } from "lucide-react";

const Charging = ({ chargingMethods }) => {
  return (
    <section id="charging" className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-primary mb-6 tracking-wide">
            Kristalle Aufladen
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Nach der Reinigung benötigen Kristalle neue, positive Energie. Verschiedene Aufladmethoden 
            verstärken ihre natürlichen Eigenschaften und bereiten sie für ihre spirituelle Arbeit vor.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {chargingMethods.map((method, idx) => (
            <Card key={idx} className="bg-card border border-border">
              <CardContent className="p-6">
                <h3 className="font-serif text-lg font-light text-black mb-3">
                  {method.method}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {method.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-primary">Timing:</span>
                    <span className="text-xs text-muted-foreground">{method.timing}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-primary">Wirkung:</span>
                    <span className="text-xs text-muted-foreground">{method.effect}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Charging;