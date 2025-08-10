import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

const CrystalProgramming = () => {
  return (
    <section id="programming" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-primary mb-6 tracking-wide">
            Kristalle Programmieren
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Das Programmieren verbindet dich energetisch mit deinem Kristall und setzt klare Absichten für seine Arbeit.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Card className="bg-card border border-border">
              <CardContent className="p-8">
                <h3 className="font-serif text-xl font-light text-black mb-6">
                  Schritt-für-Schritt Anleitung
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">1</div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Vorbereitung:</strong> Kristall reinigen und in ruhiger Umgebung platzieren
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">2</div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Verbindung:</strong> Kristall in die Hände nehmen und tief atmen
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">3</div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Absicht setzen:</strong> Klare, positive Intention formulieren
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">4</div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Visualisierung:</strong> Absicht als Licht in den Kristall fließen lassen
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">5</div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Bestätigung:</strong> Mit Dankbarkeit die Programmierung abschließen
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-light text-black">
                    Beispiel-Programmierungen
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-background/80 rounded-lg p-4">
                    <h4 className="font-medium text-primary text-sm mb-2">Für Schutz:</h4>
                    <p className="text-xs text-muted-foreground italic">
                      "Ich programmiere dich, mich vor negativen Energien zu schützen und mir Sicherheit zu geben."
                    </p>
                  </div>
                  <div className="bg-background/80 rounded-lg p-4">
                    <h4 className="font-medium text-primary text-sm mb-2">Für Liebe:</h4>
                    <p className="text-xs text-muted-foreground italic">
                      "Hilf mir dabei, mein Herz zu öffnen und mehr Selbstliebe und Mitgefühl zu entwickeln."
                    </p>
                  </div>
                  <div className="bg-background/80 rounded-lg p-4">
                    <h4 className="font-medium text-primary text-sm mb-2">Für Klarheit:</h4>
                    <p className="text-xs text-muted-foreground italic">
                      "Unterstütze mich dabei, klare Entscheidungen zu treffen und meinen Weg zu erkennen."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CrystalProgramming;