import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import BottomFooter from "@/components/BottomFooter";
import { api } from "@/lib/api";
import { type Product as ApiProduct, type PaginationInfo } from "@/lib/types";
import { Product as CartProduct } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

const Collections = () => {
  const [filter, setFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 12;

  const mapApiProductToCartProduct = (apiProduct: ApiProduct): CartProduct => {
    return {
      id: apiProduct.id.toString(),
      name: apiProduct.name,
      description: apiProduct.description,
      price: apiProduct.price,
      image: apiProduct.imageUrl,
      category: apiProduct.category
    };
  };

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
    { value: "Jaspis", label: "Algen Jaspis / Roter Jaspis" },
    { value: "Labradorit", label: "Labradorit" },
    { value: "Rauchquarz", label: "Rauchquarz" },
    { value: "Pyrit", label: "Pyrit" },
    { value: "Tigerauge", label: "Tigerauge" },
    { value: "Schwarzer Turmalin", label: "Schwarzer Turmalin" },
    { value: "Achatscheibe mit Bergkristall", label: "Achatscheibe mit Bergkristall" }
  ];

  // Kategorie-Beschreibungen
  const categoryDescriptions = {
      "Bergkristall": "Der Bergkristall ist zweifellos der vielseitigste Kristall in jeder Sammlung und gleichzeitig der erste Kristall, den ich Einsteigern empfehlen würde.Bergkristall gilt als Meister der Heilsteine. Er hilft verwurzelte Blockaden zu lösen, fördert Klarheit und Ordnung in Gedanken und Gefühlen. Außerdem bringt Körper, Seele und Geist in Einklang. Eine ganz besondere Eigenschaft ist, dass der Bergkristall die Energien aller anderen Kristalle verstärkt. ",
      "Rosenquarz": "Der Rosenquarz ist der Stein der bedingsungslosen Liebe. Er fördert die Selbstliebe und die Bereitschaft, Liebe zu empfangen und zu geben. Rosenquarz eignet sich hervorragend zur Selbstheilung bei Trennung oder Verlust eines geliebten Menschen.",
      "Amethyst": "Als Stein der spirituellen Erkenntnis öffnet der Amethyst das dritte Auge und das Kronenchakra. Er lindert Stress, Ängste und Albträume. Der Amethyst wirkt beruhigend auf die Seele und fördert innere Ruhe. Ebenfalls gilt er als Schutzstein gegen negative Energie.",
      "Citrin": "Der Citrin strahlt so energievoll wie die Sonne. Als Stein des Reichtums, schenkt er dir Wohlstand und Fülle auf allen Ebenen des Seins. Er stärkt das Selbstbewusstsein und fördert deine Lebensfreude. Ein leuchtender Begleiter für alle, die Fülle nicht nur wünschen, sondern leben möchten.",
      "Orangencalcit": "Der Orangencalcit bringt durch seine Energie Wärme ins Herz, hebt die Stimmung an und öffnet den Weg zu mehr Leichtigkeit und inneren Frieden. Er unterstützt dich dabei, neue Energie zu schöpfen und mit Optimismus durchs Leben zu gehen, was ihn zu einem nützlichen Begleiter beim Lernen macht.",
      "Karneol": "Feuer der Lebenskraft, der Karneol entfacht unser inneres Feuer. Er steht für Mut und Tapferkeit.Der Karneol stärkt unser Selbstvertrauen und hilft Zweifel und Ängste zu überwinden, bringt Stabilität in unser Leben und fördert die Leidenschaft auf allen Ebenen. Spirituell hilft er, im Hier und Jetzt anzukommen.",
      "Mondstein": "Spiegel der Seele - Der Mondstein ist ein Begleiter der Intuition, der Weiblickeit und des inneren Gleichgewichts. Er wirkt als Schutzstein für Frauen und Kinder. Ebenfalls hilft er die richtigen Entscheidungen zu treffen und fördert das rationale Denken.",
      "Selenit": "Der Selenit wirkt wie ein energetisches Schutzschild gegen negative Energien. Da er selber keine Energie aufnimmt ist er perfekt um andere Heilsteine zu reinigen. Darüber hinaus fördert er dein spirituelles Wachstum und geistige Klarheit.Der Selenit hilft, loszulassen - nicht aus Schwäche, sondern aus Vertrauen.",
      "Aquamarin": "Stein der Manifestation - Aquamarin zieht deine Wünsche an. Wie klares Wasser spült er alte Ängste fort und macht Platz für Wahrheit, Mut und innere Stärke. Aquamarin fördert ehrliche Kommunikation , nicht nur mit anderen, sondern vorallem mir dir selbst.",
      "Regenbogenfluorit": "Regenbogenfluorit vereint die Energien mehrerer Farbfrequenzen und bringt Ordnung in Seele, Geist und Herz. Er fördert die Selbstreflexion, innere Stärke und unterstützt bei seelischer Heilung.Durch seine vielseitige Energie gleicht er Stimmungsschwankungen aus und wirkt harmonisierend.",
      "Grüner Fluorit": "Grüner Fluorit wirkt ausgleichend und stabilisierend auf deine Energie, hilft deinen Geist zu fokussieren und emotionale Blockaden zu lösen. Daher eignet er sich gut für Energiearbeit. Mit seiner kraftvollen Energie öffnet er das Herzchakra und befreit es von altem Ballast. Ein Kristall für tiefe Regeneration und geistige Frische. Er wird oft als Lernhilfe verwendet.",
      "Aventurin": "Der Aventurin steht für Optimismus und Lebensfreude, stärkt bedingungslose Liebe und Mitgefühl. Er wirkt beruhigend auf unsere Seele, löst Ängste und innere Unruhe. Aventurin schenkt Vertrauen in sich selbst und ermutigt, das Leben mit Offenheit und Freude zu gestalten.Seine sanfte Energie bringt Harmonie in unser Gefühlsleben.",
      "Malachit": "Kristall des Herzens und der Heilung. Seine Energie fördert nicht nur tiefgreifende Veränderungen, sondern auch seelischen Wachstum. Der Malachit bringt unterdrückte Gefühle an die Oberfläche, fördert innere Heilung und unterstützt dabei, alte Verletzungen zu verarbeiten. Er schenkt Mut und öffnet das Herz für Liebe und Mitgefühl.",
      "Jaspis": " Der Jaspis ist ein toller Begeliter für alle , die in ihrer inneren Mitte ankommen möchten. Mit seiner kraftvollen Energie schenkt der Jaspis dir Durchsetzungsvermögen und Ausdauer. Besonders in Zeiten von Stress und Überförderung wirkt er erdend. Ein verlässlicher Stein, um seelisch wieder ins Gleichgewicht zu finden.",
      "Labradorit": "Ein Kristall der Transformation, der dich sanft durch Veränderungen trägt. Labradorit ist ein kraftvoller Schutzstein, der das spirituelle Bewusstsein stärkt. Er stärkt das Bauchgefühl und fördert das Erkennen von Zeichen, Träumen und tieferen Zusammenhängen. Ob seelischer Wandel, geistige Entwicklung oder große Lebensveränderung - Labradorit unterstützt dich dabei.",
      "Rauchquarz": "Der Rauchquarz hilft dabei, negative Energien abzubauen, wirkt gleichzeitig erdend und ausgleichend auf unsere Seele. Er hat die Fähigkeit negative Energie, in Positive umzuwandeln. Rauchquarz unterstützt bei der Transformation von alten Mustern und erleichtert den Umgang mit schwierigen Lebenssituationen Zudem vermittelt er dir Sicherheit und Stärke.",
      "Pyrit": "Pyrit - der Glückskristall, er zieht Fülle, Wohlstand und positive Lebensenergie an. Er stärkt das Selbstvertrauen und öffnet den Blick für neue Chancen. Der Pyrit erinnert uns daran, dass wahres Glück aus der Verbindung mit unserem inneren Licht entsteht. Als Glückskristall bergleitet er dich auf deinem Weg mit innerer Stärke und Optimismus.",
      "Tigerauge": "Kristall der Freiheit - Tigerauge steht für die innere Freiheit. Er schenkt dir Klarheit im Denken und Mut im Handeln, sodass du deinen eigenen Weg selbstbestimmt gehen kannst. Als schützender Begleiter hilft er dir, deiner inneren Wahrheit zu folgen - frei, stark und zentriert. ",
      "Schwarzer Turmalin": "Der mächtigste Schutzstein, ein kraftvoller Begleiter, wenn es darum geht, sich zu schützen. Schwarzer Turmalin leitet negative Energien ab und bietet dir seelischen Schutz. Er reinigt das energetische Feld und wirkt somit auch erdend. Ideal für Menschen , die viel spüren und sich schützen möchten.",
      "Achatscheibe mit Bergkristall": "Blauer Achat mit Bergkristall: Sanfte Ruhe trifft klares Licht, gemeinsam helfen sie, sich selbst mit Mitgefühl zu begegnen, die Gedanken zu ordnen und in harmonischer Verbindung mit sich selbst und dem Leben zu stehen. Pinker Achat mit Bergkristall : Gemeinsam helfen sie, das Herz zu öffnen, Vertrauen aufzubauen und inneren Frieden zu finden. Grüner Achat mit Bergkristall : Erdung und Licht - Gemeinsam fördern sie geistigen Wachstum und schenken dir Leichtigkeit, Erdverbundenheit und Klarheit." 
  };

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      
      if (filter === "all") {
        response = await api.products.getAll({
          page: currentPage,
          limit: itemsPerPage,
          sortBy: sortBy,
          sortOrder: sortOrder
        });
      } else {
        response = await api.products.getByCategory(filter, {
          page: currentPage,
          limit: itemsPerPage,
          sortBy: sortBy,
          sortOrder: sortOrder
        });
      }

      if (response.status === 'success' && response.data) {
        const cartProducts = response.data.products.map(mapApiProductToCartProduct);
        setProducts(cartProducts);
        setPagination(response.data.pagination);
      } else {
        setError(response.message || 'Produkte konnten nicht geladen werden.');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Produkte konnten nicht geladen werden. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when filters, sorting, or page changes
  useEffect(() => {
    fetchProducts();
  }, [filter, sortBy, sortOrder, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, sortBy, sortOrder]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle filter change
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  // Handle sort change
  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
  };

  // Aktuelle Kategorie-Info
  const selectedCategory = categories.find(cat => cat.value === filter);
  const categoryDescription = filter !== "all" ? categoryDescriptions[filter as keyof typeof categoryDescriptions] : null;

  return (
    <div className="min-h-screen bg-gradient-mystical">
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-primary text-4xl md:text-5xl font-light text-foreground mb-4">
              Kristallkollektion
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
              <Select value={filter} onValueChange={handleFilterChange}>
                <SelectTrigger>
                  <SelectValue placeholder="wähle Kategorie" />
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
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price">Preis</SelectItem>
                  </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground mb-2">
                Order
              </label>
              <Select value={sortOrder} onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Aufsteigend</SelectItem>
                  <SelectItem value="desc">Absteigend</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">{error}</p>
              <Button 
                onClick={fetchProducts} 
                variant="outline" 
                size="sm" 
                className="mt-2"
              >
                Erneut versuchen
              </Button>
            </div>
          )}

          {/* Category Description */}
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

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Produkte werden geladen...</span>
            </div>
          )}

          {/* Product Grid */}
          {!loading && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* No Products Message */}
              {products.length === 0 && !loading && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Keine Produkte in dieser Kategorie gefunden.</p>
                  <Button
                    onClick={() => handleFilterChange("all")}
                    variant="outline"
                    className="mt-4"
                  >
                    Alle Produkte anzeigen.
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Vorherige
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      let pageNum;
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= pagination.totalPages - 2) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(pageNum)}
                          className="w-10 h-10"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagination.totalPages}
                  >
                    Nächste
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Results Info */}
              {pagination && (
                <div className="text-center mt-4 text-sm text-muted-foreground">
                  Zeige{((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, pagination.total)} of {pagination.total} products
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <BottomFooter />
    </div>
  );
};

export default Collections;