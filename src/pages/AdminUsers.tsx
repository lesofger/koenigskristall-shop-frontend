import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { api, User, UserStatistics, CreateUserRequest, UpdateUserRequest } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ArrowLeft, Download, BarChart3, Users, Plus, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  AdminUserCard,
  AdminUserFilters,
  AdminUserStatistics,
  AdminUserDialog,
  AdminPasswordDialog
} from '@/components/admin';

const AdminUsers = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // State management
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<UserStatistics | null>(null);
  const [pagination, setPagination] = useState<any>(null);
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());
  const [showStatistics, setShowStatistics] = useState(false);
  
  // Dialog states
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [passwordUserId, setPasswordUserId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Filters
  const [filters, setFilters] = useState({
    search: '',
    role: 'all',
    sortBy: 'createdAt',
    sortOrder: 'DESC',
    page: 1,
    limit: 10
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    fetchUsers();
    fetchStatistics();
  }, [isAuthenticated, navigate, filters]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params: any = {
        page: filters.page,
        limit: filters.limit,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder
      };
      
      if (filters.search) params.search = filters.search;
      if (filters.role !== 'all') params.role = filters.role;
      
      const response = await api.adminUsers.getAll(params);
      
      if (response.status === 'success' && response.data) {
        const responseData = response.data as any;
        setUsers(responseData.users || []);
        setPagination(responseData.pagination);
      } else {
        toast({
          title: "Fehler",
          description: response.message || "Benutzer konnten nicht geladen werden",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Fehler",
        description: "Benutzer konnten nicht geladen werden",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await api.adminUsers.getStatistics();
      
      if (response.status === 'success' && response.data) {
        setStatistics(response.data);
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      role: 'all',
      sortBy: 'createdAt',
      sortOrder: 'DESC',
      page: 1,
      limit: 10
    });
  };

  const handleCreateUser = () => {
    setEditingUser(null);
    setShowUserDialog(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowUserDialog(true);
  };

  const handleUpdatePassword = (userId: number) => {
    setPasswordUserId(userId);
    setShowPasswordDialog(true);
  };

  const handleSaveUser = async (data: CreateUserRequest | UpdateUserRequest) => {
    try {
      setIsSaving(true);
      
      if (editingUser) {
        // Update existing user
        const response = await api.adminUsers.update(editingUser.id.toString(), data as UpdateUserRequest);
        
        if (response.status === 'success') {
          toast({
            title: "Erfolg",
            description: "Benutzer wurde erfolgreich aktualisiert",
          });
          setShowUserDialog(false);
          fetchUsers();
        } else {
          toast({
            title: "Fehler",
            description: response.message || "Benutzer konnte nicht aktualisiert werden",
            variant: "destructive",
          });
        }
      } else {
        // Create new user
        const response = await api.adminUsers.create(data as CreateUserRequest);
        
        if (response.status === 'success') {
          toast({
            title: "Erfolg",
            description: "Benutzer wurde erfolgreich erstellt",
          });
          setShowUserDialog(false);
          fetchUsers();
        } else {
          toast({
            title: "Fehler",
            description: response.message || "Benutzer konnte nicht erstellt werden",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error('Error saving user:', error);
      toast({
        title: "Fehler",
        description: "Ein Fehler ist aufgetreten",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdatePasswordSave = async (password: string) => {
    if (!passwordUserId) return;
    
    try {
      setIsSaving(true);
      const response = await api.adminUsers.updatePassword(passwordUserId.toString(), password);
      
      if (response.status === 'success') {
        toast({
          title: "Erfolg",
          description: "Passwort wurde erfolgreich aktualisiert",
        });
        setShowPasswordDialog(false);
      } else {
        toast({
          title: "Fehler",
          description: response.message || "Passwort konnte nicht aktualisiert werden",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error updating password:', error);
      toast({
        title: "Fehler",
        description: "Ein Fehler ist aufgetreten",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      setIsDeleting(true);
      const response = await api.adminUsers.delete(userId.toString());
      
      if (response.status === 'success') {
        toast({
          title: "Erfolg",
          description: "Benutzer wurde erfolgreich gelöscht",
        });
        fetchUsers();
      } else {
        toast({
          title: "Fehler",
          description: response.message || "Benutzer konnte nicht gelöscht werden",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Fehler",
        description: "Ein Fehler ist aufgetreten",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExportUsers = async () => {
    try {
      const blob = await api.adminUsers.export();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `users-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Erfolg",
        description: "Benutzer wurden erfolgreich exportiert",
      });
    } catch (error) {
      console.error('Error exporting users:', error);
      toast({
        title: "Fehler",
        description: "Export fehlgeschlagen",
        variant: "destructive",
      });
    }
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/admin/orders')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Zurück zu Bestellungen</span>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Benutzerverwaltung</h1>
                <p className="text-gray-600">Verwalten Sie alle Benutzer im System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowStatistics(!showStatistics)}
                className="flex items-center space-x-2"
              >
                <BarChart3 className="w-4 h-4" />
                <span>{showStatistics ? 'Statistiken ausblenden' : 'Statistiken anzeigen'}</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={handleExportUsers}
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Exportieren</span>
              </Button>
              
              <Button
                onClick={handleCreateUser}
                className="flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Neuer Benutzer</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        {showStatistics && statistics && (
          <div className="mb-8">
            <AdminUserStatistics statistics={statistics} />
          </div>
        )}

        {/* Filters */}
        <div className="mb-6">
          <AdminUserFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Users Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : users.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Keine Benutzer gefunden</h3>
              <p className="text-gray-600 text-center mb-4">
                {filters.search || filters.role !== 'all' 
                  ? 'Versuchen Sie andere Suchkriterien oder Filter.'
                  : 'Erstellen Sie den ersten Benutzer, um zu beginnen.'
                }
              </p>
              {!filters.search && filters.role === 'all' && (
                <Button onClick={handleCreateUser}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ersten Benutzer erstellen
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <AdminUserCard
                key={user.id}
                user={user}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                onUpdatePassword={handleUpdatePassword}
                isDeleting={isDeleting}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage <= 1}
              >
                Zurück
              </Button>
              
              <span className="text-sm text-gray-600">
                Seite {pagination.currentPage} von {pagination.totalPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage >= pagination.totalPages}
              >
                Weiter
              </Button>
            </div>
          </div>
        )}

        {/* Dialogs */}
        <AdminUserDialog
          isOpen={showUserDialog}
          onClose={() => setShowUserDialog(false)}
          onSave={handleSaveUser}
          user={editingUser}
          isLoading={isSaving}
        />

        <AdminPasswordDialog
          isOpen={showPasswordDialog}
          onClose={() => setShowPasswordDialog(false)}
          onSave={handleUpdatePasswordSave}
          userId={passwordUserId || 0}
          isLoading={isSaving}
        />
      </div>
    </div>
  );
};

export default AdminUsers; 