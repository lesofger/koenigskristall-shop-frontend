import { useState } from 'react';
import { User } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Edit, 
  Trash2, 
  Key, 
  Mail, 
  User as UserIcon,
  Calendar,
  Check,
  X
} from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

interface AdminUserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
  onUpdatePassword: (userId: number) => void;
  isDeleting: boolean;
}

export const AdminUserCard = ({ 
  user, 
  onEdit, 
  onDelete, 
  onUpdatePassword, 
  isDeleting 
}: AdminUserCardProps) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const roleColors = {
    admin: 'bg-red-100 text-red-800',
    customer: 'bg-blue-100 text-blue-800'
  };

  const roleLabels = {
    admin: 'Administrator',
    customer: 'Kunde'
  };

  const handleDelete = () => {
    setShowConfirmDelete(false);
    onDelete(user.id);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">
                {user.firstName} {user.lastName}
              </CardTitle>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>
          <Badge className={roleColors[user.role]}>
            {roleLabels[user.role]}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Erstellt am:</span>
            <span className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(user.createdAt), 'dd.MM.yyyy', { locale: de })}</span>
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Aktualisiert am:</span>
            <span className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(user.updatedAt), 'dd.MM.yyyy', { locale: de })}</span>
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">User ID:</span>
            <span className="font-mono text-gray-800">#{user.id}</span>
          </div>
        </div>

        <div className="flex space-x-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(user)}
            className="flex-1"
          >
            <Edit className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdatePassword(user.id)}
            className="flex-1 flex items-center justify-center"
          >
            <Key className="w-4 h-4" />
          </Button>
          
          {showConfirmDelete ? (
            <div className="flex space-x-2 flex-1">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1"
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowConfirmDelete(false)}
                className="flex-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowConfirmDelete(true)}
              disabled={isDeleting}
              className="flex-1"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}; 