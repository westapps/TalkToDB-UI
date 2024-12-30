const isProduction = process.env.NODE_ENV === 'production';

export const registerUrl = isProduction
  ? process.env.USER_REGISTER_URL || "http://your-backend-url/api/register"
  : "http://your-backend-url/api/register";

export const googleOAuthUrl = isProduction
  ? process.env.GOOGLE_OAUTH_URL || "http://your-backend-url/api/auth/google"
  : "http://your-backend-url/api/auth/google"; 