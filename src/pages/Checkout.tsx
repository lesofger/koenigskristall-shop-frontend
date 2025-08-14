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
import { Loader2, ArrowLeft, CreditCard, Shield, User, Mail, Plus, Minus, Trash2, ShoppingBag, Building2, MapPin} from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { api, type ShippingAddress } from '@/lib/api';
import BankTransferPayment from '@/components/BankTransferPayment';
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
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank_transfer' | 'paypal'>('card');
  const [bankTransferClientSecret, setBankTransferClientSecret] = useState<string>('');
  const [paypalOrder, setPaypalOrder] = useState<any>(null);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const SHIPPING_COST = 5.00; // shipping price 
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
      return;
    }

    // Create payment intent based on selected payment method
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
          setError(response.message || 'Failed to create payment intent');
        }
      } catch (error) {
        console.error('Payment intent creation error:', error);
        setError('Failed to create payment intent');
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [isAuthenticated, items, navigate, paymentMethod]);

  const handlePaymentSuccess = () => {
    clearCart();
    toast({
      title: "Payment Successful!",
      description: "Your order has been placed successfully.",
    });
    
    navigate('/payment-success', { replace: true });
  };

  const handlePaymentError = (error: string) => {
    toast({
      title: "Payment Failed",
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Preparing your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={() => navigate('/shop')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                zurück zum Shop
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/shop')}
            className="mb-3 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            zurück zum Shop
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Bestellung abschließen</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Account Information */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-xl">
                  <User className="mr-2 h-6 w-6 text-blue-600" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {user?.firstName && user?.lastName 
                      ? `${user.firstName} ${user.lastName}`
                      : user?.firstName || user?.lastName || 'User'
                    }
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{user?.email}</span>
                </div>
                <Badge variant="secondary" className="w-fit text-xs">
                  Authentifiziert
                </Badge>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-xl">
                  <MapPin className="mr-2 h-6 w-6 text-blue-600" />
                  Lieferadresse
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="street" className="flex items-center">
                      Straße <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="street"
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, street: e.target.value }))}
                      placeholder="Straße"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="flex items-center">
                      Stadt <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="city"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="Stadt"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="flex items-center">
                      Bundesland 
                    </Label>
                    <Input
                      id="state"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, state: e.target.value }))}
                      placeholder="Bundesland"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode" className="flex items-center">
                      Postleitzahl <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="zipCode"
                      value={shippingAddress.zipCode}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                      placeholder="Postleitzahl"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" className="flex items-center">
                      Land <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="country"
                      value={shippingAddress.country}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, country: e.target.value }))}
                      placeholder="Land"
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  <span className="text-red-500">*</span> Pflichtfelder
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Selection */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-xl">
                  <CreditCard className="mr-2 h-6 w-6 text-blue-600" />
                  Bezahlmethode
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant={paymentMethod === 'card' ? 'default' : 'outline'}
                    onClick={() => handlePaymentMethodChange('card')}
                    className="h-12"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Kreditkarte
                  </Button>
                  <Button
                    variant={paymentMethod === 'bank_transfer' ? 'default' : 'outline'}
                    onClick={() => handlePaymentMethodChange('bank_transfer')}
                    className="h-12"
                  >
                    <Building2 className="mr-2 h-4 w-4" />
                    Banküberweisung
                  </Button>
                  <Button
                    variant={paymentMethod === 'paypal' ? 'default' : 'outline'}
                    onClick={() => handlePaymentMethodChange('paypal')}
                    className="h-12"
                  >
                    <svg
                      className="mr-2 h-4 w-4 text-gray-500"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M374.7 139.5C383.1 98.9 353.6 64 308.1 64H152.1c-10.7 0-19.8 7.8-21.5 18.4L80.1 417.6c-1.6 9.6 5.9 18.4 15.5 18.4h81.1l13.7-86.1 3.1-20.2c1.7-10.6 10.8-18.4 21.5-18.4h42.3c75.1 0 135.9-49.8 147.3-121.8 2.9-18.2 1.5-35.6-4.9-50.9z" />
                      <path d="M445.4 175.3c-7.5-9.4-17.9-16.2-29.6-19.6-5.4-1.6-11-2.7-16.7-3.2 1.8 12.3 1.4 25.4-.6 38.5-9.3 58.2-53.2 95-112.1 95H234.1c-5.4 0-10.1 3.9-10.9 9.2l-16.7 105.1-.9 5.7c-1.1 6.7 4.1 12.8 10.9 12.8h59.3c9.9 0 18.4-7.2 19.9-17l.3-1.6 8.2-52.3.5-2.9c1.5-9.5 9.7-16.4 19.3-16.4h12.1c54.7 0 97.6-38.1 106.9-91.5 3.8-22.3 1-41.6-11.9-57.3z" />
                    </svg>
                    PayPal
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-xl">
                  {paymentMethod === 'card' ? (
                    <CreditCard className="mr-2 h-6 w-6 text-blue-600" />
                  ) : paymentMethod === 'bank_transfer' ? (
                    <Building2 className="mr-2 h-6 w-6 text-green-600" />
                  ) : (
                    <svg
                      className="mr-2 h-6 w-6 text-blue-600"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M374.7 139.5C383.1 98.9 353.6 64 308.1 64H152.1c-10.7 0-19.8 7.8-21.5 18.4L80.1 417.6c-1.6 9.6 5.9 18.4 15.5 18.4h81.1l13.7-86.1 3.1-20.2c1.7-10.6 10.8-18.4 21.5-18.4h42.3c75.1 0 135.9-49.8 147.3-121.8 2.9-18.2 1.5-35.6-4.9-50.9z" />
                      <path d="M445.4 175.3c-7.5-9.4-17.9-16.2-29.6-19.6-5.4-1.6-11-2.7-16.7-3.2 1.8 12.3 1.4 25.4-.6 38.5-9.3 58.2-53.2 95-112.1 95H234.1c-5.4 0-10.1 3.9-10.9 9.2l-16.7 105.1-.9 5.7c-1.1 6.7 4.1 12.8 10.9 12.8h59.3c9.9 0 18.4-7.2 19.9-17l.3-1.6 8.2-52.3.5-2.9c1.5-9.5 9.7-16.4 19.3-16.4h12.1c54.7 0 97.6-38.1 106.9-91.5 3.8-22.3 1-41.6-11.9-57.3z" />
                    </svg>
                  )}
                  {paymentMethod === 'card' ? 'Card Payment' : paymentMethod === 'bank_transfer' ? 'Bank Transfer Payment' : 'PayPal Payment'}
                </CardTitle>
              </CardHeader>
              <CardContent>
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
                
                {paymentMethod === 'bank_transfer' && bankTransferClientSecret && (
                  <BankTransferPayment
                    clientSecret={bankTransferClientSecret}
                    amount={getTotalPrice()}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                    shippingAddress={shippingAddress}
                    user={user!}
                  />
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
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center text-xs text-blue-700">
                    <Shield className="mr-2 h-3 w-3" />
                    <span>Your payment is secure and encrypted with industry-standard protection</span>
                  </div>
                </div>
                
              </CardContent>
            </Card>
          </div>

          {/* Right Section: Order Summary */}
          <div>
            <Card>
              <CardHeader className="pb-3 mb-2">
                <CardTitle className="flex items-center text-xl">
                  <ShoppingBag className="mr-2 h-6 w-6 text-blue-600" />
                  Bestellübersicht
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="border rounded-lg p-3 bg-white">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
                        <p className="text-xs text-gray-500">{item.description}</p>
                        <p className="text-base font-semibold text-blue-600 mt-1">
                          €{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="h-7 w-7 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="h-7 w-7 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      €{item.price.toFixed(2)} each
                    </div>
                  </div>
                ))}

                {/* Zwischensumme und Versandkosten */}
                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between items-center text-gray-700">
                    <span>Zwischensumme</span>
                    <span>€{getTotalPrice().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-gray-700">
                    <div className="flex items-center space-x-2">
                      <span>Versandkosten</span>
                      <span className="text-xs text-gray-500">(Standard)</span>
                    </div>
                    <span>€{SHIPPING_COST.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center text-2xl font-bold text-gray-900">
                      <span>Gesamtsumme</span>
                      <span className="text-blue-600">€{getTotalWithShipping().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-500 pt-2">
                  Deine Bestellung wird bearbeitet und du erhältst in Kürze eine Bestätigung.
                </p>
              </CardContent>
            </Card>

            {/* Crystal Benefits & Guarantees */}
            <Card className="mt-6">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 text-lg">✨</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">Echtheit der Kristalle</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        Jeder Kristall ist sorgfältig ausgewählt und auf Authentizität geprüft.
                        Unsere Experten für Edelsteine stellen sicher, dass Du echte, hochwertige Kristalle erhalten.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 text-lg">🌍</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">Nachhaltigkeit</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        Alle unsere Kristalle werden ethisch von verantwortungsbewussten Lieferanten bezogen.
                        Wir unterstützen nachhaltige Bergbaupraktiken und faire Handelsprinzipien.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 text-lg">🚚</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">Sicherer & schneller Versand</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        Deine Kristalle werden sorgfältig verpackt und mit Sendungsverfolgung versendet.
                        Bestellungen treffen in der Regel innerhalb von 3-5 Werktagen bei dir ein.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 