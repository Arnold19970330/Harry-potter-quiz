import 'dotenv/config';
import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  MONGODB_URI: z.string().or(z.string().startsWith('mongodb://')),
});

export const ENV = EnvSchema.parse(process.env);
// Típusbiztos, autó-kiegészítést kap:
export const { NODE_ENV, PORT, MONGODB_URI } = ENV;
