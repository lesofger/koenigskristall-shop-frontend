import { Card, CardContent } from "@/components/ui/card";

const HeroLibrary = ({ careTopics, scrollToSection }) => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-primary mb-6 tracking-wide">
            Kristallbibliothek
            
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Entdecke die Geheimnisse der spirituellen Kristallpflege. Von der Reinigung bis zur Programmierung - 
            hier findest du alles für den liebevollen Umgang mit deinen energetischen Begleitern.
          </p>
        </div>

        {/* Topic Overview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {careTopics.map((topic) => (
            <Card
              key={topic.id}
              onClick={() => scrollToSection(topic.id)}
              className="group relative overflow-hidden bg-card border border-border hover:shadow-crystal transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <CardContent className="relative p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  {topic.icon}
                </div>
                <h3 className="font-serif text-xl font-light text-black mb-3 tracking-wide">
                  {topic.title}
                </h3>
                <p className="text-muted-foreground text-sm font-light leading-relaxed">
                  {topic.description}
                </p>
                <div className="mt-4 opacity-0 group-hover:opacity-70 transition-opacity duration-300">
                  <p className="text-xs text-primary font-medium">Zum Abschnitt springen →</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroLibrary;