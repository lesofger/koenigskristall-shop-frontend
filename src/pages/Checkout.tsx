import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowLeft, CreditCard, Shield, User, Mail, Plus, Minus, Trash2, ShoppingBag, Building2} from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { apiClient } from '@/lib/api';
import BankTransferPayment from '@/components/BankTransferPayment';
import PayPalPayment from '@/components/PayPalPayment';

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
                // disableLink: true,
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
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank_transfer' | 'paypal'>('card');
  const [bankTransferClientSecret, setBankTransferClientSecret] = useState<string>('');
  const [paypalOrder, setPaypalOrder] = useState<any>(null);

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
          response = await apiClient.payments.createPaymentIntent({
            items: items.map(item => ({
              id: parseInt(item.id),
              quantity: item.quantity,
              price: item.price
            })),
            paymentMethod: 'bank_transfer'
          });
        } else if (paymentMethod === 'paypal') {
          response = await apiClient.payments.createPayPalOrder({
            items: items.map(item => ({
              id: parseInt(item.id),
              quantity: item.quantity,
              price: item.price
            }))
          });
        } else {
          response = await apiClient.payments.createPaymentIntent({
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
    console.log('Payment successful2===========>');
    clearCart();
    toast({
      title: "Payment Successful!",
      description: "Your order has been placed successfully.",
    });
    
    // Use navigate with replace to prevent going back to checkout
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
    setPaypalOrder(null); // Clear PayPal order data
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

            {/* Payment Method Selection */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-xl">
                  <CreditCard className="mr-2 h-6 w-6 text-blue-600" />
                  Payment Method
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
                    Credit Card
                  </Button>
                  <Button
                    variant={paymentMethod === 'bank_transfer' ? 'default' : 'outline'}
                    onClick={() => handlePaymentMethodChange('bank_transfer')}
                    className="h-12"
                  >
                    <Building2 className="mr-2 h-4 w-4" />
                    Bank Transfer
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
                    <CheckoutForm
                      clientSecret={clientSecret}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />
                  </Elements>
                )}
                
                {paymentMethod === 'bank_transfer' && bankTransferClientSecret && (
                  <BankTransferPayment
                    clientSecret={bankTransferClientSecret}
                    amount={getTotalPrice()}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                )}

                {paymentMethod === 'paypal' && paypalOrder && (
                  <PayPalPayment
                    amount={getTotalPrice()}
                    items={items}
                    paypalOrder={paypalOrder}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
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
                 <div className="flex justify-between items-center text-2xl font-bold text-gray-900 pt-4 pb-2">
                   <span>Order Total</span>
                   <span className="text-blue-600">€{getTotalPrice().toFixed(2)}</span>
                 </div>
                 
                 {/* Security Message */}
                 {/* <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200"> */}
                   {/* <div className="flex items-center text-xs text-green-700"> */}
                     {/* <Lock className="mr-2 h-4 w-4" /> */}
                     <p className=" text-sm text-gray-500">We prioritize your privacy and ensure every crystal is hand-selected and carefully packaged for you.</p>
                   {/* </div> */}
                 {/* </div> */}
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
                      <h3 className="font-medium text-gray-900 text-sm">Authentic Crystals</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        Each crystal is carefully selected and verified for authenticity. 
                        Our expert gemologists ensure you receive genuine, high-quality crystals.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
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
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
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
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
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