import { API_ENDPOINTS, getHeaders, type ApiResponse, type AuthResponse, type RefreshTokenResponse, type LogoutResponse } from './api';

// Authentication service
export class AuthService {
  // Register a new user
  static async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        // Store tokens in localStorage
        localStorage.setItem('accessToken', result.data.accessToken);
        localStorage.setItem('refreshToken', result.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(result.data.user));
      }

      return result;
    } catch (error) {
      console.error('Registration error:', error);
      return {
        status: 'error',
        message: 'Registration failed. Please try again.',
      };
    }
  }

  // Login user
  static async login(data: {
    email: string;
    password: string;
  }): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        // Store tokens in localStorage
        localStorage.setItem('accessToken', result.data.accessToken);
        localStorage.setItem('refreshToken', result.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(result.data.user));
      }

      return result;
    } catch (error) {
      console.error('Login error:', error);
      return {
        status: 'error',
        message: 'Login failed. Please try again.',
      };
    }
  }

  // Logout user
  static async logout(): Promise<ApiResponse<LogoutResponse>> {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
        method: 'POST',
        headers: getHeaders(true), // Include auth header
      });

      const result = await response.json();

      if (response.ok) {
        // Clear tokens from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      }

      return result;
    } catch (error) {
      console.error('Logout error:', error);
      // Even if the API call fails, clear local storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      return {
        status: 'success',
        message: 'Logged out successfully',
      };
    }
  }

  // Refresh access token
  static async refreshToken(): Promise<ApiResponse<RefreshTokenResponse>> {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        return {
          status: 'error',
          message: 'No refresh token available',
        };
      }

      const response = await fetch(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ refreshToken }),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        // Update tokens in localStorage
        localStorage.setItem('accessToken', result.data.accessToken);
        localStorage.setItem('refreshToken', result.data.refreshToken);
      }

      return result;
    } catch (error) {
      console.error('Token refresh error:', error);
      return {
        status: 'error',
        message: 'Token refresh failed',
      };
    }
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    return !!token;
  }

  // Get current user
  static getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Get access token
  static getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // Clear all auth data
  static clearAuth(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
} 