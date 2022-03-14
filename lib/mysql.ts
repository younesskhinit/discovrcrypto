import mysql from 'serverless-mysql'

import dotenv from 'dotenv'
dotenv.config()

// Create database configuration
export const db = mysql({
  config: {
    host: process.env.MYSQL_HOST!,
    user: process.env.MYSQL_USER!,
    password: process.env.MYSQL_PASS!,
    port: 3306,
  },
})

// Create query handler
export const query = async ({
  query,
  values,
}: {
  query: string
  values?: any
}) => {
  try {
    const results = await db.query(query, values)
    await db.end()
    return results
  } catch (error) {
    return { error }
  }
}
