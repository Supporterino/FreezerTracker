export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  appBaseUrl: process.env.APP_BASE_URL || 'http://localhost:3000',
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:1420'],
  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  },
  database: {
    url: process.env.DATABASE_URL,
  },
});
