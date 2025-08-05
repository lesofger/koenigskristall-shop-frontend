import { Card, CardContent } from "@/components/ui/card";
import { Heart, Sparkles, Package, Gem } from "lucide-react";

const QualityPromise = () => {
  const promises = [
    {
      icon: <Gem className="w-8 h-8" />,
      title: "Sorgfältige Auswahl",
      description: "Jeder Kristall wird von mir persönlich ausgewählt und auf seine Qualität und Energie geprüft."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Mit Liebe behandelt",
      description: "Alle Kristalle werden liebevoll gereinigt, energetisiert und mit positiven Absichten aufgeladen."
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Individuelle Verpackung",
      description: "Jeder Kristall wird individuell und sicher verpackt, damit er geschützt bei dir ankommt."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Einzigartige Energie",
      description: "Du erhältst nicht nur einen Kristall, sondern ein energetisches Geschenk für deine spirituelle Reise."
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6 tracking-wide">
            Mein
            <span className="block text-accent font-normal">Qualitätsversprechen</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Jeder Kristall in meinem Shop durchläuft einen besonderen Prozess der Auswahl und Vorbereitung, 
            damit er seine volle Kraft für dich entfalten kann.
          </p>
        </div>

        {/* Promise Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {promises.map((promise, idx) => (
            <Card
              key={promise.title}
              className="group relative overflow-hidden bg-card border border-border hover:shadow-crystal transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-8 text-center">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  {promise.icon}
                </div>

                {/* Content */}
                <h3 className="font-serif text-lg font-light text-foreground mb-3 tracking-wide">
                  {promise.title}
                </h3>
                <p className="text-muted-foreground text-sm font-light leading-relaxed">
                  {promise.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Personal Touch Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-br from-accent/5 to-background border border-accent/20 max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center">
                    <Heart className="w-12 h-12 text-accent" />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-4 tracking-wide">
                    Eine persönliche Note
                  </h3>
                  <p className="text-muted-foreground font-light leading-relaxed text-lg">
                    Als Kristallliebhaberin weiß ich, wie wichtig es ist, dass dein Kristall 
                    nicht nur schön aussieht, sondern auch energetisch zu dir passt. 
                    Deshalb behandle ich jeden Kristall wie einen wertvollen Schatz, 
                    bevor er seinen Weg zu dir findet.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QualityPromise;