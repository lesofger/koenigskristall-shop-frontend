import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Collections = () => {
  const [filter, setFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  const categories = [
    { value: "all", label: "Alle Kristalle" },
    { value: "Bergkristall", label: "Bergkristall" },
    { value: "Rosenquarz", label: "Rosenquarz" },
    { value: "Amethyst", label: "Amethyst" },
    { value: "Citrin", label: "Citrin" },
    { value: "Orangencalcit", label: "Orangencalcit" },
    { value: "Karneol", label: "Karneol" },
    { value: "Mondstein", label: "Mondstein" },
    { value: "Selenit", label: "Selenit" },
    { value: "Aquamarin", label: "Aquamarin" },
    { value: "Regenbogenfluorit", label: "Regenbogenfluorit" },
    { value: "Grüner Fluorit", label: "Grüner Fluorit" },
    { value: "Aventurin", label: "Aventurin" },
    { value: "Malachit", label: "Malachit" },
    { value: "Jaspis Rot / Algen Jaspis", label: "Jaspis Rot / Algen Jaspis" },
    { value: "Labradorit", label: "Labradorit" },
    { value: "Rauchquarz", label: "Rauchquarz" },
    { value: "Pyrit", label: "Pyrit" },
    { value: "Tigerauge", label: "Tigerauge" },
    { value: "Schwarzer Turmalin", label: "Schwarzer Turmalin" },
    { value: "Achatscheibe", label: "Achatscheibe" }

  ];

  // Kategorie-Beschreibungen
  const categoryDescriptions = {
      "Bergkristall": "Der Bergkristall ist zweifellos der vielseitigste Kristall in jeder Sammlung und gleichzeitig der erste Kristall, den ich Einsteigern empfehlen würde.Bergkristall gilt als Meister der Heilsteine. Er fördert Klarheit und Ordnung in Gedanken und Gefühlen, stärkt deine Intuition. Zudem bringt Körper, Seele und Geist in Einklang. ",
      "Rosenquarz": "Der Rosenquarz ist der Stein der bedingsungslosen Liebe. Er fördert die Selbstliebe und die Bereitschaft, Liebe zu empfangen und zu geben. Rosenquarz eignet sich hervorragend zur Selbstheilung bei Trennung oder Verlust eines geliebten Menschen.",
      "Amethyst": "Als Stein der spirituellen Erkenntnis öffnet der Amethyst das dritte Auge und das Kronenchakra. Er lindert Stress, Ängste und Albträume. Der Amethyst wirkt beruhigend auf die Seele und fördert innere Ruhe. Ebenfalls gilt er als Schutzstein gegen negative Energie.",
      "Citrin": "Der Citrin strahlt so energievoll wie die Sonne. Als Stein des Reichtums, schenkt er dir Wohlstand und Fülle auf allen Ebenen des Seins. Er stärkt das Selbstbewusstsein und fördert deine Lebensfreude. Ein leuchtender Begleiter für alle, die Fülle nicht nur wünschen, sondern leben möchten.",
      "Orangencalcit": "Der Orangencalcit bringt durch seine Energie Wärme ins Herz, hebt die Stimmung an und öffnet den Weg zu mehr Leichtigkeit und innerem Frieden. Er unterstützt dich dabei, neue Energie zu schöpfen und mit Optimismus durchs Leben zu gehen.",
      "Karneol": "Feuer der Lebenskraft, der Karneol entfacht unser inneres Feuer. Er steht für Mut und Tapferkeit.Der Karneol stärkt unser Selbstvertrauen und hilft Zweifel und Ängste zu überwinden, bringt Stabilität in unser Leben und fördert die Leidenschaft auf allen Ebenen. Spirituell hilft er, im Hier und Jetzt anzukommen.",
      "Mondstein": "Spiegel der Seele - Der Mondstein ist ein Begleiter der Intuition, der Weiblickeit und des inneren Gleichgewichts. Er wirkt als Schutzstein für Frauen und Kinder Ebefalls hilft er bei Entscheidungen und fördert das rationale Denken.",
      "Selenit": "Der Selenit wirkt wie ein energetisches Schutzschild gegen negative Energien. Da er selber keine Energie aufnimmt ist er perfekt um andere Heilsteine zu reinigen. Darüber hinaus fördert er deine Intuition und geistige Klarheit.Der Selenit hilft, loszulassen - nicht aus Schwäche, sondern aus Vertrauen.",
      "Aquamarin": "Stein der Manifestation - Aquamarin zieht deine Wünsche an. Wie klares Wasser spült er alte Ängste fort und macht Platz für Wahheit, Mut und innere Stärke. Aquamarin fördert ehrliche Kommunikation , nicht nur mit anderen, sondern vorallem mir dir selbst.",
      "Regenbogenfluorit": "Regenbogenfluorit vereint die Energien mehrerer Farbfrequenzen und bringt Ordnung in Seele, Geist und Herz. Er fördert die Selbstreflexion, innere Stärke und unterstützt bei seelischer Heilung.Durch seine vielseitige Energie gleicht er Stimmungsschwankungen aus und wirkt harmonisierend.",
      "Grüner Fluorit": "Grüner Fluorit wirkt ausgleichend und stabilisierend auf deine Energie, hilft deinen Geist zu fokussieren und emotionale Blockaden zu lösen. Mit seiner kraftvollen Energie öffnet er das Herzchakra und befreit es von altem Ballast. Ein Kristall für tiefe Regeneration und geistige Frische. Er wird oft als Lernhilfe verwendet.",
      "Aventurin": "Der Aventurin steht für Optimismus und Lebensfreude, stärkt bedingungslose Liebe und Mitgefühl. Er wirkt beruhigend auf unsere Seele, löst Ängste und innere Unruhe. Aventurin schenkt Vertrauen in sich selbst und ermutigt, das Leben mit Offenheit und Freude zu getsalten.Seine sanfte Energie bringt Harmonie in unser Gefühlsleben.",
      "Malachit": "Kristall des Herzens und der Heilung. Seine Energie fördert nicht nur tiefgreifende Veränderungen, sondern auch seelischen Wachstum. Der Malachit bringt unterdrückte Gefühle an die Oberfläche, fördert innere Heilung und unterstützt dabei, alte Verletzungen zu verarbeiten. Er schenkt Mut und öffnet das Herz für Liebe und Mitgeffühl.",
      "Jaspis Rot / Algen Jaspis": " Der Jaspis ist ein toller Begeliter für alle , die in ihrer inneren Mitte ankommen möchte.Mit seiner kraftvollen Energie schenkt der Jaspis dir Durchsetzungsvermögen und Ausdauer.Besonders in Zeiten von Stress und Überförderung wirkt er erdend. Ein verlässlicher Stein, um seelisch wieder ins Gleichgewicht zu finden.",
      "Labradorit": "Ein Kristall der Transformation, der dich sanft durch Veränderungen trägt. Labradorit ist ein kraftvoller Schutzstein, der das spirituelle Bewusstsein unterstützt. Er stärkt das Bauchgefühl und fördert das Erkennen von Zeichen, Träumen und tiefen Zusammenhängen. Ob seelischer Wandel, spirituelle Entwicklung oder große Lebensveränderung - Labradorit untertsützt dich dabei.",
      "Rauchquarz": "Der Rauchquarz hilft dabei, negative Energien abzubauen, wirkt gleichzeitig erdend und ausgleichend auf unsere Seele. Er hat die Fähigkeit negative Energie, in Positive umzuwandeln. Zudem vermittelt er dir Sicherheit und Stärke.",
      "Pyrit": "Pyrit - der Glückskristall, er zieht Fülle, Wohlstand und positive Lebensenergie an. Er stärkt das Selbstvertrauen und öffnet den Blick für neue Chancen. Als Glückskristall bergleitet er dich auf deinem Weg mit innerer Stärke und Optimismus.",
      "Tigerauge": "Tigerauge verleiht Mut und Schutz. Es stärkt die Willenskraft und hilft bei der Verwirklichung von Zielen.",
      "Schwarzer Turmalin": "Schwarzer Turmalin ist ein kraftvoller Schutzstein. Er absorbiert negative Energien und schützt vor elektromagnetischen Feldern.",
      "Achatscheibe": "Achatscheiben bringen Balance und Harmonie. Sie stabilisieren die Aura und fördern inneren Frieden."
  };

  const filteredProducts = products
    .filter(product => filter === "all" || product.category === filter)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  // Aktuelle Kategorie-Info
  const selectedCategory = categories.find(cat => cat.value === filter);
  const categoryDescription = filter !== "all" ? categoryDescriptions[filter as keyof typeof categoryDescriptions] : null;

  return (
    <div className="min-h-screen bg-gradient-mystical">
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
              Kristall Sammlung
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Entdecke eine große Auswahl an Kristallen, die ich persönlich zusammengetragen habe.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-border/50">
            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground mb-2">
                Kategorie
              </label>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground mb-2">
                Sortiert nach
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Preis: Niedrig bis Hoch</SelectItem>
                  <SelectItem value="price-high">Preis: Hoch bis Niedrig</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/*category description conditional rendered */}
          {categoryDescription && (
            <div className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm p-6 rounded-lg border border-border/50">
              <h2 className="font-serif text-2xl font-medium text-foreground mb-3">
                {selectedCategory?.label}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {categoryDescription}
              </p>
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Keine Produkte in dieser Kategorie gefunden.</p>
              <Button
                onClick={() => setFilter("all")}
                variant="outline"
                className="mt-4"
              >
                Alle Produkte anzeigen
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Collections;