import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const crystalCategories = [
  {
    name: "Rose Quartz",
    description: "Love & Compassion",
    image: "🌸",
    color: "from-pink-100 to-rose-200",
  },
  {
    name: "Amethyst",
    description: "Spiritual Growth",
    image: "💜",
    color: "from-purple-100 to-violet-200",
  },
  {
    name: "Clear Quartz",
    description: "Amplification",
    image: "💎",
    color: "from-slate-50 to-gray-100",
  },
  {
    name: "Citrine",
    description: "Abundance & Joy",
    image: "🟡",
    color: "from-yellow-100 to-amber-200",
  },
  {
    name: "Black Tourmaline",
    description: "Protection",
    image: "⚫",
    color: "from-gray-200 to-slate-300",
  },
  {
    name: "Selenite",
    description: "Cleansing",
    image: "🤍",
    color: "from-white to-gray-50",
  },
  {
    name: "Labradorite",
    description: "Transformation",
    image: "🔮",
    color: "from-blue-100 to-indigo-200",
  },
  {
    name: "Green Aventurine",
    description: "Prosperity",
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
            Crystal Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each crystal carries its own unique energy and healing properties. 
            Explore our carefully curated collection to find your perfect match.
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