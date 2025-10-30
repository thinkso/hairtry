// TypeScript 类型定义
export interface Hairstyle {
  id: string
  name: string
  gender: 'male' | 'female'
  thumbnail_url: string
  prompt: string
}

export interface HairColor {
  id: string
  name: string
  value: string
  prompt: string
}

export interface UsageLog {
  id?: number
  timestamp: string
  hairstyle_id: string
  status: 'success' | 'failed'
  duration_ms: number
}

export interface GenerationRequest {
  imageBase64: string
  hairstylePrompt: string
  hairColorPrompt?: string
}

export interface GenerationResponse {
  success: boolean
  image?: string
  error?: string
  message?: string
}