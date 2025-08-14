import { config } from './config';
import { apiClient } from './apiClient';

// API Configuration
const API_BASE_URL = config.apiBaseUrl;

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
  ADMIN_ORDERS: {
    GET_ALL: `${API_BASE_URL}/api/admin/orders`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/api/admin/orders/${id}`,
    UPDATE_STATUS: (id: string) => `${API_BASE_URL}/api/admin/orders/${id}/status`,
    UPDATE: (id: string) => `${API_BASE_URL}/api/admin/orders/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/api/admin/orders/${id}`,
    BULK_UPDATE: `${API_BASE_URL}/api/admin/orders/bulk-update`,
    GET_STATISTICS: `${API_BASE_URL}/api/admin/orders/statistics`,
    EXPORT: `${API_BASE_URL}/api/admin/orders/export`,
  },
  ADMIN_USERS: {
    GET_ALL: `${API_BASE_URL}/api/admin/users`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/api/admin/users/${id}`,
    CREATE: `${API_BASE_URL}/api/admin/users`,
    UPDATE: (id: string) => `${API_BASE_URL}/api/admin/users/${id}`,
    UPDATE_PASSWORD: (id: string) => `${API_BASE_URL}/api/admin/users/${id}/password`,
    DELETE: (id: string) => `${API_BASE_URL}/api/admin/users/${id}`,
    GET_STATISTICS: `${API_BASE_URL}/api/admin/users/statistics`,
    EXPORT: `${API_BASE_URL}/api/admin/users/export`,
  },
} as const;

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

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered';

export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  Product: Product;
}

export interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}



export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  role?: 'customer' | 'admin';
}

export interface UpdateUserRequest {
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: 'customer' | 'admin';
}

export interface UserStatistics {
  totalUsers: number;
  customerCount: number;
  adminCount: number;
  recentUsers: number;
}

export interface AdminOrder extends Order {
  paymentIntentId: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  notes?: string;
  trackingNumber?: string;
  User: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
  OrderItems: OrderItem[];
}

export interface OrderStatistics {
  period: string;
  totalOrders: number;
  totalRevenue: number;
  ordersByStatus: Array<{
    status: OrderStatus;
    count: number;
  }>;
  dailyOrders: Array<{
    date: string;
    count: number;
    revenue: number;
  }>;
}

export interface BulkUpdateRequest {
  orderIds: number[];
  status: OrderStatus;
}

