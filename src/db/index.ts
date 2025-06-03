import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import * as schema from '../schema/index'

const pool = mysql.createPool(process.env.DATABASE_URL!)

export const db = drizzle(pool, { schema, mode: 'default' })

export async function connectToMysql() {
  try {
    await pool.getConnection()
    console.log('✅ Connected to MySQL successfully')
  } catch (error) {
    console.error('❌ Error connecting to MySQL:', error)
    throw error
  }
}
