import { Separator } from "@/components/ui/separator";
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

// Import Components
import CrystalLibraryHero from "@/components/CrystalLibrary/CrystalLibraryHero";
import CleansingSection from "@/components/CrystalLibrary/CleansingSection";
import ChargingSection from "@/components/CrystalLibrary/ChargingSection";
import ProgrammingSection from "@/components/CrystalLibrary/ProgrammingSection";
import BrokenCrystalsSection from "@/components/CrystalLibrary/BrokenCrystalsSection";
import CombinationSection from "@/components/CrystalLibrary/CombinationSection";
import StorageSection from "@/components/CrystalLibrary/StorageSection";
import CallToAction from "@/components/CrystalLibrary/CallToAction";

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

  // Data Arrays
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
      <CrystalLibraryHero careTopics={careTopics} scrollToSection={scrollToSection} />
      
      <CleansingSection cleansingMethods={cleansingMethods} />
      <Separator className="my-16" />
      
      <ChargingSection chargingMethods={chargingMethods} />
      <Separator className="my-16" />
      
      <ProgrammingSection />
      <Separator className="my-16" />
      
      <BrokenCrystalsSection brokenCrystalMeanings={brokenCrystalMeanings} />
      <Separator className="my-16" />
      
      <CombinationSection crystalCombinations={crystalCombinations} />
      
      <StorageSection />
      
      <CallToAction />
    </div>
  );
};

export default CrystalCare;