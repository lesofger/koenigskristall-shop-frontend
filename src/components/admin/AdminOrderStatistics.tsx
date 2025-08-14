import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  ShoppingBag, 
  TrendingUp, 
  Euro, 
  Package, 
  BarChart3 
} from 'lucide-react';
import { OrderStatistics } from '@/lib/api';

interface AdminOrderStatisticsProps {
  statistics: OrderStatistics | null;
  statusLabels: Record<string, string>;
  showStatistics: boolean;
  onShowStatistics: (show: boolean) => void;
  startDate?: string;
  endDate?: string;
}

const AdminOrderStatistics = ({
  statistics,
  statusLabels,
  showStatistics,
  onShowStatistics,
  startDate,
  endDate
}: AdminOrderStatisticsProps) => {
  if (!statistics) return null;

  return (
    <>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gesamtbestellungen</p>
                <p className="text-2xl font-bold text-gray-900">{statistics.totalOrders}</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gesamtumsatz</p>
                <p className="text-2xl font-bold text-gray-900">€{statistics.totalRevenue.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Durchschnitt pro Bestellung</p>
                <p className="text-2xl font-bold text-gray-900">
                  €{(statistics.totalRevenue / statistics.totalOrders).toFixed(2)}
                </p>
              </div>
              <Euro className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aktive Bestellungen</p>
                <p className="text-2xl font-bold text-gray-900">
                  {statistics.ordersByStatus.find(s => s.status === 'processing')?.count || 0}
                </p>
              </div>
              <Package className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics Dialog */}
      <Dialog open={showStatistics} onOpenChange={onShowStatistics}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              Bestellstatistiken
              {startDate && endDate && (
                <span className="text-sm font-normal text-gray-600 block mt-1">
                  {new Date(startDate).toLocaleDateString('de-DE')} - {new Date(endDate).toLocaleDateString('de-DE')}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statistics.ordersByStatus.map((status) => (
                <Card key={status.status}>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">{status.count}</p>
                    <p className="text-sm text-gray-600">{statusLabels[status.status]}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-4">
                Tägliche Bestellungen
                {startDate && endDate && (
                  <span className="text-sm font-normal text-gray-600 ml-2">
                    ({new Date(startDate).toLocaleDateString('de-DE')} - {new Date(endDate).toLocaleDateString('de-DE')})
                  </span>
                )}
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {statistics.dailyOrders.map((day) => (
                  <div key={day.date} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{new Date(day.date).toLocaleDateString('de-DE')}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">{day.count} Bestellungen</span>
                      <span className="text-sm font-medium">€{day.revenue.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminOrderStatistics; 