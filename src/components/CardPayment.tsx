import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, CreditCard } from 'lucide-react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { type ShippingAddress } from '@/lib/api';

interface CardPaymentProps {
  clientSecret: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  shippingAddress: ShippingAddress;
  user: {
    firstName: string;
    lastName: string;
  };
}

const CardPayment = ({ clientSecret, onSuccess, onError, shippingAddress, user }: CardPaymentProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  console.log('CardPayment rendered with clientSecret:', !!clientSecret);
  console.log('Stripe available:', !!stripe);
  console.log('Elements available:', !!elements);

  const validateShippingAddress = (): boolean => {
    const { street, city, state, zipCode, country } = shippingAddress;
    return !!(street && city && state && zipCode && country);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Validate shipping address before payment
    if (!validateShippingAddress()) {
      onError('Bitte füllen Sie alle Felder der Lieferadresse aus, bevor Sie fortfahren.');
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
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
      });

      if (error) {
        console.log('Payment error:', error);
        onError(error.message || 'Zahlung fehlgeschlagen');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log('Payment successful===========>', paymentIntent);
        onSuccess();
      } else {
        console.log('Payment intent status:', paymentIntent?.status);
        onError('Die Zahlung konnte nicht verarbeitet werden. Bitte versuchen Sie es erneut.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      onError('Zahlung fehlgeschlagen. Bitte versuchen Sie es erneut.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="card-element" className="text-sm font-medium">Karteninformationen</Label>
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
            Zahlung wird verarbeitet...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Jetzt bezahlen
          </>
        )}
      </Button>
    </form>
  );
};

export default CardPayment; 