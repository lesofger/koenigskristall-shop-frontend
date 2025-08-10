import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Package } from 'lucide-react';
import { AdminOrder } from '@/lib/api';

interface AdminOrderDetailsDialogProps {
  order: AdminOrder | null;
  statusLabels: Record<string, string>;
  onClose: () => void;
}

const AdminOrderDetailsDialog = ({
  order,
  statusLabels,
  onClose
}: AdminOrderDetailsDialogProps) => {
  if (!order) return null;

  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Bestelldetails #{order.id}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Kundeninformationen</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Name:</strong> {order.User.firstName} {order.User.lastName}</p>
                <p><strong>Email:</strong> {order.User.email}</p>
                <p><strong>Kunden-ID:</strong> {order.User.id}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Bestellinformationen</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Status:</strong> {statusLabels[order.status]}</p>
                <p><strong>Gesamtbetrag:</strong> €{order.totalAmount.toFixed(2)}</p>
                <p><strong>Payment ID:</strong> {order.paymentIntentId}</p>
                <p><strong>Bestelldatum:</strong> {new Date(order.createdAt).toLocaleString('de-DE')}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Lieferadresse</h3>
            <div className="text-sm">
              {order.shippingAddress.street}<br />
              {order.shippingAddress.zipCode} {order.shippingAddress.city}<br />
              {order.shippingAddress.state}, {order.shippingAddress.country}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Bestellte Artikel</h3>
            <div className="space-y-2">
              {order.OrderItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-gray-500" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{item.product.name}</div>
                      <div className="text-sm text-gray-600">
                        Menge: {item.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {item.price.toFixed(2)} €
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {order.notes && (
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Notizen</h3>
              <p className="text-sm text-gray-600">{order.notes}</p>
            </div>
          )}
          
          {order.trackingNumber && (
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Tracking-Nummer</h3>
              <p className="text-sm text-gray-600">{order.trackingNumber}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminOrderDetailsDialog; 