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
  CART: {
    GET: `${API_BASE_URL}/api/cart`,
    ADD_ITEM: `${API_BASE_URL}/api/cart/add`,
    UPDATE_ITEM: (cartItemId: string) => `${API_BASE_URL}/api/cart/${cartItemId}`,
    REMOVE_ITEM: (cartItemId: string) => `${API_BASE_URL}/api/cart/${cartItemId}`,
    CLEAR: `${API_BASE_URL}/api/cart`,
  },
  PAYMENTS: {
    CREATE_PAYMENT_INTENT: `${API_BASE_URL}/api/payments/create-payment-intent`,
    WEBHOOK: `${API_BASE_URL}/api/payments/webhook`,
  },
  ORDERS: {
    GET_ALL: `${API_BASE_URL}/api/orders`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/api/orders/${id}`,
    CREATE: `${API_BASE_URL}/api/orders`,
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

export interface CreatePaymentIntentRequest {
  items: Array<{
    id: number;
    quantity: number;
    price: number;
  }>;
  paymentMethod?: 'card' | 'bank_transfer';
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
    getAll: async (): Promise<ApiResponse<Product[]>> => {
      const response = await fetch(API_ENDPOINTS.PRODUCTS.GET_ALL, {
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

    getByCategory: async (category: string): Promise<ApiResponse<Product[]>> => {
      const response = await fetch(API_ENDPOINTS.PRODUCTS.GET_BY_CATEGORY(category), {
        method: 'GET',
        headers: getHeaders(),
      });
      return response.json();
    },
  },

  // Cart APIs
  cart: {
    get: async (): Promise<ApiResponse<Cart>> => {
      const response = await fetch(API_ENDPOINTS.CART.GET, {
        method: 'GET',
        headers: getHeaders(true),
      });
      return response.json();
    },

    addItem: async (data: { productId: number; quantity?: number }): Promise<ApiResponse<CartItem>> => {
      const response = await fetch(API_ENDPOINTS.CART.ADD_ITEM, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(data),
      });
      return response.json();
    },

    updateItem: async (cartItemId: string, data: { quantity: number }): Promise<ApiResponse<CartItem>> => {
      const response = await fetch(API_ENDPOINTS.CART.UPDATE_ITEM(cartItemId), {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(data),
      });
      return response.json();
    },

    removeItem: async (cartItemId: string): Promise<ApiResponse<{ message: string }>> => {
      const response = await fetch(API_ENDPOINTS.CART.REMOVE_ITEM(cartItemId), {
        method: 'DELETE',
        headers: getHeaders(true),
      });
      return response.json();
    },

    clear: async (): Promise<ApiResponse<{ message: string }>> => {
      const response = await fetch(API_ENDPOINTS.CART.CLEAR, {
        method: 'DELETE',
        headers: getHeaders(true),
      });
      return response.json();
    },
  },

  // Payment APIs
  payments: {
    testAuth: async (): Promise<ApiResponse<{ message: string; user: any }>> => {
      const response = await fetch(`${API_BASE_URL}/api/payments/test-auth`, {
        method: 'GET',
        headers: getHeaders(true),
      });
      return response.json();
    },

    createPaymentIntent: async (data: CreatePaymentIntentRequest): Promise<ApiResponse<PaymentIntent>> => {
      const response = await fetch(API_ENDPOINTS.PAYMENTS.CREATE_PAYMENT_INTENT, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(data),
      });
      return response.json();
    },
  },

  // Order APIs
  orders: {
    getAll: async (): Promise<ApiResponse<Order[]>> => {
      const response = await fetch(API_ENDPOINTS.ORDERS.GET_ALL, {
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
  },
}; 