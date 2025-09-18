import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Loader2, ArrowLeft, CreditCard, Shield, User, Mail, Plus, Minus, Trash2, ShoppingBag, Building2, MapPin, Check, Star, Banknote} from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { api } from '@/lib/api';
import { type ShippingAddress } from '@/lib/types';
import BankTransfer from '@/components/BankTransferPayment';
import PayPalPayment from '@/components/PayPalPayment';
import CardPayment from '@/components/CardPayment';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { items, getTotalPrice, clearCart, updateQuantity, removeItem } = useCart();
  const { toast } = useToast();
  const [clientSecret, setClientSecret] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank_transfer' | 'paypal'>('paypal'); // PayPal als Standard
  const [bankTransferClientSecret, setBankTransferClientSecret] = useState<string>('');
  const [paypalOrder, setPaypalOrder] = useState<any>(null);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const SHIPPING_COST = 4.49;
  const getTotalWithShipping = () => {
    return getTotalPrice() + SHIPPING_COST;
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    if (items.length === 0) {
      console.log('No items in cart===========>');
      navigate('/shop');
      return;
    }

    const createPaymentIntent = async () => {
      try {
        let response;
        
        if (paymentMethod === 'bank_transfer') {
          response = await api.payments.createPaymentIntent({
            items: items.map(item => ({
              id: parseInt(item.id),
              quantity: item.quantity,
              price: item.price
            })),
            paymentMethod: 'bank_transfer'
          });
        } else if (paymentMethod === 'paypal') {
          response = await api.payments.createPayPalOrder({
            items: items.map(item => ({
              id: parseInt(item.id),
              quantity: item.quantity,
              price: item.price
            }))
          });
        } else {
          response = await api.payments.createPaymentIntent({
            items: items.map(item => ({
              id: parseInt(item.id),
              quantity: item.quantity,
              price: item.price
            })),
            paymentMethod: 'card'
          });
        }

        if (response.status === 'success' && response.data) {
          if (paymentMethod === 'bank_transfer') {
            setBankTransferClientSecret(response.data.clientSecret);
          } else if (paymentMethod === 'paypal') {
            setPaypalOrder(response.data);
          } else {
            setClientSecret(response.data.clientSecret);
          }
        } else {
          setError(response.message || 'Zahlungsintent konnte nicht erstellt werden');
        }
      } catch (error) {
        console.error('Payment intent creation error:', error);
        setError('Zahlungsintent konnte nicht erstellt werden');
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [isAuthenticated, items, navigate, paymentMethod]);

  const handlePaymentSuccess = () => {
    clearCart();
    toast({
      title: "Zahlung erfolgreich!",
      description: "Deine Bestellung wurde erfolgreich aufgegeben.",
    });
    
    navigate('/payment-success', { replace: true });
  };

  const handlePaymentError = (error: string) => {
    toast({
      title: "Zahlung fehlgeschlagen",
      description: error,
      variant: "destructive",
    });
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handlePaymentMethodChange = (method: 'card' | 'bank_transfer' | 'paypal') => {
    if( method === paymentMethod) return;
    setPaymentMethod(method);
    setIsLoading(true);
    setError('');
    setClientSecret('');
    setBankTransferClientSecret('');
    setPaypalOrder(null);
  };

  if (!isAuthenticated) {
    return null;
  }

  if (items.length === 0) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-6 text-primary" />
          <p className="text-xl text-muted-foreground">Deine magische Bestellung wird vorbereitet...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-2xl border-0">
          <CardContent className="pt-6 text-center">
            <p className="text-red-600 mb-6 text-lg">{error}</p>
            <Button onClick={() => navigate('/shop')} className="bg-primary hover:bg-primary/90">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück zum Shop
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-8">
      <div className="max-w-2xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/shop')}
            className="mb-6 text-muted-foreground hover:text-primary group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Zurück zum Shop
          </Button>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-4">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">Bestellung abschließen</h1>
          <p className="text-xl text-muted-foreground">Nur noch wenige Schritte zu deinen magischen Kristallen</p>
        </div>

        {/* Account Information */}
        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-2xl text-primary">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                <User className="h-4 w-4 text-primary" />
              </div>
              Konto-Informationen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-primary/5 rounded-2xl p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-primary">
                    {user?.firstName && user?.lastName 
                      ? `${user.firstName} ${user.lastName}`
                      : user?.firstName || user?.lastName || 'Benutzer'
                    }
                  </p>
                  <p className="text-muted-foreground flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    {user?.email}
                  </p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <Check className="w-3 h-3 mr-1" />
                Verifiziert
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Lieferadresse */}
        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-2xl text-primary">
              <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center mr-3">
                <MapPin className="h-4 w-4 text-secondary" />
              </div>
              Lieferadresse
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label htmlFor="street" className="text-base font-medium flex items-center mb-2">
                  Straße & Hausnummer <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="street"
                  value={shippingAddress.street}
                  onChange={(e) => setShippingAddress(prev => ({ ...prev, street: e.target.value }))}
                  placeholder="z.B. Wasserkunststraße 123"
                  className="h-12 bg-white/80 border-primary/20 focus:border-primary text-lg"
                  required
                />
              </div>
              <div>
                <Label htmlFor="city" className="text-base font-medium flex items-center mb-2">
                  Stadt <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="city"
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="z.B. Magdeburg"
                  className="h-12 bg-white/80 border-primary/20 focus:border-primary text-lg"
                  required
                />
              </div>
              <div>
                <Label htmlFor="zipCode" className="text-base font-medium flex items-center mb-2">
                  Postleitzahl <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="zipCode"
                  value={shippingAddress.zipCode}
                  onChange={(e) => setShippingAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                  placeholder="z.B. 39108"
                  className="h-12 bg-white/80 border-primary/20 focus:border-primary text-lg"
                  required
                />
              </div>
              <div>
                <Label htmlFor="state" className="text-base font-medium mb-2 block">
                  Bundesland
                </Label>
                <Input
                  id="state"
                  value={shippingAddress.state}
                  onChange={(e) => setShippingAddress(prev => ({ ...prev, state: e.target.value }))}
                  placeholder="z.B. Sachsen-Anhalt"
                  className="h-12 bg-white/80 border-primary/20 focus:border-primary text-lg"
                />
              </div>
              <div>
                <Label htmlFor="country" className="text-base font-medium flex items-center mb-2">
                  Land <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="country"
                  value={shippingAddress.country}
                  onChange={(e) => setShippingAddress(prev => ({ ...prev, country: e.target.value }))}
                  placeholder="z.B. Deutschland"
                  className="h-12 bg-white/80 border-primary/20 focus:border-primary text-lg"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bestellübersicht */}
        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-2xl text-primary">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                <ShoppingBag className="h-4 w-4 text-primary" />
              </div>
              Bestellübersicht
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="bg-gradient-to-r from-white/80 to-white/60 rounded-xl p-4 border border-white/50">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary text-lg">{item.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                    </div>
                        <div className="ml-4 w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden border border-primary/20 bg-background flex items-center justify-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                    <div className="flex items-center space-x-1 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="h-8 w-8 p-0 rounded-full"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-bold text-primary">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0 rounded-full"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 p-0 rounded-full text-red-500 hover:text-red-700 ml-2"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">€{item.price.toFixed(2)} pro Stück</span>
                    <span className="text-xl font-bold text-secondary">€{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-primary/20 pt-6 space-y-4">
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-muted-foreground">Zwischensumme</span>
                  <span className="font-semibold">€{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <div className="flex items-center">
                    <span className="text-muted-foreground">Versand</span>
                    <Badge variant="secondary" className="ml-2 text-xs">Standard</Badge>
                  </div>
                  <span className="font-semibold">€{SHIPPING_COST.toFixed(2)}</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-4">
                <div className="flex justify-between items-center text-white">
                  <span className="text-xl font-bold">Gesamtsumme</span>
                  <span className="text-2xl font-bold">€{getTotalWithShipping().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bezahlmethode */}
        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-2xl text-primary">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                <CreditCard className="h-4 w-4 text-primary" />
              </div>
              Bezahlmethode wählen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {/* PayPal - Vorausgewählt */}
              <button
                onClick={() => handlePaymentMethodChange('paypal')}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                  paymentMethod === 'paypal' 
                    ? 'border-primary bg-primary/10 shadow-lg scale-105' 
                    : 'border-gray-200 bg-white/50 hover:border-primary/50 hover:shadow-md'
                }`}
              >
                {paymentMethod === 'paypal' && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-blue-600" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M374.7 139.5C383.1 98.9 353.6 64 308.1 64H152.1c-10.7 0-19.8 7.8-21.5 18.4L80.1 417.6c-1.6 9.6 5.9 18.4 15.5 18.4h81.1l13.7-86.1 3.1-20.2c1.7-10.6 10.8-18.4 21.5-18.4h42.3c75.1 0 135.9-49.8 147.3-121.8 2.9-18.2 1.5-35.6-4.9-50.9z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg">PayPal</h3>
                  <p className="text-sm text-muted-foreground">Schnell & sicher</p>
                  {paymentMethod === 'paypal' && (
                    <Badge className="mt-2 bg-primary/20 text-primary">Empfohlen</Badge>
                  )}
                </div>
              </button>
              {/* Kreditkarte */}
              <button
                onClick={() => handlePaymentMethodChange('card')}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                  paymentMethod === 'card' 
                    ? 'border-primary bg-primary/10 shadow-lg scale-105' 
                    : 'border-gray-200 bg-white/50 hover:border-primary/50 hover:shadow-md'
                }`}
              >
                {paymentMethod === 'card' && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <CreditCard className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Kreditkarte</h3>
                  <p className="text-sm text-muted-foreground">Visa, Mastercard</p>
                </div>
              </button>
              {/* Banküberweisung */}
              <button
                onClick={() => handlePaymentMethodChange('bank_transfer')}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                  paymentMethod === 'bank_transfer' 
                    ? 'border-primary bg-primary/10 shadow-lg scale-105' 
                    : 'border-gray-200 bg-white/50 hover:border-primary/50 hover:shadow-md'
                }`}
              >
                {paymentMethod === 'bank_transfer' && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                    <Banknote className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Banküberweisung</h3>
                  <p className="text-sm text-muted-foreground">Sofortige Zahlung</p>
                </div>
              </button>
            </div>
            {/* Payment Form */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6">
              {paymentMethod === 'card' && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CardPayment
                    clientSecret={clientSecret}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                    shippingAddress={shippingAddress}
                    user={user!}
                  />
                </Elements>
              )}
           
              {paymentMethod === 'paypal' && paypalOrder && (
                <PayPalPayment
                  amount={getTotalPrice()}
                  items={items}
                  paypalOrder={paypalOrder}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  shippingAddress={shippingAddress}
                  user={user!}
                />
              )}

              {paymentMethod === 'bank_transfer' && bankTransferClientSecret && (
                <BankTransfer
                  clientSecret={bankTransferClientSecret}
                  amount={getTotalPrice()}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  shippingAddress={shippingAddress}
                  user={user!}
                />
              )}  
            </div>
            {/* Security Notice */}
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200/50">
              <div className="flex items-center text-sm text-green-700">
                <Shield className="mr-2 h-4 w-4" />
                <span>Deine Zahlung ist durch modernste Verschlüsselung geschützt</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Garantien */}
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-0 shadow-xl">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">✨</span>
                </div>
                <div>
                  <h3 className="font-bold text-primary">100% Echte Kristalle</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Jeder Kristall wird von unseren Experten auf Authentizität geprüft
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">🌍</span>
                </div>
                <div>
                  <h3 className="font-bold text-primary">Nachhaltig & Ethisch</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Verantwortungsvoller Abbau und faire Handelspraktiken
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">🚚</span>
                </div>
                <div>
                  <h3 className="font-bold text-primary">Sicherer Versand</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Liebevoll verpackt mit Sendungsverfolgung in 3-5 Tagen
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;