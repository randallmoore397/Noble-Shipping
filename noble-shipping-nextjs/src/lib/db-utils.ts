import { db } from '@/lib/prisma'

export async function executeQuery<T>(
  query: string | TemplateStringsArray,
  ...params: any[]
): Promise<T[]> {
  try {
    let sqlQuery: string
    let sqlParams: any[] = []

    if (typeof query === 'string') {
      // Regular string query with separate params
      sqlQuery = query
      sqlParams = params
    } else {
      // Tagged template literal
      sqlQuery = query.join('?')
      sqlParams = params
    }

    const result = await db.sql(sqlQuery, ...sqlParams)
    return result as T[]
  } catch (error) {
    console.error('Database query error:', error)
    throw new Error('Failed to execute database query')
  }
}

export async function getTableStats() {
  try {
    const [cargoCount, aircargoCount, parcelCount, userCount] = await Promise.all([
      executeQuery<{ count: number }>('SELECT COUNT(*) as count FROM cargo'),
      executeQuery<{ count: number }>('SELECT COUNT(*) as count FROM aircargo'),
      executeQuery<{ count: number }>('SELECT COUNT(*) as count FROM parcel'),
      executeQuery<{ count: number }>('SELECT COUNT(*) as count FROM user')
    ])

    return {
      cargo: cargoCount[0]?.count || 0,
      aircargo: aircargoCount[0]?.count || 0,
      parcel: parcelCount[0]?.count || 0,
      user: userCount[0]?.count || 0
    }
  } catch (error) {
    console.error('Failed to get table stats:', error)
    throw new Error('Failed to retrieve database statistics')
  }
}