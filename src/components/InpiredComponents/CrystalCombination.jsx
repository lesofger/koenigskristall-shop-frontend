import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const CrystalCombination = ({ crystalCombinations }) => {
  return (
    <section id="combination" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-primary mb-6 tracking-wide">
            Kristalle Kombinieren
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Verschiedene Kristalle können sich gegenseitig verstärken und harmonieren. 
            Entdecke kraftvolle Kombinationen für spezifische Zwecke.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {crystalCombinations.map((combo, idx) => (
            <Card key={idx} className="bg-card border border-border">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-serif text-lg font-light text-black">
                    {combo.purpose}
                  </h3>
                </div>
                
                <div className="space-y-3 mb-4">
                  {combo.crystals.map((crystal, crystalIdx) => (
                    <Badge key={crystalIdx} variant="secondary" className="mr-2 mb-2">
                      {crystal}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {combo.effect}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-serif text-lg font-light text-amber-800 mb-2">
                  Tipps zum Kombinieren
                </h4>
                <ul className="text-amber-700 text-sm space-y-1">
                  <li>• Beginne mit 2-3 Kristallen und spüre ihre Energie</li>
                  <li>• Vermeide zu viele verschiedene Energien auf einmal</li>
                  <li>• Vertraue deiner Intuition bei der Auswahl</li>
                  <li>• Bergkristall verstärkt die Wirkung anderer Kristalle</li>
                  <li>• Teste Kombinationen einzeln, bevor du sie dauerhaft nutzt</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CrystalCombination;