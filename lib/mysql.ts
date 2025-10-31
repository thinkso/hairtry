import mysql from 'mysql2/promise'

// 从环境变量获取数据库连接信息
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'hairtry',
  charset: 'utf8mb4',
  timezone: '+08:00',
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
}

// 创建连接池
let pool: mysql.Pool | null = null

function createPool() {
  if (!pool) {
    pool = mysql.createPool(dbConfig)
  }
  return pool
}

// 执行查询
export async function query(sql: string, params?: any[]) {
  const pool = createPool()
  try {
    const [rows] = await pool.execute(sql, params)
    return rows
  } catch (error) {
    console.error('MySQL 查询错误:', error)
    throw error
  }
}

// 接口定义
export interface Hairstyle {
  id: string
  name: string
  gender: 'male' | 'female'
  thumbnail_url: string
  prompt: string
}

export interface UsageLog {
  id?: number
  hairstyle_id: string
  status: 'success' | 'failed'
  duration_ms: number
  timestamp?: string
}