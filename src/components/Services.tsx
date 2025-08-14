import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ShoppingBag, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import image1 from "@/assets/berater.png";
import image2 from "@/assets/shopLogo.png";
import image3 from "@/assets/bibliothek.png";

const services = [
  {
    title: "Persönliche Kristallberatung",
    description: "Lass dich von mir bei der Auswahl deiner perfekten Kristalle beraten.",
    image: image1,
    alt: "Beratung",
    icon: <Sparkles className="w-6 h-6" />,
    link: "/consulting"
  },
  {
    title: "Kristall Shop",
    description: "Entdecke unsere sorgfältig ausgewählte Kollektion an Heilsteinen.",
    image: image2,
    alt: "Shop",
    icon: <ShoppingBag className="w-6 h-6" />,
    link: "/shop"
  },
  {
    title: "Kristallbibliothek",
    description: "Erweitere dein Wissen über die Welt der Kristalle und ihrer Eigenschaften.",
    image: image3,
    alt: "Bibliothek",
    icon: <BookOpen className="w-6 h-6" />,
    link: "/inspired"
  },
];

const ServiceSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
         <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-primary mb-6 tracking-wide">
            Deine Kristall Erfahrung
        </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Entdecke die verschiedenen Wege, wie ich dich auf deiner spirituellen Reise begleiten kann.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, idx) => (
            <Card
              key={service.title}
              className="group relative overflow-hidden bg-card border border-border hover:shadow-crystal transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-8 text-center">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-primary mb-6">
                  {service.icon}
                </div>

                {/* Image */}
                <div className="relative mb-8">
                  <img
                    src={service.image}
                    alt={service.alt}
                    className="w-32 h-32 mx-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    width={128}
                    height={128}
                  />
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl font-light text-foreground mb-3 tracking-wide">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 font-light leading-relaxed">
                  {service.description}
                </p>

                {/* CTA Button */}
                   <Link to={service.link}>
                    <Button 
                     variant="outline"
                     className="bg-background text-primary hover:bg-primary hover:text-background border-border px-6 py-2 font-medium tracking-wide shadow-crystal group/btn"
                      >
                       Mehr erfahren
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link to="/shop">
            <Button 
               size="lg"
               className="bg-primary text-background hover:bg-primary/90 px-8 py-6 text-lg font-medium tracking-wide shadow-crystal"
                    >
                 Starte deine Kristallreise
                 <Sparkles className="w-5 h-5 ml-2" />
             </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;