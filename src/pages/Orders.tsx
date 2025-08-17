import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Package, 
  Calendar, 
  MapPin, 
  Euro, 
  ShoppingBag, 
  Loader2,
  Eye,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Edit
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
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [pagination, setPagination] = useState<any>(null);
  const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set());
  const [updatingStatus, setUpdatingStatus] = useState<Set<number>>(new Set());
  const itemsPerPage = 10; // Number of orders per page

  const statusOptions = [
    { value: "all", label: "Alle Bestellungen" },
    { value: "pending", label: "Ausstehend" },
    { value: "processing", label: "In Bearbeitung" },
    { value: "shipped", label: "Versendet" },
    { value: "delivered", label: "Zugestellt" },
  ];

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Ausstehend';
      case 'processing': return 'In Bearbeitung';
      case 'shipped': return 'Versendet';
      case 'delivered': return 'Zugestellt';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    fetchOrders();
  }, [isAuthenticated, navigate, currentPage, statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params: any = {
        page: currentPage,
        limit: itemsPerPage
      };
      
      // Only add status parameter if not "all"
      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }
      
      const response = await api.orders.getAll(params);
      
      if (response.status === 'success' && response.data) {
        const responseData = response.data as any;
        const ordersData = responseData.orders || response.data;
        setOrders(ordersData as Order[]);
        setPagination(responseData.pagination);
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

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle order expansion
  const toggleOrderExpansion = (orderId: number) => {
    const newExpandedOrders = new Set(expandedOrders);
    if (newExpandedOrders.has(orderId)) {
      newExpandedOrders.delete(orderId);
    } else {
      newExpandedOrders.add(orderId);
    }
    setExpandedOrders(newExpandedOrders);
  };

  const getNextStatus = (currentStatus: string) => {
    if (currentStatus === 'delivered') return 'pending';
    return 'delivered';
  };

  // Update order status
  const updateOrderStatus = async (orderId: number, currentStatus: string) => {
    try {
      setUpdatingStatus(prev => new Set(prev).add(orderId));
      
      // Client can mark any status as delivered, or toggle delivered back to pending
      const newStatus = getNextStatus(currentStatus);
      const response = await api.orders.updateStatus(orderId.toString(), newStatus);
      
      if (response.status === 'success' && response.data) {
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.id === orderId 
              ? { ...order, status: newStatus as any }
              : order
          )
        );
        
        toast({
          title: "Status aktualisiert",
          description: `Bestellung #${orderId} wurde auf "${getStatusLabel(newStatus)}" gesetzt.`,
          variant: "default",
        });
      } else {
        toast({
          title: "Fehler",
          description: response.message || "Status konnte nicht aktualisiert werden",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: "Fehler",
        description: "Status konnte nicht aktualisiert werden",
        variant: "destructive",
      });
    } finally {
      setUpdatingStatus(prev => {
        const newSet = new Set(prev);
        newSet.delete(orderId);
        return newSet;
      });
    }
  };

  // Use orders directly since filtering is now handled server-side
  const filteredOrders = orders;

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meine Bestellungen</h1>
            <p className="text-gray-600 mt-2">Verwalte und verfolge deine Bestellungen</p>
          </div>
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Keine Bestellungen gefunden</h3>
            <p className="text-gray-600 mb-4">
              {statusFilter === 'all' 
                ? 'Du hast noch keine Bestellungen getätigt.'
                : `Keine Bestellungen mit dem Status "${getStatusLabel(statusFilter)}" gefunden.`
              }
            </p>
            {statusFilter !== 'all' && (
              <Button
                onClick={() => setStatusFilter('all')}
                variant="outline"
              >
                Alle Bestellungen anzeigen
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const isExpanded = expandedOrders.has(order.id);
              return (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => toggleOrderExpansion(order.id)}
                  >
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                      <div className="flex items-center  gap-4">
                        <CardTitle className="text-lg">Bestellung #{order.id}</CardTitle>
                        <Badge 
                          className={getStatusColor(order.status)}
                        >
                          {getStatusLabel(order.status)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateOrderStatus(order.id, order.status);
                            }}
                            disabled={updatingStatus.has(order.id)}
                            className={`text-xs hover:bg-green-100`}
                          >
                            {updatingStatus.has(order.id) ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Edit className="h-3 w-3" />
                            )}
                            {order.status === 'delivered' ? 'Als ausstehend markieren' : 'Als zugestellt markieren'}
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

                    {/* Compact view - always visible */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Euro className="w-4 h-4" />
                        <span className="font-medium">{order.totalAmount.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <ShoppingBag className="w-4 h-4" />
                        <span>{order.OrderItems.length} Artikel</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">
                          {order.shippingAddress.city}, {order.shippingAddress.country}
                        </span>
                      </div>

                      <div className="flex items-center justify-end md:justify-start lg:justify-end gap-2 text-sm text-gray-500">
                          <Calendar className="inline w-4 h-4 mr-1" />
                          {new Date(order.createdAt).toLocaleDateString('de-DE', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                    </div>
                  </CardHeader>

                  {/* Expandable content */}
                  {isExpanded && (
                    <CardContent className="pt-0">
                      <Separator className="mb-4" />
                      
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Bestellte Artikel:</h4>
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
                                )
                                }
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{item.Product.name}</div>
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

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-600">
                          <strong>Lieferadresse:</strong><br />
                          {order.shippingAddress.street}<br />
                          {order.shippingAddress.zipCode} {order.shippingAddress.city}<br />
                          {order.shippingAddress.country}
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-8">
            <div className="flex justify-center items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Zurück
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  let pageNum;
                  if (pagination.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= pagination.totalPages - 2) {
                    pageNum = pagination.totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      className="w-10 h-10"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.totalPages}
              >
                Weiter
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Results Info */}
            <div className="text-center mt-4 text-sm text-gray-600">
              Zeige {((currentPage - 1) * itemsPerPage) + 1} bis {Math.min(currentPage * itemsPerPage, pagination.total)} von {pagination.total} Bestellungen
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders; 