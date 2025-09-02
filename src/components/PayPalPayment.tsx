import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';
import { type ShippingAddress } from '@/lib/types';
import { config, isPayPalSandbox } from '@/lib/config';

interface PayPalPaymentProps {
  amount: number;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  paypalOrder: any; // Add this prop to receive the order from parent
  onSuccess: () => void;
  onError: (error: string) => void;
  shippingAddress: ShippingAddress;
  user: {
    firstName: string;
    lastName: string;
  };
}

declare global {
  interface Window {
    paypal: any;
  }
}

const PayPalPayment = ({ amount, items, paypalOrder, onSuccess, onError, shippingAddress, user }: PayPalPaymentProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'succeeded' | 'failed'>('pending');
  const buttonsCreatedRef = useRef(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load PayPal SDK
    const loadPayPal = () => {
      // Check if script is already being loaded
      const existingScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
      if (existingScript) {
        return;
      }

      const script = document.createElement('script');
      const paypalUrl = isPayPalSandbox
        ? `https://www.sandbox.paypal.com/sdk/js?client-id=${config.paypalClientId}&currency=EUR&intent=capture`
        : `https://www.paypal.com/sdk/js?client-id=${config.paypalClientId}&currency=EUR&intent=capture`;
      script.src = paypalUrl;
      script.async = true;
      script.onload = () => {
        setPaypalLoaded(true);
      };
      script.onerror = () => {
        onError('Failed to load PayPal SDK');
      };
      document.body.appendChild(script);
    };

    if (!window.paypal) {
      loadPayPal();
    } else {
      setPaypalLoaded(true);
    }

    return () => {
      // Cleanup if needed
    };
  }, []); // Remove onError from dependencies

  useEffect(() => {
    if (paypalOrder && buttonsCreatedRef.current) {
      buttonsCreatedRef.current = false;
    }
    
    if (paypalLoaded && window.paypal && paypalOrder && !buttonsCreatedRef.current) {
      const container = document.getElementById('paypal-button-container');
      if (!container) {
        return; // Component might be unmounting
      }
      container.innerHTML = '';

      window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'pay'
        },
        createOrder: (data: any, actions: any) => {
          // Validate shipping address before payment
          return new Promise((resolve, reject) => {
            const validateShippingAddress = (): boolean => {
              const { street, city, state, zipCode, country } = shippingAddress;
              return !!(street && city && state && zipCode && country);
            };
        
            if (!validateShippingAddress()) {
              onError('Bitte fülle alle Felder der Lieferadresse aus, bevor du fortfährst.');
              reject(new Error('Ungültige Lieferadresse'));
              return;
            }
        
            resolve(paypalOrder.orderId);
          });
        },
        onApprove: async (data: any, actions: any) => {
          setIsProcessing(true);
          setPaymentStatus('processing');
          
          try {
            const captureResponse = await api.payments.capturePayPalPayment(paypalOrder.orderId, {
              shippingAddress,
              userName: `${user.firstName} ${user.lastName}`
            });
              
            if (captureResponse.status === 'success') {
              setPaymentStatus('succeeded');
              toast({
                title: "Zahlung Erfolgreich!",
                description: "Deine PayPal-Zahlung wurde erfolgreich verarbeitet.",
              });
              onSuccess();
            } else {
              setPaymentStatus('failed');
              onError('Zahlungsabwicklung auf dem Server fehlgeschlagen');
            }
          } catch (error) {
            console.error('PayPal capture error:', error);
            setPaymentStatus('failed');
            onError('PayPal-Zahlung fehlgeschlagen. Bitte versuche es erneut.');
          } finally {
            setIsProcessing(false);
          }
        },
        onError: (err: any) => {
          console.error('PayPal error:', err);
          setPaymentStatus('failed');
          onError('PayPal-Zahlung fehlgeschlagen. Bitte versuche es erneut.');
        },
        onCancel: () => {
          setPaymentStatus('failed');
          toast({
            title: "Zahlung Abgebrochen",
            description: "Du hast die PayPal-Zahlung abgebrochen.",
            variant: "destructive",
          });
        }
      }).render('#paypal-button-container');
      
      buttonsCreatedRef.current = true;
    }

    // Cleanup function
    return () => {
      const container = document.getElementById('paypal-button-container');
      if (container) {
        container.innerHTML = '';
      }
      buttonsCreatedRef.current = false;
    };
  }, [paypalLoaded, paypalOrder, amount, items, onSuccess, onError, toast]);

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'processing':
        return <Loader2 className="h-5 w-5 animate-spin text-blue-600" />;
      case 'succeeded':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
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
            </CardContent>
          </Card>
        )}

        {/* PayPal Button Container */}
        <div className="space-y-4">
          {!paypalLoaded ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">PayPal wird geladen...</span>
            </div>
          ) : !paypalOrder ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Erstelle PayPal-Bestellung...</span>
            </div>
          ) : (
            <div id="paypal-button-container" className="w-full"></div>
          )}
        </div>

        {/* Processing State */}
        {isProcessing && (
          <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
            <Loader2 className="h-5 w-5 animate-spin text-blue-600 mr-2" />
            <span className="text-blue-600">Verarbeite PayPal-Zahlung...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayPalPayment; 