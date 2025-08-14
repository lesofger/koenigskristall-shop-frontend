import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';
import { type AdminOrder, type OrderStatistics } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ArrowLeft, Download, BarChart3, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  AdminOrderCard,
  AdminOrderFilters,
  AdminOrderStatistics,
  AdminOrderBulkActions,
  AdminOrderDetailsDialog,
  AdminOrderPagination
} from '@/components/admin';

const AdminOrders = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // State management
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<OrderStatistics | null>(null);
  const [pagination, setPagination] = useState<any>(null);
  const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set());
  const [updatingStatus, setUpdatingStatus] = useState<Set<number>>(new Set());
  const [selectedOrders, setSelectedOrders] = useState<Set<number>>(new Set());
  const [showStatistics, setShowStatistics] = useState(false);
  
  // Filters
  const [filters, setFilters] = useState({
    status: 'all',
    startDate: '',
    endDate: '',
    page: 1,
    limit: 10
  });

  const statusOptions = [
    { value: "all", label: "Alle Status" },
    { value: "pending", label: "Ausstehend" },
    { value: "processing", label: "In Bearbeitung" },
    { value: "shipped", label: "Versendet" },
    { value: "delivered", label: "Zugestellt" },
  ];

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
  };

  const statusLabels = {
    pending: 'Ausstehend',
    processing: 'In Bearbeitung',
    shipped: 'Versendet',
    delivered: 'Zugestellt',
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    fetchOrders();
    fetchStatistics();
  }, [isAuthenticated, navigate, filters]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params: any = {
        page: filters.page,
        limit: filters.limit
      };
      
      if (filters.status !== 'all') params.status = filters.status;
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;
      
      const response = await api.adminOrders.getAll(params);
      
      if (response.status === 'success' && response.data) {
        const responseData = response.data as any;
        setOrders(responseData.orders || []);
        setPagination(responseData.pagination);
      } else {
        toast({
          title: "Fehler",
          description: response.message || "Bestellungen konnten nicht geladen werden",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Fehler",
        description: "Bestellungen konnten nicht geladen werden",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const params: any = {};
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;
      
      const response = await api.adminOrders.getStatistics(params);
      if (response.status === 'success' && response.data) {
        setStatistics(response.data);
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const updateOrderStatus = async (orderId: number, status: string) => {
    try {
      setUpdatingStatus(prev => new Set(prev).add(orderId));
      
      const response = await api.adminOrders.updateStatus(orderId.toString(), status);
      
      if (response.status === 'success' && response.data) {
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.id === orderId 
              ? { ...order, status: status as any }
              : order
          )
        );
        
        toast({
          title: "Status aktualisiert",
          description: `Bestellung #${orderId} wurde auf "${statusLabels[status as keyof typeof statusLabels]}" gesetzt.`,
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

  const deleteOrder = async (orderId: number) => {
    if (!confirm('Sind Sie sicher, dass Sie diese Bestellung löschen möchten?')) return;

    try {
      const response = await api.adminOrders.delete(orderId.toString());
      
      if (response.status === 'success') {
        setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
        toast({
          title: "Bestellung gelöscht",
          description: "Bestellung wurde erfolgreich gelöscht",
          variant: "default",
        });
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      toast({
        title: "Fehler",
        description: "Bestellung konnte nicht gelöscht werden",
        variant: "destructive",
      });
    }
  };

  const exportOrders = async () => {
    try {
      const params: any = {};
      if (filters.status !== 'all') params.status = filters.status;
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;
      
      const blob = await api.adminOrders.export(params);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Export erfolgreich",
        description: "Bestellungen wurden exportiert",
        variant: "default",
      });
    } catch (error) {
      console.error('Error exporting orders:', error);
      toast({
        title: "Fehler",
        description: "Export fehlgeschlagen",
        variant: "destructive",
      });
    }
  };

  const toggleOrderExpansion = (orderId: number) => {
    const newExpandedOrders = new Set(expandedOrders);
    if (newExpandedOrders.has(orderId)) {
      newExpandedOrders.delete(orderId);
    } else {
      newExpandedOrders.add(orderId);
    }
    setExpandedOrders(newExpandedOrders);
  };

  const toggleOrderSelection = (orderId: number) => {
    const newSelectedOrders = new Set(selectedOrders);
    if (newSelectedOrders.has(orderId)) {
      newSelectedOrders.delete(orderId);
    } else {
      newSelectedOrders.add(orderId);
    }
    setSelectedOrders(newSelectedOrders);
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({ status: 'all', startDate: '', endDate: '', page: 1, limit: 20 });
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
              <p className="text-gray-600">Lade Bestellungen...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Admin - Bestellungen</h1>
            <p className="text-gray-600 mt-2">Verwalte alle Bestellungen im System</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setShowStatistics(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Statistiken
            </Button>
            <Button
              onClick={exportOrders}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <AdminOrderStatistics
          statistics={statistics}
          statusLabels={statusLabels}
          showStatistics={showStatistics}
          onShowStatistics={setShowStatistics}
          startDate={filters.startDate}
          endDate={filters.endDate}
        />

        {/* Filters */}
        <AdminOrderFilters
          filters={filters}
          statusOptions={statusOptions}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />

        {/* Orders List */}
        {orders.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Keine Bestellungen gefunden</h3>
              <p className="text-gray-600">Es wurden keine Bestellungen mit den aktuellen Filtern gefunden.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <AdminOrderCard
                key={order.id}
                order={order}
                isExpanded={expandedOrders.has(order.id)}
                isSelected={selectedOrders.has(order.id)}
                isUpdating={updatingStatus.has(order.id)}
                statusColors={statusColors}
                statusLabels={statusLabels}
                statusOptions={statusOptions}
                onToggleExpansion={toggleOrderExpansion}
                onToggleSelection={toggleOrderSelection}
                onUpdateStatus={updateOrderStatus}
                onDeleteOrder={deleteOrder}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <AdminOrderPagination
          pagination={pagination}
          currentPage={filters.page}
          onPageChange={handlePageChange}
        />
      </div>

    </div>
  );
};

export default AdminOrders; 