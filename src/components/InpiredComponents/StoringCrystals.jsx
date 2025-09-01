import { Card, CardContent } from "@/components/ui/card";
import { Shield, Sun, Sparkles } from "lucide-react";

const StoringCrystals = () => {
  return (
    <section id="storage" className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-primary mb-6 tracking-wide">
            AUFBEWAHRUNG & PFLEGE
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Die richtige Aufbewahrung schützt deine Kristalle und erhält ihre Energie optimal.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-card border border-border">
            <CardContent className="p-6 text-center">
              <Shield className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-serif text-lg font-light text-black mb-3">
                Schutz vor Beschädigungen
              </h3>
              <ul className="text-muted-foreground text-sm space-y-2 text-left">
                <li>• Harte und weiche Kristalle getrennt lagern</li>
                <li>• Vor direkten Stößen schützen</li>
                <li>• Seidenbeutel oder Samtkästen nutzen</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardContent className="p-6 text-center">
              <Sun className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-serif text-lg font-light text-black mb-3">
                Umgebungsbedingungen
              </h3>
              <ul className="text-muted-foreground text-sm space-y-2 text-left">
                <li>• Vor direkter Sonneneinstrahlung schützen</li>
                <li>• Trockene Umgebung bevorzugen</li>
                <li>• Extreme Temperaturen vermeiden</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardContent className="p-6 text-center">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-serif text-lg font-light text-black mb-3">
                Energetische Aspekte
              </h3>
              <ul className="text-muted-foreground text-sm space-y-2 text-left">
                <li>• Regelmäßige Reinigung einplanen</li>
                <li>• Positive Absichten für den Aufbewahrungsort</li>
                <li>• Intuition bei der Platzierung folgen</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StoringCrystals;