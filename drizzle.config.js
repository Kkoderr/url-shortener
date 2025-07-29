import { defineConfig } from 'drizzle-kit';

const url = process.env.DATABASE_URL
export default defineConfig({
  schema: './drizzle/schema.js',       // your schema file
  out: './drizzle/migration',                // where migration files go
  dialect: 'mysql',
  dbCredentials: {url:url}
});
