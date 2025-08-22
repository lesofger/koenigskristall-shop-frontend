import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthService } from '@/lib/auth';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  updatedAt: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = () => {
      const currentUser = AuthService.getCurrentUser();
      const hasToken = AuthService.isAuthenticated();

      if (currentUser && hasToken) {
        setUser(currentUser);
        setIsAuthenticated(true);
      } else {
        // Clear any stale data
        AuthService.clearAuth();
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await AuthService.login({ email, password });
      
      if (response.status === 'success' && response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true, message: 'Anmeldung erfolgreich' };
      } else {
        return { success: false, message: response.message || 'Anmeldung fehlgeschlagen' };
      }
    } catch (error) {
      return { success: false, message: 'Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.' };
    }
  };

  const register = async (data: { email: string; password: string; firstName: string; lastName: string }) => {
    try {
      const response = await AuthService.register(data);
      
      if (response.status === 'success' && response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true, message: 'Registrierung erfolgreich' };
      } else {
        return { success: false, message: response.message || 'Registrierung fehlgeschlagen' };
      }
    } catch (error) {
      return { success: false, message: 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.' };
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const response = await AuthService.refreshToken();
      return response.status === 'success';
    } catch (error) {
      console.error('Token refresh failed:', error);
      // If refresh fails, logout the user
      await logout();
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 