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

function Consulting() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Hier würdest du normalerweise die Email-API aufrufen
    // Beispiel mit EmailJS oder einer Backend-API
    console.log('Formular gesendet:', formData);
    
    // Simulation der Übertragung
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 2000);
  };

  const consultingServices = [
    {
      title: "Persönliche Kristallauswahl",
      description: "Gemeinsam finden wir den perfekten Kristall für deine individuelle Lebenssituation",
      icon: <Gem className="w-6 h-6" />,
      duration: "30-45 Minuten"
    },
    {
      title: "Spirituelle Lebensberatung",
      description: "Unterstützung bei wichtigen Lebensentscheidungen mit kristalliner Weisheit",
      icon: <Heart className="w-6 h-6" />,
      duration: "60 Minuten"
    },
    {
      title: "Kristall-Rituale & Anwendung",
      description: "Lerne, wie du deine Kristalle optimal für Meditation und Heilung einsetzt",
      icon: <Sparkles className="w-6 h-6" />,
      duration: "45 Minuten"
    },
    {
      title: "Energetische Hausreinigung",
      description: "Beratung für die optimale Platzierung von Kristallen in deinem Zuhause",
      icon: <Star className="w-6 h-6" />,
      duration: "60-90 Minuten"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-primary mb-6 tracking-wide">
            Persönliche
            <span className="block text-primary font-normal">Kristallberatung</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed mb-8">
            Lass dich auf deiner spirituellen Reise begleiten. Mit über 4 Jahren Erfahrung in der 
            Kristallheilkunde helfe ich dir dabei, die perfekten energetischen Begleiter für dein Leben zu finden.
          </p>
          <div className="flex items-center justify-center gap-4 text-primary">
            <Heart className="w-5 h-5" />
            <span className="text-sm font-medium">Individuelle Beratung mit Herz</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-primary mb-4 tracking-wide">
              Meine Beratungsleistungen
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Jede Beratung ist einzigartig und wird individuell auf deine Bedürfnisse abgestimmt
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
              Teile deine Geschichte mit mir und lass uns gemeinsam den perfekten Weg für deine spirituelle Reise finden
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
              Folge mir auf meinen sozialen Kanälen oder ruf mich direkt an
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Telefon */}
            <Card className="bg-card border border-border hover:shadow-crystal transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-light text-black mb-2">
                  Direkter Kontakt
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Mo-Fr: 9:00-18:00 Uhr
                </p>
                <a 
                  href="tel:+4912345678900"
                  className="text-primary font-medium hover:underline"
                >
                  +49 123 456 78 900
                </a>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="bg-card border border-border hover:shadow-crystal transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-light text-black mb-2">
                  E-Mail
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Antwort innerhalb 24h
                </p>
                <a 
                  href="mailto:beratung@koenigskristall.de"
                  className="text-primary font-medium hover:underline"
                >
                  beratung@koenigskristall.de
                </a>
              </CardContent>
            </Card>

            {/* YouTube */}
            <Card className="bg-card border border-border hover:shadow-crystal transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4 group-hover:bg-red-200 transition-colors duration-300">
                  <Youtube className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-light text-black mb-2">
                  YouTube
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Kristall-Tutorials & Tipps
                </p>
                <a 
                  href="https://youtube.com/@koenigskristall"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 font-medium hover:underline"
                >
                  @koenigskristall
                </a>
              </CardContent>
            </Card>

            {/* Instagram */}
            <Card className="bg-card border border-border hover:shadow-crystal transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 text-pink-600 mb-4 group-hover:bg-pink-200 transition-colors duration-300">
                  <Instagram className="w-8 h-8" />
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
                  className="text-pink-600 font-medium hover:underline"
                >
                  @koenigskristall
                </a>
              </CardContent>
            </Card>
          </div>

          {/* TikTok als separate Zeile */}
          <div className="flex justify-center mt-8">
            <Card className="bg-card border border-border hover:shadow-crystal transition-all duration-300 group w-full max-w-sm">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-4 group-hover:bg-gray-800 transition-colors duration-300">
                  <MessageCircle className="w-8 h-8" />
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
                  className="text-black font-medium hover:underline"
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
            Bereit für deine Kristallreise?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 font-light leading-relaxed">
            Jede große Veränderung beginnt mit einem ersten Schritt. Lass uns gemeinsam 
            deinen Weg zu mehr spiritueller Klarheit und Wohlbefinden erkunden.
          </p>
          <div className="flex items-center justify-center gap-4 text-primary">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">Deine Transformation wartet auf dich</span>
            <Heart className="w-5 h-5" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Consulting;