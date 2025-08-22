import React from "react";

import Maja2 from "@/assets/Maja2.jpeg";
import MajaShop from "@/assets/MajaShop.jpeg";
import MajaCrystal from "@/assets/MajaCrystal.jpeg";
import MajaRaja from "@/assets/MajaRaja.jpeg";
import { Calendar, MapPin, Clock } from "lucide-react";
import kkschild from "@/assets/kkschild.jpeg";
import BottomFooter from "./BottomFooter";

const upcomingMarkets = [
    {
      name: "Weihnachtsmarkt Oldenburg",
      date: "15. - 17. Dezember 2024",
      time: "10:00 - 18:00 Uhr",
      location: "Schlossplatz Oldenburg",
      description: "Gemütlicher Weihnachtsmarkt mit handgefertigten Produkten und spirituellen Schätzen"
    },
    {
      name: "Neujahrsmarkt Bremen",
      date: "6. - 8. Januar 2025",
      time: "11:00 - 17:00 Uhr", 
      location: "Marktplatz Bremen",
      description: "Starte das neue Jahr mit positiver Energie und kraftvollen Kristallen"
    },
    {
      name: "Frühlingserwachen Hannover",
      date: "22. - 24. März 2025",
      time: "9:00 - 16:00 Uhr",
      location: "Stadtpark Hannover",
      description: "Erwecke deine Sinne und entdecke neue spirituelle Begleiter für das Frühjahr"
    }
  ];

function AboutMe() {
  return (
    <div className="min-h-screen bg-background">
      {/* Moderne Hero Section mit gleichem Gradient und Textstil wie im Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hintergrundbild */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${kkschild})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Gradient nach unten */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background/100 pointer-events-none"></div>
          {/* Gradient nach oben */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="animate-float">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-background mb-6 tracking-wide">
              Hier kannst du
              <span className="block text-accent font-normal">etwas über mich erfahren</span>
            </h1>
            
          </div>
        </div>
      </section>

      {/* Markets Section */}
      <section className="py-16 px-4 ">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Unterwegs auf kleinen Märkten
              </h2>
              <div className="text-lg text-muted-foreground space-y-4">
                <p>
                  Mit meinem Kristallstand bin ich regelmäßig auf kleinen, lokalen Märkten unterwegs. 
                  Dort teile ich meine Leidenschaft direkt mit Menschen, die sich für die faszinierende Welt der Kristalle interessieren.
                </p>
                <p>
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
              <div className="text-lg text-muted-foreground space-y-4">
                <p>
                  Was mich besonders erfüllt, ist die Kommunikation mit anderen Kristall-Interessierten. 
                  In persönlichen Beratungen helfe ich dabei, den Kristall zu finden, der genau zu euch und eurer aktuellen Lebenssituation passt.
                </p>
                <p>
                  Jeder Mensch ist einzigartig, und so ist auch jede Beratung individuell. Gemeinsam entdecken wir, 
                  welche Kristalle euch auf eurem spirituellen Weg unterstützen und positive Veränderungen in euer Leben bringen können.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Kristalle ganz einfach in den Alltag integrieren
              </h2>
              <div className="text-lg text-muted-foreground space-y-4">
                <p>
                  Viele Menschen fragen mich, wie sie Kristalle am besten in ihren Alltag einbauen können. 
                  Die Antwort ist einfacher als gedacht: Es braucht keine komplizierten Rituale oder stundenlange Meditationen.
                </p>
                <p>
                  Ich zeige euch praktische und alltagstaugliche Wege, wie ihr die kraftvolle Energie der Kristalle 
                  nutzen könnt - sei es am Arbeitsplatz, zu Hause oder unterwegs. Kleine Veränderungen können große Wirkung haben.
                </p>
                <p>
                  Ob bei Stress, Unsicherheit oder anderen Herausforderungen des Lebens - 
                  die richtigen Kristalle werden zu euren treuen Begleitern und helfen euch dabei, euer inneres Gleichgewicht zu finden.
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-16">
              <img
                className="w-64 h-64 md:w-80 md:h-80 rounded-lg object-cover shadow-xl transition-transform duration-300 hover:scale-110"
                src={MajaRaja}
                alt="Kristalle im Alltag"
              />
            </div>
          </div>
        </div>
      </section>

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
                  <h4 className="text-xl font-bold text-primary group-hover:text-primary/90 transition-colors">
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
                      <MapPin className="w-5 h-5 text-primary/70 mt-0.5" />
                      <span className="text-sm">{market.location}</span>
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
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
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