import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AdminOrderBulkActionsProps {
  selectedOrders: Set<number>;
  statusOptions: Array<{ value: string; label: string }>;
  showBulkUpdate: boolean;
  onShowBulkUpdate: (show: boolean) => void;
  onBulkUpdateStatus: (status: string) => void;
  onClearSelection: () => void;
}

const AdminOrderBulkActions = ({
  selectedOrders,
  statusOptions,
  showBulkUpdate,
  onShowBulkUpdate,
  onBulkUpdateStatus,
  onClearSelection
}: AdminOrderBulkActionsProps) => {
  if (selectedOrders.size === 0) return null;

  return (
    <>
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {selectedOrders.size} Bestellung(en) ausgewählt
              </span>
              <Button
                onClick={() => onShowBulkUpdate(true)}
                variant="outline"
                size="sm"
              >
                Status ändern
              </Button>
            </div>
            <Button
              onClick={onClearSelection}
              variant="ghost"
              size="sm"
            >
              Auswahl aufheben
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Update Dialog */}
      <Dialog open={showBulkUpdate} onOpenChange={onShowBulkUpdate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Status für {selectedOrders.size} Bestellung(en) ändern</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {statusOptions.slice(1).map((status) => (
                <Button
                  key={status.value}
                  variant="outline"
                  onClick={() => onBulkUpdateStatus(status.value)}
                  className="justify-start"
                >
                  {status.label}
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminOrderBulkActions; 