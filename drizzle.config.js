import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './drizzle/schema.js',       // your schema file
  out: './drizzle/migration',                // where migration files go
  dialect: 'mysql',
  dbCredentials: {url:process.env.DATABASE_URL}
});
