import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

const Cleaning = ({ cleansingMethods }) => {
  return (
    <section id="cleansing" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-primary mb-6 tracking-wide">
            KRISTALLE REINIGEN
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Kristalle nehmen Energien aus ihrer Umgebung auf. Regelmäßige Reinigung ist essentiell, 
            um ihre natürliche Schwingung zu erhalten und negative Energien zu entfernen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {cleansingMethods.map((method, idx) => (
            <Card key={idx} className="bg-card border border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                    {method.icon}
                  </div>
                  <h3 className="font-serif text-lg font-light text-black">
                    {method.method}
                  </h3>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {method.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-primary">Dauer:</span>
                    <Badge variant="secondary" className="text-xs">{method.duration}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-primary">Geeignet für:</span>
                    <span className="text-xs text-muted-foreground">{method.suitableFor}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-primary">Energie:</span>
                    <span className="text-xs text-muted-foreground">{method.energy}</span>
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

export default Cleaning;