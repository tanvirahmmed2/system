/**
 * Secret Configuration Module
 * Collects and exports environment variables for use throughout the application.
 */

export const DB_URL = process.env.DATABASE_URL;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const JWT_SECRET = process.env.JWT_SECRET;
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

// Export all secrets as a default object
const secrets = {
  DB_URL,
  NODE_ENV,
  JWT_SECRET,
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET,
};

export default secrets;
