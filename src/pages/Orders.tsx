import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Package, 
  Calendar, 
  MapPin, 
  Euro, 
  ShoppingBag, 
  Loader2,
  Eye,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  Product: {
    id: number;
    name: string;
    imageUrl: string;
  };
}

interface Order {
  id: number;
  totalAmount: number;
  status: 'Bestellung erhalten' | 'In Bearbeitung' | 'Versendet' | 'Zugestellt';
  paymentIntentId: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
  OrderItems: OrderItem[];
}

const Orders = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    fetchOrders();
  }, [isAuthenticated, navigate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await apiClient.orders.getAll();
      
      if (response.status === 'success' && response.data) {
        // Handle the nested structure: response.data.orders
        const responseData = response.data as any;
        const ordersData = responseData.orders || response.data;
        setOrders(ordersData as Order[]);
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to fetch orders",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };


  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600">Loading your orders...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Meine Bestellungen</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">Du hast noch keine Bestellungen.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>Bestellung #{order.id}</CardTitle>
                <Badge variant="secondary">{order.status}</Badge>
              </CardHeader>

              <CardContent>
                <div className="text-sm text-gray-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>

                <div className="text-sm text-gray-700 mb-2">
                  <Euro className="inline w-4 h-4 mr-1" />
                  Gesamtbetrag: {order.totalAmount} €
                </div>

                <div className="text-sm text-gray-700 mb-4">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  {order.shippingAddress.street}, {order.shippingAddress.zipCode} {order.shippingAddress.city}, {order.shippingAddress.country}
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  {order.OrderItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="font-medium">{item.Product.name}</div>
                        <div className="text-sm text-gray-600">
                          Menge: {item.quantity}
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        {item.price} €
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  </div>


    </>
  );
};

export default Orders; 