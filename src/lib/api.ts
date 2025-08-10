// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    REFRESH_TOKEN: `${API_BASE_URL}/api/auth/refresh-token`,
  },
  PRODUCTS: {
    GET_ALL: `${API_BASE_URL}/api/products`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/api/products/${id}`,
    GET_BY_CATEGORY: (category: string) => `${API_BASE_URL}/api/products/category/${category}`,
  },
      PAYMENTS: {
      CREATE_PAYMENT_INTENT: `${API_BASE_URL}/api/payments/create-payment-intent`,
      CREATE_PAYPAL_ORDER: `${API_BASE_URL}/api/payments/paypal/create-order`,
      CAPTURE_PAYPAL_PAYMENT: `${API_BASE_URL}/api/payments/paypal/capture`,
      GET_PAYPAL_ORDER: (orderID: string) => `${API_BASE_URL}/api/payments/paypal/order/${orderID}`,
    },
  ORDERS: {
    GET_ALL: `${API_BASE_URL}/api/orders`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/api/orders/${id}`,
    CREATE: `${API_BASE_URL}/api/orders`,
    UPDATE_STATUS: (id: string) => `${API_BASE_URL}/api/orders/${id}/status`,
  },
} as const;

// Common headers
export const getHeaders = (includeAuth = false) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      console.log('Auth header added:', `Bearer ${token.substring(0, 20)}...`);
    } else {
      console.warn('No access token found in localStorage');
    }
  }

  return headers;
};

// API response types
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}

export interface AuthResponse {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    updatedAt: string;
    createdAt: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LogoutResponse {
  message: string;
}

// Product types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductsResponse {
  products: Product[];
  pagination: PaginationInfo;
}

// Cart types
export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}

export interface Cart {
  cartId: number;
  items: CartItem[];
}

// Payment types
export interface PaymentIntent {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  paymentMethod?: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CreatePaymentIntentRequest {
  items: Array<{
    id: number;
    quantity: number;
    price: number;
  }>;
  shippingAddress?: ShippingAddress;
  paymentMethod?: 'card' | 'bank_transfer' | 'paypal';
}

export interface BankTransferDetails {
  accountNumber: string;
  routingNumber: string;
  bankName: string;
  reference: string;
  amount: number;
  dueDate: string;
}

// Order types
export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  product: Product;
}

export interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

// API Client functions
export const apiClient = {
  // Auth APIs
  auth: {
    register: async (data: { email: string; password: string; firstName: string; lastName: string }): Promise<ApiResponse<AuthResponse>> => {
      const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return response.json();
    },

    login: async (data: { email: string; password: string }): Promise<ApiResponse<AuthResponse>> => {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return response.json();
    },

    logout: async (): Promise<ApiResponse<LogoutResponse>> => {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
        method: 'POST',
        headers: getHeaders(true),
      });
      return response.json();
    },

    refreshToken: async (): Promise<ApiResponse<RefreshTokenResponse>> => {
      const response = await fetch(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
        method: 'POST',
        headers: getHeaders(),
      });
      return response.json();
    },
  },

  // Product APIs
  products: {
    getAll: async (params?: { 
      page?: number; 
      limit?: number; 
      category?: string; 
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
    }): Promise<ApiResponse<ProductsResponse>> => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.limit) searchParams.append('limit', params.limit.toString());
      if (params?.category) searchParams.append('category', params.category);
      if (params?.sortBy) searchParams.append('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.append('sortOrder', params.sortOrder);

      const url = params ? `${API_ENDPOINTS.PRODUCTS.GET_ALL}?${searchParams.toString()}` : API_ENDPOINTS.PRODUCTS.GET_ALL;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(),
      });
      return response.json();
    },

    getById: async (id: string): Promise<ApiResponse<Product>> => {
      const response = await fetch(API_ENDPOINTS.PRODUCTS.GET_BY_ID(id), {
        method: 'GET',
        headers: getHeaders(),
      });
      return response.json();
    },

    getByCategory: async (category: string, params?: { 
      page?: number; 
      limit?: number; 
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
    }): Promise<ApiResponse<ProductsResponse>> => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.limit) searchParams.append('limit', params.limit.toString());
      if (params?.sortBy) searchParams.append('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.append('sortOrder', params.sortOrder);

      const url = `${API_ENDPOINTS.PRODUCTS.GET_BY_CATEGORY(category)}?${searchParams.toString()}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(),
      });
      return response.json();
    },
  },

  // Payment APIs
  payments: {
    createPaymentIntent: async (data: CreatePaymentIntentRequest): Promise<ApiResponse<PaymentIntent>> => {
      const response = await fetch(API_ENDPOINTS.PAYMENTS.CREATE_PAYMENT_INTENT, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(data),
      });
      return response.json();
    },

    createPayPalOrder: async (data: CreatePaymentIntentRequest): Promise<ApiResponse<any>> => {
      const response = await fetch(API_ENDPOINTS.PAYMENTS.CREATE_PAYPAL_ORDER, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(data),
      });
      return response.json();
    },

    capturePayPalPayment: async (orderID: string, data?: { shippingAddress?: ShippingAddress; userName?: string }): Promise<ApiResponse<any>> => {
      const response = await fetch(API_ENDPOINTS.PAYMENTS.CAPTURE_PAYPAL_PAYMENT, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify({ 
          orderID,
          ...data 
        }),
      });
      return response.json();
    },

    getPayPalOrder: async (orderID: string): Promise<ApiResponse<any>> => {
      const response = await fetch(API_ENDPOINTS.PAYMENTS.GET_PAYPAL_ORDER(orderID), {
        method: 'GET',
        headers: getHeaders(true),
      });
      return response.json();
    },
  },

  // Order APIs
  orders: {
    getAll: async (params?: { 
      page?: number; 
      limit?: number; 
      status?: string;
    }): Promise<ApiResponse<{ orders: Order[]; pagination: PaginationInfo }>> => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.limit) searchParams.append('limit', params.limit.toString());
      if (params?.status) searchParams.append('status', params.status);

      const url = params ? `${API_ENDPOINTS.ORDERS.GET_ALL}?${searchParams.toString()}` : API_ENDPOINTS.ORDERS.GET_ALL;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(true),
      });
      return response.json();
    },

    getById: async (id: string): Promise<ApiResponse<Order>> => {
      const response = await fetch(API_ENDPOINTS.ORDERS.GET_BY_ID(id), {
        method: 'GET',
        headers: getHeaders(true),
      });
      return response.json();
    },

    create: async (data: { items: Array<{ productId: number; quantity: number; price: number }> }): Promise<ApiResponse<Order>> => {
      const response = await fetch(API_ENDPOINTS.ORDERS.CREATE, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(data),
      });
      return response.json();
    },

    updateStatus: async (id: string, status: 'pending' | 'delivered'): Promise<ApiResponse<Order>> => {
      const response = await fetch(API_ENDPOINTS.ORDERS.UPDATE_STATUS(id), {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify({ status }),
      });
      return response.json();
    },
  },
}; 