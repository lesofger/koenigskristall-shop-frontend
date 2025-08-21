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

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "dem Warenkorb hinzugefügt",
      description: `${product.name} wurde dem Warenkorb hinzugefügt.`,
    });
  };

  return (
    <Card className="group overflow-hidden bg-gradient-card border-border/50 hover:shadow-hover transition-all duration-500 hover:scale-105">
      <CardContent className="p-0">
        <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative overflow-hidden">
          <div className="text-6xl transform group-hover:scale-110 transition-transform duration-500">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-background/10 group-hover:bg-background/5 transition-colors duration-500"></div>
        </div>
        
        <div className="p-6">
          <h3 className="font-serif text-xl font-medium text-foreground mb-2">
            {product.name}
          </h3>
          {/* {product.description} */}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              €{product.price}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-crystal"
          size="lg"
        >
          hinzufügen
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;