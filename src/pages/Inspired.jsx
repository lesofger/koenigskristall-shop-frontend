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

// Import Components - KORRIGIERTE PFADE
import HeroLibrary from "@/components/InpiredComponents/HeroLibrary";
import Cleaning from "@/components/InpiredComponents/Cleaning";
import Charging from "@/components/InpiredComponents/Charging";
import CrystalProgramming from "@/components/InpiredComponents/CrystalProgramming";
import BrokenCrystal from "@/components/InpiredComponents/BrokenCrystal";
import CrystalCombination from "@/components/InpiredComponents/CrystalCombination";
import StoringCrystals from "@/components/InpiredComponents/StoringCrystals";
import CTAcomponent from "@/components/InpiredComponents/CTAcomponent";
import BottomFooter from "../components/BottomFooter";

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
      description: "Entferne negative Energien und bringe deine Kristalle zurück zu ihrer ursprünglichen Schwingung."
    },
    {
      id: "charging",
      title: "Kristalle Aufladen",
      icon: <Zap className="w-8 h-8" />,
      color: "from-yellow-500/10 to-orange-500/10",
      description: "Verstärke die natürliche Energie deiner Kristalle durch verschiedene Auflademethoden."
    },
    {
      id: "programming",
      title: "Kristalle Programmieren",
      icon: <Heart className="w-8 h-8" />,
      color: "from-pink-500/10 to-rose-500/10",
      description: "Setze klare Absichten und verbinde dich energetisch mit deinen Kristallen."
    },
    {
      id: "combination",
      title: "Kristalle Kombinieren",
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-indigo-500/10 to-blue-500/10",
      description: "Welche Kristalle harmonieren miteinander und verstärken ihre Wirkung."
    },
    {
      id: "storage",
      title: "Aufbewahrung & Pflege",
      icon: <Shield className="w-8 h-8" />,
      color: "from-green-500/10 to-emerald-500/10",
      description: "Schütze deine Kristalle und bewahre ihre Energie optimal auf."
    },
    {
      id: "broken",
      title: "Wenn Kristalle zerbrechen",
      icon: <AlertTriangle className="w-8 h-8" />,
      color: "from-purple-500/10 to-violet-500/10",
      description: "Die spirituelle Bedeutung und der richtige Umgang mit zerbrochenen Kristallen."
    }
    ];

  const cleansingMethods = [
    {
      method: "Mondlicht",
      icon: <Moon className="w-6 h-6" />,
      description: "Lege deine Kristalle über Nacht bei Vollmond ins Mondlicht. Dies ist die universellste Reinigungsmethode.",
      duration: "Eine ganze Nacht",
      suitableFor: "Alle Kristalle",
      energy: "Weiblich, intuitiv, beruhigend"
    },
    
    {
      method: "Räucherwerk",
      icon: <Wind className="w-6 h-6" />,
      description: "Salbei, Palo Santo oder Weihrauch entfernen aufgenommene Energien und reinigen somit den Kristall.",
      duration: "2-5 Minuten",
      suitableFor: "Alle Kristalle",
      energy: "Spirituell, transformierend, klärend"
    },
   
    {
      method: "Selenit",
      icon: <Gem className="w-6 h-6" />,
      description: "Andere Kristalle, auf oder neben eine Selenit-Stange legen für eine sanfte Reinigung.",
      duration: "Eine ganze Nacht",
      suitableFor: "Alle empfindlichen Kristalle",
      energy: "Neutral, sanft, harmonisierend"
    },
   
  ];

  const chargingMethods = [
    {
      method: "Vollmond-Energie",
      description: "Die kraftvollste Zeit zum Aufladen. Kristalle nehmen die magische Mondenergie auf.",
      timing: "3 Tage vor bis 3 Tage nach Vollmond",
      effect: "Verstärkt Intuition und emotionale Heilung"
    },
    {
      method: "Sonnenauf- und Untergang",
      description: "Nutze die magische Energie der aufgehenden und untergehenden Sonne.",
      timing: "30 Minuten vor, bis 1 Stunde nach Sonnenauf- oder Untergang",
      effect: "Bringt Klarheit und neue Perspektiven"
    },
    {
      method: "Bergkristall",
      description: "Andere Kristalle übernehmen seine Klarheit und verstärken dadurch ihre eigenen Kräfte.",
      timing: "Eine ganze Nacht",
      effect: "Fördert Harmonie und Klarheit"
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
      crystals: ["Rosenquarz", "Mondstein"],
      effect: "Öffnet das Herz, heilt emotionale Wunden, zieht Liebe an"
    },
    {
      purpose: "Schutz & Erdung",
      crystals: ["Schwarzer Turmalin", "Rauchquarz"],
      effect: "Starker energetischer Schutz, Erdung, Abwehr negativer Energien"
    },
   {
      purpose: "Manifestation & Erfolg",
      crystals: ["Citrin", "Pyrit", "Grüner Aventurin"],
      effect: "Zieht Wohlstand an, verstärkt Willenskraft, bringt Glück"
    },
   ];

  return (
    <div className="min-h-screen bg-background">
      <HeroLibrary careTopics={careTopics} scrollToSection={scrollToSection} />
      
      <Cleaning cleansingMethods={cleansingMethods} />
      <Separator className="my-0" />
      
      <Charging chargingMethods={chargingMethods} />
      <Separator className="my-0" />
      
      <CrystalProgramming />
      <Separator className="my-0" />

      <CrystalCombination crystalCombinations={crystalCombinations} />

      <StoringCrystals />
      
      <BrokenCrystal brokenCrystalMeanings={brokenCrystalMeanings} />
      <Separator className="my-0" />


      <CTAcomponent />
      <BottomFooter />
    </div>
  );
};

export default CrystalCare;