import { AuthService } from './auth';

// Create a custom fetch wrapper that handles token refresh
export const apiClient = {
  async fetch(url: string, options: RequestInit = {}) {
    // Add auth header if token exists
    const token = AuthService.getAccessToken();
    if (token) {
      options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, options);
      
      // If response is 401 (Unauthorized), try to refresh token
      if (response.status === 401) {
        const refreshResult = await AuthService.refreshToken();
        
        if (refreshResult.status === 'success') {
          // Retry the original request with new token
          const newToken = AuthService.getAccessToken();
          if (newToken) {
            options.headers = {
              ...options.headers,
              'Authorization': `Bearer ${newToken}`,
            };
            return fetch(url, options);
          }
        } else {
          // Refresh failed, redirect to login
          AuthService.clearAuth();
          window.location.href = '/signin';
          return response;
        }
      }
      
      return response;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  // Convenience methods
  async get(url: string, options: RequestInit = {}) {
    return this.fetch(url, { ...options, method: 'GET' });
  },

  async post(url: string, data?: any, options: RequestInit = {}) {
    return this.fetch(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  async put(url: string, data?: any, options: RequestInit = {}) {
    return this.fetch(url, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  async delete(url: string, options: RequestInit = {}) {
    return this.fetch(url, { ...options, method: 'DELETE' });
  },
}; 