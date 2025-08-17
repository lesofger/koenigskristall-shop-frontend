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