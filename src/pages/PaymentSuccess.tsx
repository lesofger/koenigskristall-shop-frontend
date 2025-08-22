import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Home, ShoppingBag, Package } from 'lucide-react';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any cart data from localStorage if needed
    // The cart should already be cleared in the checkout process
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Bezahlung erfolgreich!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-2">
            <p className="text-lg font-medium">Vielen Dank für dein Vertrauen !</p>
            <p className="text-muted-foreground"> Deine Bestellung wurde erfolgreich aufgegeben. Ich werde mich liebevoll um deine Kristalle kümmern und mich um alles Weitere kümmern.</p>
          </div>
          
          <div className="space-y-3">
            <Button 
              className="w-full" 
              onClick={() => navigate('/orders')}
            >
              <Package className="mr-2 h-4 w-4" />
              Meine Bestellungen ansehen
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/')}
            >
              <Home className="mr-2 h-4 w-4" />
              Startseite
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/shop')}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              schau dich weiter um
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess; 