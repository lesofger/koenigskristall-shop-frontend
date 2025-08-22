import { Card, CardContent } from "@/components/ui/card";
import { Heart, RefreshCw } from "lucide-react";

const BrokenCrystal = ({ brokenCrystalMeanings }) => {
  return (
    <section id="broken" className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-primary mb-6 tracking-wide">
            WENN KRISTALLE ZERBRECHEN
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Ein zerbrochener Kristall ist kein Unglück, sondern trägt eine spirituelle Botschaft. 
            Verstehe die Bedeutung und den respektvollen Umgang damit.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {brokenCrystalMeanings.map((meaning, idx) => (
            <Card key={idx} className="bg-card border border-border">
              <CardContent className="p-6">
                <h3 className="font-serif text-lg font-light text-black mb-3">
                  {meaning.meaning}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {meaning.description}
                </p>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-primary">Empfohlene Handlung:</span>
                  <span className="text-xs text-muted-foreground">{meaning.action}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20">
          <CardContent className="p-8 text-center">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-serif text-xl font-light text-black mb-4">
              Ritual für zerbrochene Kristalle
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Nimm dir einen Moment der Stille. Halte die Stücke in deinen Händen und bedanke dich für den Dienst, 
              den der Kristall geleistet hat. Spüre, ob die Energie noch da ist oder ob sie sich transformiert hat. 
              Folge deiner Intuition bei der Entscheidung, was mit den Stücken geschehen soll.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BrokenCrystal;