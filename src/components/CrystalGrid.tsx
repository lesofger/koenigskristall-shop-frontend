import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const crystalCategories = [
  {
    name: "Rosenquarz",
    description: "Selbstliebe & Herzchakra",
    image: "🌸",
    color: "from-pink-100 to-rose-200",
  },
  {
    name: "Amethyst",
    description: "Spiritualität und Intuition",
    image: "💜",
    color: "from-purple-100 to-violet-200",
  },
  {
    name: "Bergkristall",
    description: "Klarheit und Verstärkung",
    image: "💎",
    color: "from-slate-50 to-gray-100",
  },
  {
    name: "Citrine",
    description: "Fülle und Manifestation",
    image: "🟡",
    color: "from-yellow-100 to-amber-200",
  },
  {
    name: "Schwarzer Turmalin",
    description: "Schutz und Erdung",
    image: "⚫",
    color: "from-gray-200 to-slate-300",
  },
  {
    name: "Selenit",
    description: "Reinigung und Klarheit",
    image: "🤍",
    color: "from-white to-gray-50",
  },
  {
    name: "Labradorit",
    description: "Transformation & Magie",
    image: "🔮",
    color: "from-blue-100 to-indigo-200",
  },
  {
    name: "Grüner Aventurin",
    description: "Glück & Herzensruhe",
    image: "💚",
    color: "from-green-100 to-emerald-200",
  },
];

const CrystalGrid = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-crystal">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-6">
            Die Kraft Der Kristalle
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Jeder Kristall hat seine ganz eigenen Fähigkeiten und Kräfte, um dich individuell auf deinem Weg zu unterstützen.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {crystalCategories.map((crystal, index) => (
            <Link 
              key={crystal.name} 
              to={`/category/${crystal.name.toLowerCase().replace(' ', '-')}`}
              className="group"
            >
              <Card className="overflow-hidden bg-gradient-card border-border/50 hover:shadow-hover transition-all duration-500 group-hover:scale-105">
                <CardContent className="p-0">
                  <div className={`h-48 bg-gradient-to-br ${crystal.color} flex items-center justify-center relative overflow-hidden`}>
                    <div className="text-6xl transform group-hover:scale-110 transition-transform duration-500">
                      {crystal.image}
                    </div>
                    <div className="absolute inset-0 bg-background/10 group-hover:bg-background/5 transition-colors duration-500"></div>
                  </div>
                  
                  <div className="p-6 text-center">
                    <h3 className="font-serif text-xl font-medium text-foreground mb-2">
                      {crystal.name}
                    </h3>
                    <p className="text-muted-foreground text-sm tracking-wide">
                      {crystal.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/shop">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-medium tracking-wide transition-colors shadow-crystal">
              View All Crystals
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CrystalGrid;