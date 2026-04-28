import * as Joi from 'joi';

export const validationSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRES_IN: Joi.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('30d'),
  ALLOWED_ORIGINS: Joi.string().default('http://localhost:1420'),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  APP_BASE_URL: Joi.string().default('http://localhost:3000'),
});
