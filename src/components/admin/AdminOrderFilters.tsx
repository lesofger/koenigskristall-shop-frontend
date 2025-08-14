import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Filter } from 'lucide-react';

interface AdminOrderFiltersProps {
  filters: {
    status: string;
    startDate: string;
    endDate: string;
    page: number;
    limit: number;
  };
  statusOptions: Array<{ value: string; label: string }>;
  onFilterChange: (filters: any) => void;
  onResetFilters: () => void;
}

const AdminOrderFilters = ({
  filters,
  statusOptions,
  onFilterChange,
  onResetFilters
}: AdminOrderFiltersProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filter
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="status">Status</Label>
            <Select 
              value={filters.status} 
              onValueChange={(value) => onFilterChange({ ...filters, status: value, page: 1 })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status auswählen" />
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
          
          <div>
            <Label htmlFor="startDate">Startdatum</Label>
            <Input
              type="date"
              value={filters.startDate}
              onChange={(e) => onFilterChange({ ...filters, startDate: e.target.value, page: 1 })}
            />
          </div>
          
          <div>
            <Label htmlFor="endDate">Enddatum</Label>
            <Input
              type="date"
              value={filters.endDate}
              onChange={(e) => onFilterChange({ ...filters, endDate: e.target.value, page: 1 })}
            />
          </div>
          
          <div className="flex items-end">
            <Button
              onClick={onResetFilters}
              variant="outline"
              className="w-full"
            >
              Filter zurücksetzen
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminOrderFilters; 