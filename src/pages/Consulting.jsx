import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  Sparkles, 
  Phone, 
  Mail, 
  Send, 
  Youtube, 
  Instagram,
  Star,
  Gem,
  MessageCircle,
  Clock,
  CheckCircle
} from "lucide-react";
import BottomFooter from "../components/BottomFooter";
import emailjs from "emailjs-com";
import majaBeratung from "../assets/majaBeratung.jpg";

function Consulting() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //emailjs ID+Key
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    honeypot: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

 const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  // Honeypot validation
  if (formData.honeypot) {
    setIsSubmitting(false);
    return; //Bot detected no submit 
  }
  setIsSubmitting(true);

  emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    formData,
    PUBLIC_KEY
  ).then(
    (result) => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', honeypot: '' });
    },
    (error) => {
      setIsSubmitting(false);
      alert("Fehler beim Senden: " + error.text);
    }
  );
};

  const consultingServices = [
    {
      title: "Persönliche Kristallauswahl",
      description: "Gemeinsam finden wir den perfekten Kristall für deine aktuelle Lebenssituation.",
      icon: <Gem className="w-6 h-6" />,
      duration: "30 - 45 Minuten"
    },
    {
      title: "Spirituelle Lebensberatung",
      description: "Unterstützung bei wichtigen Lebensentscheidungen mit kristalliner Weisheit.",
      icon: <Heart className="w-6 h-6" />,
      duration: "30 - 60 Minuten"
    },
    {
      title: "Rituale & Anwendung",
      description: "Lerne, Kristalle in kraftvolle Rituale einzubinden.",
      icon: <Sparkles className="w-6 h-6" />,
      duration: "30 Minuten"
    },
    {
      title: "Energetische Reinigung und Schutz",
      description: "Beratung für die optimale Platzierung von Kristallen in deinem Zuhause.",
      icon: <Star className="w-6 h-6" />,
      duration: "60 - 90 Minuten"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
       {/* Moderne Hero Section mit gleichem Gradient und Textstil wie im Hero */}
            <section className="relative w-full h-[93vh] md:h-[93vh] flex items-center justify-center overflow-hidden">
                {/* Hintergrundbild mit individuellem Ausschnitt und Zoom auf Desktop */}
                <img
                  src={majaBeratung}
                  alt="Hero"
                  className="absolute inset-0 w-full h-full object-cover object-[45%_30%] transition-transform duration-700 md:scale-105  lg:scale-110 "
                />
                {/* Gradient nach unten */}
                <div className="absolute  inset-0 bg-gradient-hero pointer-events-none"></div>
                {/* Hero Content */}
                <div className="relative z-10 text-center mt-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col items-center animate-float">
                  <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-background mb-6 tracking-wide drop-shadow-2xl animate-fadeInDown">
                    Persönliche 
                    <span className="block text-accent font-thin ">Kristallberatung</span>
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
      

      {/* Services Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-light text-primary mb-4 tracking-wide">
              Meine Beratungsleistungen
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
               Jede Beratung ist einzigartig und wird individuell auf deine Bedürfnisse abgestimmt.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {consultingServices.map((service, idx) => (
              <Card key={idx} className="bg-card border border-border hover:shadow-crystal transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary flex-shrink-0">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-lg font-light text-black mb-2">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-2 text-primary">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs font-medium">{service.duration}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Contact Form Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-primary mb-4 tracking-wide">
              Erzähle mir von deinem Anliegen
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Teile deine Geschichte mit mir und lass uns gemeinsam den perfekten Weg für deine spirituelle Reise finden.
            </p>
          </div>

          <Card className="bg-background/80 backdrop-blur-sm border border-primary/20">
            <CardContent className="p-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Dein Name *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                        placeholder="Wie soll ich dich nennen?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        E-Mail Adresse *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                        placeholder="deine@email.de"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Telefonnummer (optional)
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full"
                        placeholder="+49 123 456789"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Betreff
                      </label>
                          <Input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full"
                            placeholder="Worum geht es?"
                          />
                        </div>
                      </div>

                      {/* Honeypot-Feld AUSSERHALB des Grid-Containers */}
                      <div style={{ display: "none" }}>
                        <label>
                          Bitte nicht ausfüllen:
                          <input
                            type="text"
                            name="honeypot"
                            value={formData.honeypot}
                            onChange={handleInputChange}
                            autoComplete="off"
                            tabIndex="-1"
                          />
                        </label>
</div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Dein Anliegen *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full resize-none"
                      placeholder="Erzähle mir von deiner aktuellen Lebenssituation, deinen Herausforderungen oder was du dir von einer Kristallberatung erhoffst. Je mehr du teilst, desto besser kann ich dir helfen..."
                    />
                  </div>

                  <div className="text-center">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-primary text-background hover:bg-primary/90 px-8 py-3 text-lg font-medium tracking-wide shadow-crystal"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-background mr-2"></div>
                          Wird gesendet...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Nachricht senden
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="font-serif text-2xl font-light text-primary mb-4">
                    Vielen Dank für deine Nachricht!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Ich habe deine Anfrage erhalten und werde mich innerhalb von 24 Stunden bei dir melden.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-background"
                  >
                    Neue Nachricht senden
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Contact Information & Social Media */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-light text-primary mb-4 tracking-wide">
                Weitere Kontaktmöglichkeiten
              </h2>
              <p className="text-muted-foreground">
                Folge mir auf meinen sozialen Kanälen, um nichts zu verpassen.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              {/* Email */}
              <Card className="bg-card border border-border hover:shadow-crystal transition-all duration-300 group w-72">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16  text-white mb-4  transition-colors duration-300">
                    <img src="email.png" alt="E-Mail" className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-lg font-light text-black mb-2">
                    E-Mail
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Antwort innerhalb 24h
                  </p>
                  <a 
                    href="mailto:shop@koenigskristall.de"
                    className="text-primary font-medium hover:underline"
                  >
                    shop@koenigskristall.de
                  </a>
                </CardContent>
              </Card>

              {/* Instagram */}
              <Card className="bg-card border border-border hover:shadow-crystal transition-all duration-300 group w-72">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16  mb-4  transition-colors duration-300">
                    <img src="instagram.png" alt="Instagram" className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-lg font-light text-black mb-2">
                    Instagram
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Tägliche Kristall-Inspiration
                  </p>
                  <a 
                    href="https://instagram.com/koenigskristall"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-medium hover:underline"
                  >
                    @koenigskristall
                  </a>
                </CardContent>
              </Card>

              {/* TikTok */}
              <Card className="bg-card border border-border hover:shadow-crystal transition-all duration-300 group w-72">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16  text-white mb-4  transition-colors duration-300">
                    <img src="tick-tack.png" alt="TikTok" className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-lg font-light text-black mb-2">
                    TikTok
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Kurze Kristall-Videos & Trends
                  </p>
                  <a 
                    href="https://tiktok.com/@koenigskristall"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-medium hover:underline"
                  >
                    @koenigskristall
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
</section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-primary mb-6 tracking-wide">
            Bereit für deine Kristallreise ?
          </h2>
          <p className="text-lg text-muted-foreground mb-4 font-light leading-relaxed">
            Jede große Veränderung beginnt mit einem ersten Schritt. Lass uns gemeinsam 
            deinen Weg zu mehr spiritueller Klarheit und Wohlbefinden erkunden.
          </p>
          
        </div>
      </section>
      <BottomFooter />
    </div>
  );
}

export default Consulting;