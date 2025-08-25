import React from "react";

import Maja2 from "@/assets/Maja2.jpeg";
import MajaShop from "@/assets/MajaShop.jpeg";
import MajaCrystal from "@/assets/MajaCrystal.jpeg";
import MajaRaja from "@/assets/MajaRaja.jpeg";
import majaspiegel2 from "@/assets/majaspiegel2.jpeg";
import { Calendar, MapPin, Clock } from "lucide-react";
import majakristallhand from "@/assets/majakristallhand.jpeg";
import BottomFooter from "./BottomFooter";

const upcomingMarkets = [
    {
      name: "Gesundheitstag Ummendorf",
      date: "06. September 2025",
      time: "10:00 - 18:00 Uhr",
      location: "Wormsdorferstr. 6",
      plz: "39365 Ummendorf",
      description: "Alles rund um das Thema Gesundheit und Wohlbefinden."
    },
    {
      name: "Landeserntedankfest Magdeburg",
      date: "20. - 21. September 2025",
      time: "10:00 - 18:00 Uhr", 
      location: "Elbauenpark Magdeburg",
      plz:"im Ökodorf",
      description: "Erlebe das 29. Landeserntedankfest im malerischen Elbauenpark Magdeburg."
    },
     {
      name: "Kaiser-Otto-Fest Magdeburg",
      date: "02. - 05. Oktober 2025",
      time: "11:00 - 24:00 Uhr", 
      location: "Domviertel Magdeburg",
      plz:"",
      description: "Viertägige mittelalterliche Erlebniswelt mit historischen Märkten, authentischem Handwerk, Tanz und Musik lassen wir die Zeit des Mittelalters aufleben."
    },
  ];

