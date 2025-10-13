import { createClient } from '@supabase/supabase-js'

// 在构建时避免环境变量问题
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 检查是否在构建环境中
export const isBuildTime = typeof window === 'undefined' && !process.env.NEXT_PUBLIC_SUPABASE_URL

export interface Hairstyle {
  id: string
  name: string
  gender: 'male' | 'female'
  thumbnail_url: string
  prompt: string
}

export interface UsageLog {
  timestamp: string
  hairstyle_id: string
  status: 'success' | 'failed'
  duration_ms: number
}

export const hairstylesApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('hairstyles')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data as Hairstyle[]
  },
  
  async getByGender(gender: 'male' | 'female') {
    const { data, error } = await supabase
      .from('hairstyles')
      .select('*')
      .eq('gender', gender)
      .order('name')
    
    if (error) throw error
    return data as Hairstyle[]
  }
}

export const usageLogsApi = {
  async create(log: Omit<UsageLog, 'timestamp'>) {
    const { data, error } = await supabase
      .from('usage_logs')
      .insert([{
        ...log,
        timestamp: new Date().toISOString()
      }])
    
    if (error) throw error
    return data
  }
}