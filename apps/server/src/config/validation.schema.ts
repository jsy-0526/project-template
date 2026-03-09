import { z } from 'zod';

export const configValidationSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number().default(5432),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('7d'),
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.coerce.number().default(6379),
  CACHE_TTL: z.coerce.number().default(300),
});
