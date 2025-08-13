import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Package, 
  Calendar, 
  MapPin, 
  ChevronDown,
  ChevronUp,
  Eye,
  Trash2,
  Loader2
} from 'lucide-react';
import { AdminOrder } from '@/lib/api';

interface AdminOrderCardProps {
  order: AdminOrder;
  isExpanded: boolean;
  isSelected: boolean;
  isUpdating: boolean;
  statusColors: Record<string, string>;
  statusLabels: Record<string, string>;
  statusOptions: Array<{ value: string; label: string }>;
  onToggleExpansion: (orderId: number) => void;
  onToggleSelection: (orderId: number) => void;
  onUpdateStatus: (orderId: number, status: string) => void;
  onDeleteOrder: (orderId: number) => void;
}

const AdminOrderCard = ({
  order,
  isExpanded,
  isSelected,
  isUpdating,
  statusColors,
  statusLabels,
  statusOptions,
  onToggleExpansion,
  onToggleSelection,
  onUpdateStatus,
  onDeleteOrder,
}: AdminOrderCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow space-y-4">
      <CardHeader 
        className="cursor-pointer space-y-8"
        onClick={() => onToggleExpansion(order.id)}
      >
        <div className="flex items-start flex-col sm:flex-row justify-between gap-4">
          <div className="flex justify-start sm:justify-between gap-4 items-start">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onToggleSelection(order.id)}
              onClick={(e) => e.stopPropagation()}
              className="my-auto"
            />
            <div>
              <CardTitle className="text-lg">Bestellung #{order.id}</CardTitle>
              <p className="text-sm text-gray-600">
                {order.User.firstName} {order.User.lastName} • {order.User.email}
              </p>
            </div>
            <Badge className={statusColors[order.status]}>
              {statusLabels[order.status]}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="font-medium">€{order.totalAmount.toFixed(2)}</p>
              <p className="text-sm text-gray-500">
                {order.OrderItems.length} Artikel
              </p>
            </div>
            
            <div className="flex items-center gap-1">
              <Select
                value={order.status}
                onValueChange={(status) => onUpdateStatus(order.id, status)}
                disabled={isUpdating}
              >
                <SelectTrigger className="w-32" onClick={(e) => e.stopPropagation()}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.slice(1).map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteOrder(order.id);
                }}
                className="text-red-600 hover:text-red-700"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="p-1 h-auto"
              >
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Compact view */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mt-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Calendar className="w-4 h-4" />
            <span>{new Date(order.createdAt).toLocaleDateString('de-DE')}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <MapPin className="w-4 h-4" />
            <span className="truncate">
              {order.shippingAddress.city}, {order.shippingAddress.country}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Package className="w-4 h-4" />
            <span>Payment ID: {order.paymentIntentId.slice(-8)}</span>
          </div>
        </div>
      </CardHeader>

      {/* Expandable content */}
      {isExpanded && (
        <CardContent className="pt-0">
          <Separator className="mb-4" />
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Bestellte Artikel:</h4>
              <div className="space-y-2">
                {order.OrderItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        {item.Product.imageUrl ? (
                          <img 
                            src={item.Product.imageUrl} 
                            alt={item.Product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                            <Package className="w-6 h-6 text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{item.Product.name} ({item.Product.id})</div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Lieferadresse:</h4>
                <div className="text-sm text-gray-600">
                  {order.shippingAddress.street}<br />
                  {order.shippingAddress.zipCode} {order.shippingAddress.city}<br />
                  {order.shippingAddress.state}, {order.shippingAddress.country}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Bestelldetails:</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Bestelldatum:</strong> {new Date(order.createdAt).toLocaleString('de-DE')}</p>
                  <p><strong>Letzte Aktualisierung:</strong> {new Date(order.updatedAt).toLocaleString('de-DE')}</p>
                  {order.trackingNumber && (
                    <p><strong>Tracking:</strong> {order.trackingNumber}</p>
                  )}
                  {order.notes && (
                    <p><strong>Notizen:</strong> {order.notes}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default AdminOrderCard; 