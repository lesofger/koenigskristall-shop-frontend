import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, Copy, Check, Building2, CreditCard, Calendar, Euro } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BankTransferPaymentProps {
  clientSecret: string;
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

interface BankTransferDetails {
  accountNumber: string;
  routingNumber: string;
  bankName: string;
  reference: string;
  amount: number;
  dueDate: string;
}

const BankTransferPayment = ({ clientSecret, amount, onSuccess, onError }: BankTransferPaymentProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { toast } = useToast();

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
        title: "Copied!",
        description: `${fieldName} copied to clipboard`,
      });
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please copy manually",
        variant: "destructive",
      });
    }
  };

  const handleConfirmPayment = async () => {4
    setIsProcessing(true);
    
    try {
      // In a real implementation, you would confirm the payment with Stripe
      // For now, we'll simulate a successful payment
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (error) {
      onError('Payment confirmation failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Bank Transfer Instructions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-xl">
              <Building2 className="mr-2 h-6 w-6 text-green-600" />
              Bank Transfer Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800 mb-3">
                Please transfer the amount to the following bank account. Your order will be processed once the payment is received.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Amount:</span>
                  <span className="text-lg font-bold text-green-600">€{amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Due Date:</span>
                  <span className="text-sm text-gray-600">{bankTransferDetails.dueDate}</span>
                </div>
              </div>
            </div>

            {/* Bank Account Details */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Bank Account Information</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Bank Name:</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{bankTransferDetails.bankName}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(bankTransferDetails.bankName, 'Bank Name')}
                      className="h-6 w-6 p-0"
                    >
                      {copiedField === 'Bank Name' ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">IBAN:</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 font-mono">{bankTransferDetails.accountNumber}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(bankTransferDetails.accountNumber, 'IBAN')}
                      className="h-6 w-6 p-0"
                    >
                      {copiedField === 'IBAN' ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">BIC/SWIFT:</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 font-mono">{bankTransferDetails.routingNumber}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(bankTransferDetails.routingNumber, 'BIC')}
                      className="h-6 w-6 p-0"
                    >
                      {copiedField === 'BIC' ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Reference:</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 font-mono">{bankTransferDetails.reference}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(bankTransferDetails.reference, 'Reference')}
                      className="h-6 w-6 p-0"
                    >
                      {copiedField === 'Reference' ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Important Notes */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h5 className="font-medium text-yellow-800 mb-2">Important Notes:</h5>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Please include the reference number in your transfer description</li>
                <li>• Payment must be received within 7 days</li>
                <li>• Your order will be processed once payment is confirmed</li>
                <li>• You will receive an email confirmation when payment is received</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Confirm Payment Button */}
        <Button 
          onClick={handleConfirmPayment}
          disabled={isProcessing} 
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Confirming Payment...
            </>
          ) : (
            <>
              <Euro className="mr-2 h-4 w-4" />
              Confirm Bank Transfer Payment
            </>
          )}
        </Button>

        {/* Security Message */}
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center text-xs text-blue-700">
            <CreditCard className="mr-2 h-3 w-3" />
            <span>Your payment information is secure. We use bank-level encryption for all transactions.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankTransferPayment; 