function AboutMe() {
  return (
    <div className="min-h-screen bg-background">
      {/* Moderne Hero Section mit gleichem Gradient und Textstil wie im Hero */}
      <section className="relative w-full h-[93vh] md:h-[93vh] flex items-center justify-center overflow-hidden">
          {/* Hintergrundbild mit individuellem Ausschnitt und Zoom auf Desktop */}
          <img
            src={majakristallhand}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover object-[45%_30%] transition-transform duration-700 md:scale-105  lg:scale-110 "
          />
          {/* Gradient nach unten */}
          <div className="absolute  inset-0 bg-gradient-hero pointer-events-none"></div>
          {/* Hero Content */}
          <div className="relative z-10 text-center mt-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col items-center animate-float">
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-background mb-6 tracking-wide drop-shadow-2xl animate-fadeInDown">
              Hey,
              <span className="block text-accent font-thin ">Ich bin Maja.</span>
              <span className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-background mb-6 tracking-wide drop-shadow-2xl"></span>
            </h1>
          </div>
        </section>
         {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-background/70">
        <div className="flex flex-col items-center">
          <span className="text-sm tracking-widest mb-2">SCROLL</span>
          <div className="w-px h-12 bg-background/40"></div>
        </div>
      </div>
    

        {/* About Maja */}
        <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
  <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    {/* Profilbild modern, ohne Kasten */}
    <div className="flex justify-center">
      <img
        src={majaspiegel2}
        alt="Maja Profilbild"
        className="w-64 h-64 md:w-80 md:h-80 rounded-lg object-cover object-[center_80%] shadow-xl transition-transform duration-300 hover:scale-110"
      />
    </div>
    {/* Moderner Vorstellungstext */}
    <div>
      
      <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-8">
        Mit <span className="font-semibold text-primary">Koenigskristall</span> habe ich mein Herzensprojekt verwirklicht. Ich habe mit unglaublich viel Liebe und Leidenschaft meinen eigenen Shop eröffnet. Kristalle und Heilsteine begleiten mich schon eine lange Zeit und ihre Magie fasziniert mich jeden Tag aufs Neue.
      </p>
      <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-4">
       Ich möchte dich mitnehmen auf eine wundervolle Reise in die Spiritualität. Mein Wissen und meine Erfahrungen möchte ich gerne mit dir teilen. Lass dich von der Kraft der Kristalle begeistern und finde deinen persönlichen Begleiter!
      </p>
     </div>
  </div>
</section>
      {/* Markets Section */}
      <section className="py-16 px-4 ">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Unterwegs auf magischen Märkten
              </h2>
              <div className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-8">
                <p>
                  Mit meinem Kristallstand bin ich regelmäßig auf kleinen, lokalen Märkten unterwegs. 
                  Dort teile ich meine Leidenschaft direkt mit Menschen, die sich für die faszinierende Welt der Kristalle interessieren.
                </p>
                <p className="mt-4">
                  Diese persönlichen Begegnungen sind für mich etwas ganz Besonderes - hier kann ich die Energie der Kristalle 
                  hautnah vermitteln und gemeinsam mit euch den perfekten Begleiter für euren Weg finden.
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-16">
              <img
                className="w-64 h-64 md:w-80 md:h-80 rounded-lg object-cover shadow-xl transition-transform duration-300 hover:scale-110"
                src={MajaShop}
                alt="Kristallstand auf dem Markt"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-12 items-center">
            
            <div className="flex justify-center order-2 md:order-1 mt-16 md:mt-0">
              <img
                className="w-64 h-64 md:w-80 md:h-80 rounded-lg object-cover object-top shadow-xl transition-transform duration-300 hover:scale-110"
                src={MajaCrystal}
                alt="Kristallberatung"
              />
            </div>
            
            <div className="space-y-4 order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Meine große Leidenschaft: Die Kristallberatung
              </h2>
              <div className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-8">
                <p>
                  Was mich besonders erfüllt, ist die Kommunikation mit anderen Kristall-Interessierten. 
                  In persönlichen Beratungen helfe ich dabei, den Kristall zu finden, der genau zu euch und eurer aktuellen Lebenssituation passt.
                </p>
                <p className="mt-4">
                  Jeder Mensch ist einzigartig, und so ist auch jede Beratung individuell. Gemeinsam entdecken wir, 
                  welche Kristalle euch auf eurem spirituellen Weg unterstützen und positive Veränderungen in euer Leben bringen können.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div>
        <hr className="border-t border-muted-foreground/20 my-16 mx-auto max-w-3xl" />
      </div>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-4">
                <Calendar className="w-8 h-8" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-bold text-primary">
                  Besuche mich auf kommenden Märkten
                </h3>
                <p className="text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed">
                  Hier findest du alle Termine, wo du mich und meine Kristalle persönlich antreffen kannst. 
                  Ich freue mich darauf, dich kennenzulernen!
                </p>
              </div>
            </div>
          </div>

          {/* Market Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {upcomingMarkets.map((market, idx) => (
              <div
                key={idx}
                className="group bg-white/40 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl hover:bg-white/50 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="space-y-6">
                  {/* Market Name */}
                  <h4 className=" text-xl font-bold text-primary group-hover:text-primary/90 transition-colors">
                    {market.name}
                  </h4>
                  
                  {/* Date & Time */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-muted-foreground">
                      <Calendar className="w-5 h-5 text-primary/70" />
                      <span className="text-sm font-medium">{market.date}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-muted-foreground">
                      <Clock className="w-5 h-5 text-primary/70" />
                      <span className="text-sm">{market.time}</span>
                    </div>
                    <div className="flex items-start space-x-3 text-muted-foreground">
                      <MapPin className="w-5 h-5 text-primary/70 mt-0.5 mb-0.1" />
                      <span className="text-sm">{market.location}</span>
                    </div>
                    <div className="flex items-start space-x-3 text-muted-foreground ml-8 pt-0">
                      <span className="text-sm">{market.plz}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {market.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Message */}
          <div className="text-center">
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-white/20">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-2xl md:text-3xl font-bold text-primary">
                    Ich freue mich auf dich!
                  </h4>
                  <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-4">
                    Komm einfach vorbei und lass dich von der magischen Atmosphäre verzaubern. 
                    Gemeinsam finden wir den Kristall, der perfekt zu dir und deiner Energie passt.
                  </p>
                </div>
               </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    );
}

export default AboutMe;