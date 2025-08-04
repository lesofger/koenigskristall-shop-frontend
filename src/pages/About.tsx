import React from "react";
import handLogo from "@/assets/überMichLogoHand.png";
import Maja2 from "@/assets/Maja2.jpeg";
import MajaShop from "@/assets/MajaShop.jpeg";
import MajaCrystal from "@/assets/MajaCrystal.jpeg";
import MajaRaja from "@/assets/MajaRaja.jpeg";
import downArrow from "@/assets/downArrow.png";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Schön, dass Du hier bist!
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Hier möchte ich dir kurz etwas über mich und meine Liebe zu Kristallen erzählen.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="pt-0.1 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center -mt-8 pb-8">
              <img
                className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover object-top shadow-xl border-4 border-white"
                src={Maja2}
                alt="Maja"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Ich bin Maja
              </h2>
              <div className="text-lg text-muted-foreground space-y-4">
                <p>
                  Ich habe vor einiger Zeit mein Herzensprojekt Koenigskristall zum Leben erweckt.
                  Mit unglaublich viel Liebe und Leidenschaft habe ich meinen eigenen Shop eröffnet.
                </p>
                <p>
                  Ich möchte Euch mitnehmen auf eine wundervolle Reise in die Spiritualität und Magie.
                  Schon seit langer Zeit beschäftige ich mich mit der Kraft der Kristalle und möchte mein Wissen gerne mit euch teilen.
                </p>
                <p>
                  Ich möchte euch zeigen, wie sich euer Leben zum positiven verändert wird, sobald ihr die richtigen Kristalle in eurem Leben habt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Markets Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
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
            <div className="flex justify-center">
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
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center order-2 md:order-1">
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
          <div className="grid md:grid-cols-2 gap-12 items-center">
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
            <div className="flex justify-center">
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
      <section className="py-20 px-4 bg-gradient-to-br from-primary/15 via-secondary/10 to-primary/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <img
                className="w-16 h-16 mx-auto animate-bounce opacity-70"
                src={downArrow}
                alt="arrow"
              />
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-bold text-primary">
                  Der erste Schritt ist getan
                </h3>
                <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed">
                  Der erste Schritt in die richtige Richtung ist bereits getan, denn Du bist hier auf meiner Seite gelandet.
                </p>
              </div>
            </div>
            
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-white/20">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  Schau dich gerne um und lass dich von deiner Intuition leiten. 
                  Vertraue auf dein Gefühl - es wird dich zu dem Kristall führen, der perfekt zu dir passt.
                </p>
                
                <div className="text-center space-y-4">
                  <p className="text-2xl md:text-3xl font-bold text-primary">
                    Dein Kristall wartet bereits auf dich!
                  </p>
                  <div className="flex justify-center space-x-2 text-primary/60">
                    <span className="text-2xl animate-pulse">✨</span>
                    <span className="text-xl animate-pulse delay-200">💎</span>
                    <span className="text-2xl animate-pulse delay-400">✨</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;