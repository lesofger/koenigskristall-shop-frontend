import { Card, CardContent } from "@/components/ui/card";
import image1 from "@/assets/berater.png";
import image2 from "@/assets/shopLogo.png";
import image3 from "@/assets/bibliothek.png";

const services = [
  {
    title: "Persönliche Kristallberatung",
    image: image1,
    alt: "Beratung",
  },
  {
    title: "Kristall Shop",
    image: image2,
    alt: "Shop",
  },
  {
    title: "Kristallbibliothek",
    image: image3,
    alt: "Bibliothek",
  },
];

const ServiceSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-10 bg-gradient-crystal border border-bottom-2">
      <div className="max-w-7xl mx-auto">
        <div className="text-center px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Herzlich Willkommen,<br />auf deiner Reise, durch die magische Welt der Kristalle und Heilsteine.
          </h2>
          <p className="text-xl md:text-2xl font-medium mt-2 text-muted-foreground">
            Hier findest du Alles, was dein Kristallherz begehrt. Schau dich gerne um, auch du wirst dein Lieblingskristall finden.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 px-2 md:px-6">
          {services.map((service, idx) => (
            <Card
              key={service.title}
              className="flex flex-col items-center text-center transition-transform hover:scale-105 hover:shadow-xl shadow-md bg-white/80 backdrop-blur rounded-2xl border-0"
            >
              <CardContent className="flex flex-col items-center p-8">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="w-32 h-32 object-contain rounded-xl mb-6 bg-white"
                  width={128}
                  height={128}
                />
                <p className="font-bold text-lg mb-2 text-primary">{service.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;