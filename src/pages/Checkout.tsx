import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowLeft, CreditCard, Shield, User, Mail, Plus, Minus, Trash2, ShoppingBag, Lock } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { apiClient } from '@/lib/api';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface CheckoutFormProps {
  clientSecret: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const CheckoutForm = ({ clientSecret, onSuccess, onError }: CheckoutFormProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  console.log('CheckoutForm rendered with clientSecret:', !!clientSecret);
  console.log('Stripe available:', !!stripe);
  console.log('Elements available:', !!elements);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
        return_url: `${window.location.origin}/payment-success`,
      });

      if (error) {
        console.log('Payment error:', error);
        onError(error.message || 'Payment failed');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log('Payment successful===========>', paymentIntent);
        onSuccess();
      } else {
        console.log('Payment intent status:', paymentIntent?.status);
        onError('Payment processing failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      onError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="card-element" className="text-sm font-medium">Card Information</Label>
          <div className="mt-2 p-4 border rounded-lg bg-white">
            <CardElement
              id="card-element"
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#374151',
                    fontFamily: '"Inter", sans-serif',
                    '::placeholder': {
                      color: '#9CA3AF',
                    },
                  },
                  invalid: {
                    color: '#EF4444',
                  },
                },
                hidePostalCode: false,
              }}
            />
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={!stripe || isProcessing} 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Pay Now
          </>
        )}
      </Button>
    </form>
  );
};

const Checkout = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { items, getTotalPrice, clearCart, updateQuantity, removeItem } = useCart();
  const { toast } = useToast();
  const [clientSecret, setClientSecret] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

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

    // Create payment intent using centralized API client
    const createPaymentIntent = async () => {
      try {
        const response = await apiClient.payments.createPaymentIntent({
          items: items.map(item => ({
            id: parseInt(item.id),
            quantity: item.quantity,
            price: item.price
          }))
        });

        if (response.status === 'success' && response.data) {
          setClientSecret(response.data.clientSecret);
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
  }, [isAuthenticated, items, navigate]);

  const handlePaymentSuccess = () => {
    console.log('Payment successful2===========>');
    clearCart();
    toast({
      title: "Payment Successful!",
      description: "Your order has been placed successfully.",
    });
    // navigate('/payment-success', { replace: true });
    
    // Force navigation with a small delay to ensure toast is shown
    setTimeout(() => {
      try {
        navigate('/payment-success', { replace: true });
      } catch (navError) {
        console.error('Navigation error:', navError);
        // Fallback: use window.location if navigate fails
        window.location.href = '/payment-success';
      }
    }, 100);
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
                Back to Shop
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
            Back to Shop
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Section: Account Information and Payment Information */}
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
                  Authenticated
                </Badge>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-xl">
                  <CreditCard className="mr-2 h-6 w-6 text-blue-600" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                {clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm
                      clientSecret={clientSecret}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />
                  </Elements>
                )}
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center text-xs text-blue-700">
                    <Shield className="mr-2 h-3 w-3" />
                    <span>Your payment is secure and encrypted with Stripe</span>
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
                  Order Summary
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
                                 {/* <Separator /> */}
                 <div className="flex justify-between items-center text-2xl font-bold text-gray-900">
                   <span>Order Total</span>
                   <span className="text-blue-600">€{getTotalPrice().toFixed(2)}</span>
                 </div>
                 
                 {/* Security Message */}
                 <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                   <div className="flex items-center text-xs text-green-700">
                     <Lock className="mr-2 h-4 w-4" />
                     <span>100% secure checkout. Your information is always protected, and every crystal is chosen and packed with care.</span>
                   </div>
                 </div>
              </CardContent>
            </Card>

            {/* Crystal Benefits & Guarantees */}
            <Card className="mt-6">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 text-lg">✨</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">Authentic Crystals</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        Each crystal is carefully selected and verified for authenticity. 
                        Our expert gemologists ensure you receive genuine, high-quality crystals.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-lg">🛡️</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">100% Quality Guarantee</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        We guarantee the quality of every crystal. If you're not completely satisfied, 
                        we offer a 30-day return policy with full refund.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 text-lg">🌍</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">Ethically Sourced</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        All our crystals are ethically sourced from responsible suppliers. 
                        We support sustainable mining practices and fair trade principles.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 text-lg">🚚</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">Secure & Fast Shipping</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        Your crystals are carefully packaged and shipped with tracking. 
                        Orders typically arrive within 3-5 business days.
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