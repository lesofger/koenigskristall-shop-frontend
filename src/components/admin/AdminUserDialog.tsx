import { useState, useEffect } from 'react';
import { User, CreateUserRequest, UpdateUserRequest } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

interface AdminUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateUserRequest | UpdateUserRequest) => Promise<void>;
  user?: User | null;
  isLoading: boolean;
}

export const AdminUserDialog = ({ 
  isOpen, 
  onClose, 
  onSave, 
  user, 
  isLoading 
}: AdminUserDialogProps) => {
  const [formData, setFormData] = useState<CreateUserRequest>({
    email: '',
    firstName: '',
    lastName: '',
    role: 'customer'
  });

  const isEditing = !!user;

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      });
    } else {
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        role: 'customer'
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      const updateData: UpdateUserRequest = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role
      };
      await onSave(updateData);
    } else {
      await onSave(formData);
    }
  };

  const handleInputChange = (field: keyof CreateUserRequest, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = () => {
    if (isEditing) {
      return formData.email && formData.firstName && formData.lastName;
    }
    return formData.email && formData.password && formData.firstName && formData.lastName;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Benutzer bearbeiten' : 'Neuen Benutzer erstellen'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Vorname *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Vorname eingeben"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Nachname *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Nachname eingeben"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">E-Mail *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="E-Mail-Adresse eingeben"
              required
            />
          </div>
          
          {!isEditing && (
            <div className="space-y-2">
              <Label htmlFor="password">Passwort *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Passwort eingeben"
                required
                minLength={6}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="role">Rolle</Label>
            <Select 
              value={formData.role} 
              onValueChange={(value: 'customer' | 'admin') => handleInputChange('role', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Rolle auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer">Kunde</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Abbrechen
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid() || isLoading}
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isEditing ? 'Aktualisieren' : 'Erstellen'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}; 