/**
 * Application configuration
 */

// Environment flag - set to 'production' in production environment
export const ENV = process.env.NODE_ENV || 'development';

// Auth configuration
export const AUTH_CONFIG = {
  // Base API URL (can be changed in one place for production)
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/token',
  
  // Development dummy credentials (only used in development)
  devCredentials: {
    username: 'XXXX',
    password: 'XXXX',
  },
  
  // Flag to determine authentication method
  useUserCredentials: ENV === 'production',
};
