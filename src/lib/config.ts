// ========================================
// Environment Configuration
// ========================================

export interface AppConfig {
  // API Configuration
  apiBaseUrl: string;
  
  // Payment Configuration
  stripePublishableKey: string;
  paypalClientId: string;
  
  // Application Configuration
  appName: string;
  appVersion: string;
  appEnv: 'development' | 'staging' | 'production';
  
  // Feature Flags
  enableAnalytics: boolean;
  enableDebugMode: boolean;
  enableMaintenanceMode: boolean;
  
  // Development Tools
  enableDevTools: boolean;
  useMockApi: boolean;
  enableBundleAnalyzer: boolean;
  
  // Performance
  enableServiceWorker: boolean;
  
  // External Services
  gaTrackingId?: string;
  sentryDsn?: string;
  
  // Security
  cspNonce?: string;
}

// Environment validation
const validateConfig = (config: Partial<AppConfig>): AppConfig => {
  const requiredFields = [
    'apiBaseUrl',
    'stripePublishableKey',
    'paypalClientId',
    'appName',
    'appVersion',
    'appEnv'
  ];

  for (const field of requiredFields) {
    if (!config[field as keyof AppConfig]) {
      throw new Error(`Missing required environment variable: VITE_${field.toUpperCase()}`);
    }
  }

  return config as AppConfig;
};

// Build configuration from environment variables
const buildConfig = (): AppConfig => {
  const config: Partial<AppConfig> = {
    // API Configuration
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    
    // Payment Configuration
    stripePublishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
    paypalClientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
    
    // Application Configuration
    appName: import.meta.env.VITE_APP_NAME || 'Königskristall Shop',
    appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
    appEnv: (import.meta.env.VITE_APP_ENV || import.meta.env.MODE) as 'development' | 'staging' | 'production',
    
    // Feature Flags
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    enableDebugMode: import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true',
    enableMaintenanceMode: import.meta.env.VITE_ENABLE_MAINTENANCE_MODE === 'true',
    
    // Development Tools
    enableDevTools: import.meta.env.VITE_ENABLE_DEVTOOLS === 'true',
    useMockApi: import.meta.env.VITE_USE_MOCK_API === 'true',
    enableBundleAnalyzer: import.meta.env.VITE_ENABLE_BUNDLE_ANALYZER === 'true',
    
    // Performance
    enableServiceWorker: import.meta.env.VITE_ENABLE_SERVICE_WORKER === 'true',
    
    // External Services
    gaTrackingId: import.meta.env.VITE_GA_TRACKING_ID,
    sentryDsn: import.meta.env.VITE_SENTRY_DSN,
    
    // Security
    cspNonce: import.meta.env.VITE_CSP_NONCE,
  };

  return validateConfig(config);
};

// Export the configuration
export const config = buildConfig();

// Environment-specific helpers
export const isDevelopment = config.appEnv === 'development';
export const isStaging = config.appEnv === 'staging';
export const isProduction = config.appEnv === 'production';

// Payment environment helpers
export const isPayPalSandbox = isDevelopment || isStaging;
export const isStripeTestMode = isDevelopment || isStaging;

// Debug logging (only in development)
export const debugLog = (...args: any[]) => {
  if (config.enableDebugMode) {
    console.log(`[${config.appName}]`, ...args);
  }
};

// Environment info
export const getEnvironmentInfo = () => ({
  environment: config.appEnv,
  version: config.appVersion,
  apiUrl: config.apiBaseUrl,
  isDevelopment,
  isStaging,
  isProduction,
  isPayPalSandbox,
  isStripeTestMode,
});

// Export default config for backward compatibility
export default config; 