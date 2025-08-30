import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product, useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCart((state) => state.addItem);
  const { toast } = useToast();

  // Modal State
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "In den Warenkorb hinzugefügt",
      description: `${product.name} wurde dem Warenkorb hinzugefügt.`,
    });
  };

  return (
    <>
      <Card
            className="rounded-none group overflow-hidden bg-gradient-card border-border/50 hover:shadow-hover transition-all duration-500 hover:scale-105 cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <CardContent className="p-0">
              <div className="h-60 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-background/10 group-hover:bg-background/5 transition-colors duration-500 pointer-events-none"></div>
              </div>
              <div className="p-6">
                <h3 className="font-sans text-xl font-medium text-foreground mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-foreground/70 mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    €{product.price}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-crystal flex items-center justify-center"
                size="lg"
              >
                In den Warenkorb
              </Button>
            </CardFooter>
          </Card>

      {/* Modal */}
  {showModal && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={() => setShowModal(false)}
    >
      <div
        className="bg-white shadow-2xl max-w-3xl w-full flex flex-col md:flex-row overflow-hidden relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Linke Seite: Großes Bild */}
        <div className="flex-1 flex items-center justify-center bg-background p-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto max-h-[400px] object-contain shadow-xl"
          />
        </div>
        {/* Rechte Seite: Infos */}
        <div className="flex-1 p-8 flex flex-col justify-center bg-white">
          <h2 className="font-sans text-3xl font-medium text-black mb-4">{product.name}</h2>
          <p className="text-sm text-black/70 mb-6">{product.description}</p>
          <p className="text-xs text-black/70 mb-6">Da es sich um ein Naturprodukt handelt, kann der Kristall in Form und Farbe variieren.</p>
          <p className="text-xl font-semibold text-black mb-6">Preis: €{product.price}</p>
          
          <Button
            className="bg-primary text-background px-6 py-3 rounded-lg font-medium shadow-crystal hover:bg-primary/90 transition"
            onClick={() => {
              handleAddToCart();
              setShowModal(false);
            }}
          >
            In den Warenkorb
          </Button>
        </div>
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 flex items-center justify-center w-10 h-10 rounded-full bg-black/10 hover:bg-primary/20 text-white hover:text-primary transition-colors duration-200 shadow-lg"
          onClick={() => setShowModal(false)}
          aria-label="Schließen"
        >
          <span className="text-2xl font-bold">&times;</span>
        </button>
      </div>
    </div>
  )}
    </>
  );
};

export default ProductCard;