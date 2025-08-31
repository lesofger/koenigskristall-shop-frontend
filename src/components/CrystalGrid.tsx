import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

const crystalCategories = [
  {
    name: "Rosenquarz",
    description: "Selbstliebe & Herzchakra",
    image: "https://api.koenigskristall.de/public/RosenRsGroß.jpg",
    color: "from-pink-100 to-rose-200",
  },
  {
    name: "Amethyst",
    description: "Spiritualität und Innere Ruhe",
    image: "https://api.koenigskristall.de/public/AmethDruGr.jpg",
    color: "from-purple-100 to-violet-200",
  },
  {
    name: "Bergkristall",
    description: "Klarheit und Verstärkung",
    image: "https://api.koenigskristall.de/public/BergkristallKett.jpg",
    color: "from-slate-50 to-gray-100",
  },
  {
    name: "Citrin",
    description: "Fülle und Wohlstand",
    image: "https://api.koenigskristall.de/public/CitrinTS.jpg",
    color: "from-yellow-100 to-amber-200",
  },
  {
    name: "Schwarzer Turmalin",
    description: "Schutz und Erdung",
    image: "https://api.koenigskristall.de/public/SchwarzArm.jpg",
    color: "from-gray-200 to-slate-300",
  },
  {
    name: "Selenit",
    description: "Reinigung und Intuition",
    image: "https://api.koenigskristall.de/public/SeleKugel.jpg",
    color: "from-white to-gray-50",
  },
  {
    name: "Labradorit",
    description: "Transformation & Entwicklung",
    image: "https://api.koenigskristall.de/public/LabraTS.jpg",
    color: "from-blue-100 to-indigo-200",
  },
  {
    name: "Grüner Aventurin",
    description: "Glück & Lebensfreude",
    image: "https://api.koenigskristall.de/public/AvenArm.jpg",
    color: "from-green-100 to-emerald-200",
  },
];

const CrystalGrid = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.8;
    let isAnimating = true;
    let isInteracting = false; 
    let isDragging = false;

    const animate = () => {
      if (!isAnimating || !scrollContainer || isInteracting) return;

      scrollPosition += scrollSpeed;
      const containerWidth = scrollContainer.scrollWidth / 2;
      
      if (scrollPosition >= containerWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    // Start the animation loop
    animationId = requestAnimationFrame(animate);

    // Desktop Mouse Events
    const handleMouseEnter = () => {
      isInteracting = true;
      scrollContainer.style.overflowX = 'auto';
      scrollContainer.style.cursor = 'grab';
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      isInteracting = false;
      isDragging = false;
      scrollContainer.style.overflowX = 'auto'; 
      scrollContainer.style.cursor = 'pointer';
      
      scrollPosition = scrollContainer.scrollLeft;
      animationId = requestAnimationFrame(animate);
    };

    const handleMouseDown = () => {
      if (isInteracting) {
        isDragging = true;
        scrollContainer.style.cursor = 'grabbing';
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      if (isInteracting) {
        scrollContainer.style.cursor = 'grab';
      }
    };

    // Touch Events für Mobile
    const handleTouchStart = (e: TouchEvent) => {
      isInteracting = true;
      isDragging = true;
      scrollContainer.style.overflowX = 'auto';
      cancelAnimationFrame(animationId);
    };

    const handleTouchEnd = () => {
      isDragging = false;
      isInteracting = false;
      scrollContainer.style.overflowX = 'auto'; 
      
      scrollPosition = scrollContainer.scrollLeft;
      animationId = requestAnimationFrame(animate);
    };

    // Desktop Events
    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    scrollContainer.addEventListener('mousedown', handleMouseDown);
    scrollContainer.addEventListener('mouseup', handleMouseUp);

    // Touch Events
    scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    scrollContainer.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      isAnimating = false;
      cancelAnimationFrame(animationId);
      
      if (scrollContainer) {
        // Desktop Events
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        scrollContainer.removeEventListener('mousedown', handleMouseDown);
        scrollContainer.removeEventListener('mouseup', handleMouseUp);
        
        // Touch Events
        scrollContainer.removeEventListener('touchstart', handleTouchStart);
        scrollContainer.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-crystal">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-primary md:text-5xl font-light text-foreground mb-6">
            Die Kraft der Kristalle
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Jeder Kristall hat seine ganz eigenen Fähigkeiten und Kräfte, um dich individuell auf deinem Weg zu unterstützen.
          </p>
        </div>

        {/* Infinite Auto-Scroll with Manual Control */}
        <div 
          ref={scrollRef}
          className="overflow-x-auto overflow-y-hidden cursor-pointer transition-all duration-300 touch-pan-x"
          style={{ 
            scrollbarWidth: 'thin',
            scrollbarColor: 'hsl(345 35% 75%) transparent',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-x'
          }}
        >
          <div className="inline-flex space-x-6" style={{ width: 'max-content' }}>
            {/* Erstelle doppelte Items für nahtloses Looping */}
            {[...crystalCategories, ...crystalCategories].map((crystal, index) => (
              <div key={`${crystal.name}-${index}`} className="flex-shrink-0 w-80">
                <Link 
                  to={`/shop`}
                  className="group block"
                  onClick={(e) => {
                    // Prevent navigation when dragging (desktop or mobile)
                    if (scrollRef.current && 
                        scrollRef.current.style.cursor === 'grabbing') {
                      e.preventDefault();
                    }
                  }}
                >
                  <Card className="overflow-hidden bg-card border-border/50 hover:shadow-hover transition-all duration-500 group-hover:scale-105 h-full select-none">
                    <CardContent className="p-0">
                      <div className="h-56 w-full relative overflow-hidden bg-transparent ">
                        <img
                          src={crystal.image}
                          alt={crystal.name}
                          className="absolute inset-0 w-full h-full object-cover object-[10%_60%]"
                        />
                        <div className="absolute inset-0 bg-background/10 group-hover:bg-background/5 transition-colors duration-500 pointer-events-none"></div>
                      </div>
                      <div className="p-6 text-center">
                        <h3 className="font-serif text-xl font-medium text-foreground mb-2">
                          {crystal.name}
                        </h3>
                        <p className="text-muted-foreground text-sm tracking-wide">
                          {crystal.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/shop">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-medium tracking-wide transition-colors shadow-crystal">
              Entdecke noch weitere Kristalle
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CrystalGrid;