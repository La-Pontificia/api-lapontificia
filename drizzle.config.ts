import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  out: './drizzle',
  schema: './src/schema/index.ts',
  dialect: 'mysql',
  dbCredentials: {
    url: 'mysql://daustinn:daustinn@localhost:3306/lp'
  }
})
