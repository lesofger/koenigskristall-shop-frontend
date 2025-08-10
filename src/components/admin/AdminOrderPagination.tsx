import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AdminOrderPaginationProps {
  pagination: any;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const AdminOrderPagination = ({
  pagination,
  currentPage,
  onPageChange
}: AdminOrderPaginationProps) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  return (
    <div className="mt-8">
      <div className="flex justify-center items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
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
                onClick={() => onPageChange(pageNum)}
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
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === pagination.totalPages}
        >
          Weiter
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-center mt-4 text-sm text-gray-600">
        Zeige {((currentPage - 1) * pagination.limit) + 1} bis {Math.min(currentPage * pagination.limit, pagination.total)} von {pagination.total} Bestellungen
      </div>
    </div>
  );
};

export default AdminOrderPagination; 