// API Client functions
export const api = {
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
      
      const response = await apiClient.get(url);
      return response.json();
    },

    getById: async (id: string): Promise<ApiResponse<Product>> => {
      const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.GET_BY_ID(id));
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
      
      const response = await apiClient.get(url);
      return response.json();
    },
  },

  // Payment APIs
  payments: {
    createPaymentIntent: async (data: CreatePaymentIntentRequest): Promise<ApiResponse<PaymentIntent>> => {
      const response = await apiClient.post(API_ENDPOINTS.PAYMENTS.CREATE_PAYMENT_INTENT, data);
      return response.json();
    },

    createPayPalOrder: async (data: CreatePaymentIntentRequest): Promise<ApiResponse<any>> => {
      const response = await apiClient.post(API_ENDPOINTS.PAYMENTS.CREATE_PAYPAL_ORDER, data);
      return response.json();
    },

    capturePayPalPayment: async (orderID: string, data?: { shippingAddress?: ShippingAddress; userName?: string }): Promise<ApiResponse<any>> => {
      const response = await apiClient.post(API_ENDPOINTS.PAYMENTS.CAPTURE_PAYPAL_PAYMENT, { 
        orderID,
        ...data 
      });
      return response.json();
    },

    getPayPalOrder: async (orderID: string): Promise<ApiResponse<any>> => {
      const response = await apiClient.get(API_ENDPOINTS.PAYMENTS.GET_PAYPAL_ORDER(orderID));
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
      
      const response = await apiClient.get(url);
      return response.json();
    },

    getById: async (id: string): Promise<ApiResponse<Order>> => {
      const response = await apiClient.get(API_ENDPOINTS.ORDERS.GET_BY_ID(id));
      return response.json();
    },

    create: async (data: { items: Array<{ productId: number; quantity: number; price: number }> }): Promise<ApiResponse<Order>> => {
      const response = await apiClient.post(API_ENDPOINTS.ORDERS.CREATE, data);
      return response.json();
    },

    updateStatus: async (id: string, status: 'pending' | 'delivered'): Promise<ApiResponse<Order>> => {
      const response = await apiClient.put(API_ENDPOINTS.ORDERS.UPDATE_STATUS(id), { status });
      return response.json();
    },
  },

  // Admin Order APIs
  adminOrders: {
    getAll: async (params?: {
      page?: number;
      limit?: number;
      status?: string;
      startDate?: string;
      endDate?: string;
    }): Promise<ApiResponse<{ orders: AdminOrder[]; pagination: PaginationInfo }>> => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.limit) searchParams.append('limit', params.limit.toString());
      if (params?.status) searchParams.append('status', params.status);
      if (params?.startDate) searchParams.append('startDate', params.startDate);
      if (params?.endDate) searchParams.append('endDate', params.endDate);

      const url = params ? `${API_ENDPOINTS.ADMIN_ORDERS.GET_ALL}?${searchParams.toString()}` : API_ENDPOINTS.ADMIN_ORDERS.GET_ALL;
      
      const response = await apiClient.get(url);
      return response.json();
    },

    getById: async (id: string): Promise<ApiResponse<{ order: AdminOrder }>> => {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN_ORDERS.GET_BY_ID(id));
      return response.json();
    },

    updateStatus: async (id: string, status: string): Promise<ApiResponse<{ order: AdminOrder }>> => {
      const response = await apiClient.put(API_ENDPOINTS.ADMIN_ORDERS.UPDATE_STATUS(id), { status });
      return response.json();
    },

    update: async (id: string, data: Partial<AdminOrder>): Promise<ApiResponse<{ order: AdminOrder }>> => {
      const response = await apiClient.put(API_ENDPOINTS.ADMIN_ORDERS.UPDATE(id), data);
      return response.json();
    },

    delete: async (id: string): Promise<ApiResponse<{ message: string }>> => {
      const response = await apiClient.delete(API_ENDPOINTS.ADMIN_ORDERS.DELETE(id));
      return response.json();
    },

    bulkUpdate: async (data: BulkUpdateRequest): Promise<ApiResponse<{ updatedCount: number; status: string; orderIds: number[] }>> => {
      const response = await apiClient.post(API_ENDPOINTS.ADMIN_ORDERS.BULK_UPDATE, data);
      return response.json();
    },

    getStatistics: async (params?: {
      startDate?: string;
      endDate?: string;
    }): Promise<ApiResponse<OrderStatistics>> => {
      const searchParams = new URLSearchParams();
      if (params?.startDate) searchParams.append('startDate', params.startDate);
      if (params?.endDate) searchParams.append('endDate', params.endDate);

      const url = params ? `${API_ENDPOINTS.ADMIN_ORDERS.GET_STATISTICS}?${searchParams.toString()}` : API_ENDPOINTS.ADMIN_ORDERS.GET_STATISTICS;
      
      const response = await apiClient.get(url);
      return response.json();
    },

    export: async (params?: {
      format?: string;
      status?: string;
      startDate?: string;
      endDate?: string;
    }): Promise<Blob> => {
      const searchParams = new URLSearchParams();
      if (params?.format) searchParams.append('format', params.format);
      if (params?.status) searchParams.append('status', params.status);
      if (params?.startDate) searchParams.append('startDate', params.startDate);
      if (params?.endDate) searchParams.append('endDate', params.endDate);

      const url = params ? `${API_ENDPOINTS.ADMIN_ORDERS.EXPORT}?${searchParams.toString()}` : API_ENDPOINTS.ADMIN_ORDERS.EXPORT;
      
      const response = await apiClient.get(url);
      return response.blob();
    },
  },

  // Admin User APIs
  adminUsers: {
    getAll: async (params?: {
      page?: number;
      limit?: number;
      search?: string;
      role?: string;
      sortBy?: string;
      sortOrder?: string;
    }): Promise<ApiResponse<{ users: User[]; pagination: PaginationInfo }>> => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.limit) searchParams.append('limit', params.limit.toString());
      if (params?.search) searchParams.append('search', params.search);
      if (params?.role) searchParams.append('role', params.role);
      if (params?.sortBy) searchParams.append('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.append('sortOrder', params.sortOrder);

      const url = params ? `${API_ENDPOINTS.ADMIN_USERS.GET_ALL}?${searchParams.toString()}` : API_ENDPOINTS.ADMIN_USERS.GET_ALL;
      
      const response = await apiClient.get(url);
      return response.json();
    },

    getById: async (id: string): Promise<ApiResponse<{ user: User }>> => {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN_USERS.GET_BY_ID(id));
      return response.json();
    },

    create: async (data: CreateUserRequest): Promise<ApiResponse<{ user: User }>> => {
      const response = await apiClient.post(API_ENDPOINTS.ADMIN_USERS.CREATE, data);
      return response.json();
    },

    update: async (id: string, data: UpdateUserRequest): Promise<ApiResponse<{ user: User }>> => {
      const response = await apiClient.put(API_ENDPOINTS.ADMIN_USERS.UPDATE(id), data);
      return response.json();
    },

    updatePassword: async (id: string, password: string): Promise<ApiResponse<{ message: string }>> => {
      const response = await apiClient.put(API_ENDPOINTS.ADMIN_USERS.UPDATE_PASSWORD(id), { password });
      return response.json();
    },

    delete: async (id: string): Promise<ApiResponse<{ message: string }>> => {
      const response = await apiClient.delete(API_ENDPOINTS.ADMIN_USERS.DELETE(id));
      return response.json();
    },

    getStatistics: async (): Promise<ApiResponse<UserStatistics>> => {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN_USERS.GET_STATISTICS);
      return response.json();
    },

    export: async (): Promise<Blob> => {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN_USERS.EXPORT);
      return response.blob();
    },
  },
}; 