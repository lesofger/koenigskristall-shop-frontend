import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2,CreditCard, Landmark, Euro, AlertCircle, CheckCircle, Info} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

import { type ShippingAddress } from '@/lib/types';

interface BankTransferPaymentProps {
  clientSecret: string;
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
  shippingAddress: ShippingAddress;
  user: {
    firstName: string;
    lastName: string;
  };
}

interface BankTransferDetails {
  accountNumber: string;
  routingNumber: string;
  bankName: string;
  reference: string;
  amount: number;
  dueDate: string;
}

const BankTransferForm = ({ clientSecret, amount, onSuccess, onError, shippingAddress, user }: BankTransferPaymentProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'succeeded' | 'failed' | 'requires_action'>('pending');
  const [paymentIntent, setPaymentIntent] = useState<any>(null);
  const { toast } = useToast();
  const stripe = useStripe();
  const elements = useElements();

  // Mock bank transfer details - in a real implementation, these would come from Stripe
  const bankTransferDetails: BankTransferDetails = {
    accountNumber: 'DE89370400440532013000',
    routingNumber: 'COBADEFFXXX',
    bankName: 'Commerzbank AG',
    reference: `ORDER-${Date.now()}`,
    amount: amount,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('de-DE')
  };

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      toast({
        title: "Kopiert!",
        description: `${fieldName} in die Zwischenablage kopiert`,
      });
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      toast({
        title: "Kopieren fehlgeschlagen",
        description: "Bitte manuell kopieren",
        variant: "destructive",
      });
    }
  };

  const handleConfirmPayment = async () => {
    // Validate shipping address before payment
    const validateShippingAddress = (): boolean => {
      const { street, city, state, zipCode, country } = shippingAddress;
      return !!(street && city && state && zipCode && country);
    };

    if (!validateShippingAddress()) {
      onError('Bitte fülle alle Felder der Lieferadresse aus, bevor du fortfährst.');
      return;
    }

    if (!stripe || !elements) {
      onError('Stripe ist nicht geladen. Bitte lade die Seite neu.');
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('processing');
    
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
          shipping: {
            address: {
              line1: shippingAddress.street,
              city: shippingAddress.city,
              state: shippingAddress.state,
              postal_code: shippingAddress.zipCode,
              country: shippingAddress.country,
            },
            name: `${user.firstName} ${user.lastName}`,
          },
        },
        redirect: 'if_required',
      });

      if (error) {
        console.error('Payment error:', error);
        setPaymentStatus('failed');
        onError(error.message || 'Zahlung fehlgeschlagen');
      } else if (paymentIntent) {
        setPaymentIntent(paymentIntent);
        
        switch (paymentIntent.status) {
          case 'succeeded':
            setPaymentStatus('succeeded');
            onSuccess();
            break;
          case 'requires_action':
            setPaymentStatus('requires_action');
            // For Sofort, this means redirect to bank authentication
            toast({
              title: "Weiterleitung zur Bank",
              description: "Sie werden zur Authentifizierungsseite Ihrer Bank weitergeleitet.",
            });
            // The redirect will happen automatically
            break;
          case 'requires_payment_method':
            setPaymentStatus('failed');
            onError('Zahlungsmethode erforderlich. Bitte versuchen Sie es erneut.');
            break;
          case 'processing':
            setPaymentStatus('processing');
            toast({
              title: "Zahlung wird bearbeitet",
              description: "Ihre Zahlung wird bearbeitet. Dies kann einige Minuten dauern.",
            });
            break;
          default:
            setPaymentStatus('pending');
            toast({
              title: "Zahlung ausstehend",
              description: "Ihre Zahlung ist ausstehend. Bitte warten Sie auf die Bestätigung.",
            });
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('failed');
      onError('Zahlung fehlgeschlagen. Bitte versuchen Sie es erneut.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Check payment status periodically
  useEffect(() => {
    if (paymentStatus === 'pending' || paymentStatus === 'processing') {
      const interval = setInterval(async () => {
        if (!stripe) return;

        try {
          const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
          setPaymentIntent(paymentIntent);
          
          if (paymentIntent.status === 'succeeded') {
            setPaymentStatus('succeeded');
            onSuccess();
          } else if (paymentIntent.status === 'canceled') {
            setPaymentStatus('failed');
            onError('Payment was canceled.');
          } else if (paymentIntent.status === 'requires_action') {
            setPaymentStatus('requires_action');
          }
        } catch (error) {
          console.error('Error checking payment status:', error);
        }
      }, 5000); // Check every 5 seconds

      return () => clearInterval(interval);
    }
  }, [paymentStatus, stripe, clientSecret, onSuccess, onError]);

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'processing':
        return <Loader2 className="h-5 w-5 animate-spin text-blue-600" />;
      case 'succeeded':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'requires_action':
        return <Info className="h-5 w-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (paymentStatus) {
      case 'processing':
        return 'Zahlung wird verarbeitet...';
      case 'succeeded':
        return 'Zahlung erfolgreich!';
      case 'failed':
        return 'Zahlung fehlgeschlagen';
      case 'requires_action':
        return 'Zusätzliche Aktion erforderlich';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (paymentStatus) {
      case 'processing':
        return 'text-blue-600';
      case 'succeeded':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'requires_action':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Payment Status */}
        {paymentStatus !== 'pending' && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                {getStatusIcon()}
                <span className={`font-medium ${getStatusColor()}`}>{getStatusText()}</span>
              </div>
              {paymentIntent && (
                <div className="mt-2 text-sm text-gray-600">
                  Payment ID: {paymentIntent.id}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* German Payment Methods Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-xl">
              <Landmark className="mr-2 h-6 w-6 text-green-600" />
              SEPA Lastschrift
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-lg bg-green-50">
              <p className="text-sm text-green-700">
                Wir akzeptieren SEPA-Lastschrift als Zahlungsmethode.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stripe Payment Element for Bank Transfer */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-xl">
              <CreditCard className="mr-2 h-6 w-6 text-blue-600" />
              Zahlungsmethode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-lg bg-white">
              <PaymentElement 
                options={{
                  layout: 'tabs',
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Button 
          onClick={handleConfirmPayment}
          disabled={isProcessing || !stripe} 
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Zahlung wird verarbeitet...
            </>
          ) : (
            <>
              <Euro className="mr-2 h-4 w-4" />
              Banküberweisung jetzt bestätigen
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

const BankTransferPayment = ({ clientSecret, amount, onSuccess, onError, shippingAddress, user }: BankTransferPaymentProps) => {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <BankTransferForm
        clientSecret={clientSecret}
        amount={amount}
        onSuccess={onSuccess}
        onError={onError}
        shippingAddress={shippingAddress}
        user={user}
      />
    </Elements>
  );
};

export default BankTransferPayment; 