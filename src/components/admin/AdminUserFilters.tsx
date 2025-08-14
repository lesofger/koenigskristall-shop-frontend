import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, X } from 'lucide-react';

interface AdminUserFiltersProps {
  filters: {
    search: string;
    role: string;
    sortBy: string;
    sortOrder: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

export const AdminUserFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters 
}: AdminUserFiltersProps) => {
  const hasActiveFilters = filters.search || filters.role !== 'all' || filters.sortBy !== 'createdAt' || filters.sortOrder !== 'DESC';

  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filter & Suche</h3>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="text-gray-600 hover:text-gray-800"
          >
            <X className="w-4 h-4 mr-2" />
            Filter zurücksetzen
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Suche</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Name oder E-Mail..."
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Role Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Rolle</label>
          <Select value={filters.role} onValueChange={(value) => onFilterChange('role', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Alle Rollen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Rollen</SelectItem>
              <SelectItem value="customer">Kunde</SelectItem>
              <SelectItem value="admin">Administrator</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Sortieren nach</label>
          <Select value={filters.sortBy} onValueChange={(value) => onFilterChange('sortBy', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sortieren nach" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Erstellungsdatum</SelectItem>
              <SelectItem value="firstName">Vorname</SelectItem>
              <SelectItem value="lastName">Nachname</SelectItem>
              <SelectItem value="email">E-Mail</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort Order */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Reihenfolge</label>
          <Select value={filters.sortOrder} onValueChange={(value) => onFilterChange('sortOrder', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Reihenfolge" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DESC">Absteigend</SelectItem>
              <SelectItem value="ASC">Aufsteigend</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                <span>Suche: "{filters.search}"</span>
                <button
                  onClick={() => onFilterChange('search', '')}
                  className="ml-1 hover:text-blue-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {filters.role !== 'all' && (
              <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                <span>Rolle: {filters.role === 'admin' ? 'Administrator' : 'Kunde'}</span>
                <button
                  onClick={() => onFilterChange('role', 'all')}
                  className="ml-1 hover:text-green-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {filters.sortBy !== 'createdAt' && (
              <div className="flex items-center space-x-1 bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
                <span>Sortiert nach: {filters.sortBy}</span>
                <button
                  onClick={() => onFilterChange('sortBy', 'createdAt')}
                  className="ml-1 hover:text-purple-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 