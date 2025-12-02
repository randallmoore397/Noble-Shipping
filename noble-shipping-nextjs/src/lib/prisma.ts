import { Database } from '@sqlitecloud/drivers'

// Create SQLite Cloud connection
const globalForDb = globalThis as unknown as {
  db: Database | undefined
}

export const db = globalForDb.db ?? new Database(process.env.SQLITECLOUD_URL || process.env.DATABASE_URL!)

if (process.env.NODE_ENV !== 'production') globalForDb.db = db