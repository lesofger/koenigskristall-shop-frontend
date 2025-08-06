import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { 
  Moon, 
  Sun, 
  Droplets, 
  Sparkles, 
  Shield, 
  Heart, 
  Zap,
  AlertTriangle,
  RefreshCw,
  Gem,
  TreePine,
  Wind,
  
} from "lucide-react";

const CrystalCare = () => {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Scrollfunction for topic cards
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const careTopics = [
    {
      id: "cleansing",
      title: "Kristalle Reinigen",
      icon: <Droplets className="w-8 h-8" />,
      color: "from-blue-500/10 to-cyan-500/10",
      description: "Entferne negative Energien und bringe deine Kristalle zurück zu ihrer ursprünglichen Schwingung"
    },
    {
      id: "charging",
      title: "Kristalle Aufladen",
      icon: <Zap className="w-8 h-8" />,
      color: "from-yellow-500/10 to-orange-500/10",
      description: "Verstärke die natürliche Energie deiner Kristalle durch verschiedene Aufladmethoden"
    },
    {
      id: "programming",
      title: "Kristalle Programmieren",
      icon: <Heart className="w-8 h-8" />,
      color: "from-pink-500/10 to-rose-500/10",
      description: "Setze klare Absichten und verbinde dich energetisch mit deinen Kristallen"
    },
    {
      id: "storage",
      title: "Aufbewahrung & Pflege",
      icon: <Shield className="w-8 h-8" />,
      color: "from-green-500/10 to-emerald-500/10",
      description: "Schütze deine Kristalle und bewahre ihre Energie optimal auf"
    },
    {
      id: "broken",
      title: "Wenn Kristalle zerbrechen",
      icon: <AlertTriangle className="w-8 h-8" />,
      color: "from-purple-500/10 to-violet-500/10",
      description: "Die spirituelle Bedeutung und der richtige Umgang mit zerbrochenen Kristallen"
    },
    {
      id: "combination",
      title: "Kristalle Kombinieren",
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-indigo-500/10 to-blue-500/10",
      description: "Welche Kristalle harmonieren miteinander und verstärken ihre Wirkung"
    }
  ];

  const cleansingMethods = [
    {
      method: "Mondlicht",
      icon: <Moon className="w-6 h-6" />,
      description: "Lege deine Kristalle über Nacht bei Vollmond ins Mondlicht. Dies ist die sanfteste und universellste Reinigungsmethode.",
      duration: "Eine ganze Nacht",
      suitableFor: "Alle Kristalle",
      energy: "Weiblich, intuitiv, beruhigend"
    },
    {
      method: "Sonnenlicht",
      icon: <Sun className="w-6 h-6" />,
      description: "Kurze Sonnenbäder am Morgen energetisieren und reinigen. Vorsicht bei empfindlichen Steinen!",
      duration: "30 Minuten - 2 Stunden",
      suitableFor: "Citrin, Bergkristall, Karneol",
      energy: "Männlich, aktivierend, kraftvoll"
    },
    {
      method: "Räucherwerk",
      icon: <Wind className="w-6 h-6" />,
      description: "Salbei, Palo Santo oder Weihrauch reinigen die Aura der Kristalle durch heiligen Rauch.",
      duration: "2-5 Minuten",
      suitableFor: "Alle Kristalle",
      energy: "Spirituell, transformierend, klärend"
    },
    {
      method: "Salzwasser",
      icon: <Droplets className="w-6 h-6" />,
      description: "Meersalz mit destilliertem Wasser löst negative Energien. Nicht für alle Kristalle geeignet!",
      duration: "2-24 Stunden",
      suitableFor: "Harte Kristalle (Quarz-Familie)",
      energy: "Erdend, reinigend, neutralisierend"
    },
    {
      method: "Bergkristall",
      icon: <Gem className="w-6 h-6" />,
      description: "Andere Kristalle auf einer Bergkristall-Druse platzieren für sanfte Energiereinigung.",
      duration: "4-24 Stunden",
      suitableFor: "Alle empfindlichen Kristalle",
      energy: "Neutral, verstärkend, harmonisierend"
    },
    {
      method: "Erdung",
      icon: <TreePine className="w-6 h-6" />,
      description: "Kristalle in der Erde vergraben, um sie zu erden und zu neutralisieren.",
      duration: "24 Stunden - 1 Woche",
      suitableFor: "Stark belastete Kristalle",
      energy: "Erdend, regenerierend, heilend"
    }
  ];

  const chargingMethods = [
    {
      method: "Vollmond-Energie",
      description: "Die kraftvollste Zeit zum Aufladen. Kristalle absorbieren die maximale Mondenergie.",
      timing: "3 Tage vor bis 3 Tage nach Vollmond",
      effect: "Verstärkt Intuition und emotionale Heilung"
    },
    {
      method: "Sonnenaufgang",
      description: "Frische, neue Energie des beginnenden Tages lädt Kristalle mit Vitalität auf.",
      timing: "30 Minuten vor bis 1 Stunde nach Sonnenaufgang",
      effect: "Bringt Klarheit und neue Perspektiven"
    },
    {
      method: "Heilige Geometrie",
      description: "Kristalle in geometrischen Mustern (Blume des Lebens, Merkaba) anordnen.",
      timing: "Mindestens 4 Stunden",
      effect: "Harmonisiert und verstärkt die Kristallenergie"
    },
    {
      method: "Meditation & Absicht",
      description: "Persönliche Energie und klare Absichten in die Kristalle hineinmeditieren.",
      timing: "10-30 Minuten täglich",
      effect: "Persönliche Verbindung und spezifische Programmierung"
    }
  ];

  const brokenCrystalMeanings = [
    {
      meaning: "Schutz erfüllt",
      description: "Der Kristall hat negative Energie für dich aufgenommen und sich dabei 'geopfert'. Danke ihm für seinen Dienst.",
      action: "Erdbestattung mit Dankbarkeit"
    },
    {
      meaning: "Transformation vollendet",
      description: "Du hast eine wichtige Lebensphase abgeschlossen. Der Kristall hat seine Aufgabe erfüllt.",
      action: "Teile die Stücke oder gib sie an die Natur zurück"
    },
    {
      meaning: "Energetische Überlastung",
      description: "Der Kristall war zu stark belastet und konnte die Energie nicht mehr halten.",
      action: "Reinige die Stücke und verwende sie zur Erdung"
    },
    {
      meaning: "Neubeginn nötig",
      description: "Ein Zeichen, dass du bereit für neue Energie und Veränderung in deinem Leben bist.",
      action: "Wähle einen neuen Kristall für deine aktuelle Lebensphase"
    }
  ];

  const crystalCombinations = [
    {
      purpose: "Liebe & Beziehungen",
      crystals: ["Rosenquarz", "Rhodonit", "Morganit"],
      effect: "Öffnet das Herz, heilt emotionale Wunden, zieht Liebe an"
    },
    {
      purpose: "Schutz & Erdung",
      crystals: ["Schwarzer Turmalin", "Hämatit", "Obsidian"],
      effect: "Starker energetischer Schutz, Erdung, Abwehr negativer Energien"
    },
    {
      purpose: "Spirituelle Entwicklung",
      crystals: ["Amethyst", "Bergkristall", "Selenit"],
      effect: "Verstärkt Intuition, Meditation, Verbindung zu höheren Dimensionen"
    },
    {
      purpose: "Manifestation & Erfolg",
      crystals: ["Citrin", "Pyrit", "Grüner Aventurin"],
      effect: "Zieht Wohlstand an, verstärkt Willenskraft, bringt Glück"
    },
    {
      purpose: "Emotional Healing",
      crystals: ["Lepidolith", "Mondstein", "Aquamarin"],
      effect: "Beruhigt Emotionen, bringt Frieden, fördert emotionale Balance"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-primary mb-6 tracking-wide">
              Kristall
              <span className="block text-primary font-normal">Bibliothek</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
              Entdecke die Geheimnisse der spirituellen Kristallpflege. Von der Reinigung bis zur Programmierung - 
              hier findest du alles für den liebevollen Umgang mit deinen energetischen Begleitern.
            </p>
          </div>

          {/* Topic Overview Cards - with Click Handler */}
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
                  {/* Hover-Hinweis */}
                  <div className="mt-4 opacity-0 group-hover:opacity-70 transition-opacity duration-300">
                    <p className="text-xs text-primary font-medium">Zum Abschnitt springen →</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cleansing Methods - withs ID */}
      <section id="cleansing" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-primary mb-6 tracking-wide">
              Kristalle Reinigen
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
              Kristalle nehmen Energien aus ihrer Umgebung auf. Regelmäßige Reinigung ist essentiell, 
              um ihre natürliche Schwingung zu erhalten und negative Energien zu entfernen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {cleansingMethods.map((method, idx) => (
              <Card key={idx} className="bg-card border border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                      {method.icon}
                    </div>
                    <h3 className="font-serif text-lg font-light text-black">
                      {method.method}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {method.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-primary">Dauer:</span>
                      <Badge variant="secondary" className="text-xs">{method.duration}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-primary">Geeignet für:</span>
                      <span className="text-xs text-muted-foreground">{method.suitableFor}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-primary">Energie:</span>
                      <span className="text-xs text-muted-foreground">{method.energy}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Warning Box */}
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif text-lg font-light text-amber-800 mb-2">
                    Wichtiger Hinweis
                  </h4>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    <strong>Vorsicht bei Salzwasser:</strong> Weiche Mineralien wie Selenit, Malachit oder Pyrit können durch Salzwasser beschädigt werden. 
                    <strong>Sonnenlicht:</strong> Amethyst, Rosenquarz und andere können ausbleichen. Informiere dich vorher über deinen spezifischen Kristall.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Charging Methods - with ID */}
      <section id="charging" className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-primary mb-6 tracking-wide">
              Kristalle Aufladen
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
              Nach der Reinigung benötigen Kristalle neue, positive Energie. Verschiedene Aufladmethoden 
              verstärken ihre natürlichen Eigenschaften und bereiten sie für ihre spirituelle Arbeit vor.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {chargingMethods.map((method, idx) => (
              <Card key={idx} className="bg-card border border-border">
                <CardContent className="p-6">
                  <h3 className="font-serif text-lg font-light text-black mb-3">
                    {method.method}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {method.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium text-primary">Timing:</span>
                      <span className="text-xs text-muted-foreground">{method.timing}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium text-primary">Wirkung:</span>
                      <span className="text-xs text-muted-foreground">{method.effect}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Programming Crystals - with ID */}
      <section id="programming" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-primary mb-6 tracking-wide">
              Kristalle Programmieren
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
              Das Programmieren verbindet dich energetisch mit deinem Kristall und setzt klare Absichten für seine Arbeit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="bg-card border border-border">
                <CardContent className="p-8">
                  <h3 className="font-serif text-xl font-light text-black mb-6">
                    Schritt-für-Schritt Anleitung
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">1</div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Vorbereitung:</strong> Kristall reinigen und in ruhiger Umgebung platzieren
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">2</div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Verbindung:</strong> Kristall in die Hände nehmen und tief atmen
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">3</div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Absicht setzen:</strong> Klare, positive Intention formulieren
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">4</div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Visualisierung:</strong> Absicht als Licht in den Kristall fließen lassen
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">5</div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Bestätigung:</strong> Mit Dankbarkeit die Programmierung abschließen
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-serif text-xl font-light text-black">
                      Beispiel-Programmierungen
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-background/80 rounded-lg p-4">
                      <h4 className="font-medium text-primary text-sm mb-2">Für Schutz:</h4>
                      <p className="text-xs text-muted-foreground italic">
                        "Ich programmiere dich, mich vor negativen Energien zu schützen und mir Sicherheit zu geben."
                      </p>
                    </div>
                    <div className="bg-background/80 rounded-lg p-4">
                      <h4 className="font-medium text-primary text-sm mb-2">Für Liebe:</h4>
                      <p className="text-xs text-muted-foreground italic">
                        "Hilf mir dabei, mein Herz zu öffnen und mehr Selbstliebe und Mitgefühl zu entwickeln."
                      </p>
                    </div>
                    <div className="bg-background/80 rounded-lg p-4">
                      <h4 className="font-medium text-primary text-sm mb-2">Für Klarheit:</h4>
                      <p className="text-xs text-muted-foreground italic">
                        "Unterstütze mich dabei, klare Entscheidungen zu treffen und meinen Weg zu erkennen."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Broken Crystals - with ID */}
      <section id="broken" className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-primary mb-6 tracking-wide">
              Wenn Kristalle zerbrechen
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
              Ein zerbrochener Kristall ist kein Unglück, sondern trägt eine spirituelle Botschaft. 
              Verstehe die Bedeutung und den respektvollen Umgang damit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {brokenCrystalMeanings.map((meaning, idx) => (
              <Card key={idx} className="bg-card border border-border">
                <CardContent className="p-6">
                  <h3 className="font-serif text-lg font-light text-black mb-3">
                    {meaning.meaning}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {meaning.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-primary">Empfohlene Handlung:</span>
                    <span className="text-xs text-muted-foreground">{meaning.action}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20">
            <CardContent className="p-8 text-center">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-serif text-xl font-light text-black mb-4">
                Ritual für zerbrochene Kristalle
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Nimm dir einen Moment der Stille. Halte die Stücke in deinen Händen und bedanke dich für den Dienst, 
                den der Kristall geleistet hat. Spüre, ob die Energie noch da ist oder ob sie sich transformiert hat. 
                Folge deiner Intuition bei der Entscheidung, was mit den Stücken geschehen soll.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Crystal Combinations - with ID */}
      <section id="combination" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-primary mb-6 tracking-wide">
              Kristalle Kombinieren
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
              Verschiedene Kristalle können sich gegenseitig verstärken und harmonieren. 
              Entdecke kraftvolle Kombinationen für spezifische Zwecke.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {crystalCombinations.map((combo, idx) => (
              <Card key={idx} className="bg-card border border-border">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-serif text-lg font-light text-black">
                      {combo.purpose}
                    </h3>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    {combo.crystals.map((crystal, crystalIdx) => (
                      <Badge key={crystalIdx} variant="secondary" className="mr-2 mb-2">
                        {crystal}
                      </Badge>
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {combo.effect}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif text-lg font-light text-amber-800 mb-2">
                    Tipps zum Kombinieren
                  </h4>
                  <ul className="text-amber-700 text-sm space-y-1">
                    <li>• Beginne mit 2-3 Kristallen und spüre ihre Energie</li>
                    <li>• Vermeide zu viele verschiedene Energien auf einmal</li>
                    <li>• Vertraue deiner Intuition bei der Auswahl</li>
                    <li>• Bergkristall verstärkt die Wirkung anderer Kristalle</li>
                    <li>• Teste Kombinationen einzeln, bevor du sie dauerhaft nutzt</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Storage Tips - with ID */}
      <section id="storage" className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-primary mb-6 tracking-wide">
              Aufbewahrung & Pflege
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
              Die richtige Aufbewahrung schützt deine Kristalle und erhält ihre Energie optimal.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border border-border">
              <CardContent className="p-6 text-center">
                <Shield className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-serif text-lg font-light text-black mb-3">
                  Schutz vor Beschädigungen
                </h3>
                <ul className="text-muted-foreground text-sm space-y-2 text-left">
                  <li>• Weiche Unterlagen verwenden</li>
                  <li>• Harte und weiche Kristalle getrennt lagern</li>
                  <li>• Vor direkten Stößen schützen</li>
                  <li>• Seidenbeutel oder Samtkästen nutzen</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border">
              <CardContent className="p-6 text-center">
                <Sun className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-serif text-lg font-light text-black mb-3">
                  Umgebungsbedingungen
                </h3>
                <ul className="text-muted-foreground text-sm space-y-2 text-left">
                  <li>• Vor direkter Sonneneinstrahlung schützen</li>
                  <li>• Trockene Umgebung bevorzugen</li>
                  <li>• Extreme Temperaturen vermeiden</li>
                  <li>• Gute Luftzirkulation gewährleisten</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border">
              <CardContent className="p-6 text-center">
                <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-serif text-lg font-light text-black mb-3">
                  Energetische Aspekte
                </h3>
                <ul className="text-muted-foreground text-sm space-y-2 text-left">
                  <li>• Regelmäßige Reinigung einplanen</li>
                  <li>• Mit anderen Kristallen zusammen lagern</li>
                  <li>• Positive Absichten für den Aufbewahrungsort</li>
                  <li>• Intuition bei der Platzierung folgen</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action - with funktional Links */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-primary mb-6 tracking-wide">
            Entdecke deine Kristallreise
          </h2>
          <p className="text-lg text-muted-foreground mb-8 font-light leading-relaxed">
            Jetzt wo du die Geheimnisse der Kristallpflege kennst, bist du bereit für deine eigene spirituelle Reise. 
            Entdecke meine sorgfältig ausgewählten Kristalle, die darauf warten, dich zu begleiten.
          </p>
          
          {/* clickable cards with Links */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Link to="/shop" className="group">
              <Card className="bg-background/80 backdrop-blur-sm border border-primary/20 p-6 hover:shadow-crystal transition-all duration-300 cursor-pointer">
                <CardContent className="p-0 text-center">
                  <Gem className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-serif text-lg font-light text-black mb-2">
                    Zum Kristall-Shop
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Entdecke meine handverlesene Kristall-Kollektion
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/consulting" className="group">
              <Card className="bg-background/80 backdrop-blur-sm border border-primary/20 p-6 hover:shadow-crystal transition-all duration-300 cursor-pointer">
                <CardContent className="p-0 text-center">
                  <Heart className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-serif text-lg font-light text-black mb-2">
                    Persönliche Beratung
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Lass dich bei der Kristallauswahl begleiten
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};

export default CrystalCare;