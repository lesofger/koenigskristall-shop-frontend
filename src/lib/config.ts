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
    appEnv: (import.meta.env.VITE_APP_ENV) as 'development' | 'production',
  };

  return validateConfig(config);
};

// Export the configuration
export const config = buildConfig();

// Environment-specific helpers
export const isDevelopment = config.appEnv === 'development';
export const isProduction = config.appEnv === 'production';

// Payment environment helpers
export const isPayPalSandbox = isDevelopment;
export const isStripeTestMode = isDevelopment;

// Debug logging (only in development)
export const debugLog = (...args: any[]) => {
  if (isDevelopment) {
    console.log(`[${config.appName}]`, ...args);
  }
};

// Environment info
export const getEnvironmentInfo = () => ({
  environment: config.appEnv,
  version: config.appVersion,
  apiUrl: config.apiBaseUrl,
  isDevelopment,
  isProduction,
  isPayPalSandbox,
  isStripeTestMode,
});

// Export default config for backward compatibility
export default config; 