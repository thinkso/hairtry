import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/mysql'

export async function GET(request: NextRequest) {
  try {
    // 获取查询参数
    const { searchParams } = new URL(request.url)
    const gender = searchParams.get('gender')

    let sql = 'SELECT * FROM hairstyles'
    let params: any[] = []

    if (gender && (gender === 'male' || gender === 'female')) {
      sql += ' WHERE gender = ?'
      params.push(gender)
    }

    sql += ' ORDER BY name'

    const hairstyles = await query(sql, params)

    return NextResponse.json({ 
      success: true, 
      data: hairstyles 
    })
  } catch (error) {
    console.error('获取发型数据失败:', error)
    
    // 返回模拟数据作为备用
    const mockHairstyles = [
      {
        id: 'style_01',
        name: '短卷发刘海',
        gender: 'female',
        thumbnail_url: '/hairstyles/style_01_thumb.jpg',
        prompt: 'short curly bangs hairstyle for a female'
      },
      {
        id: 'style_02',
        name: '长直发',
        gender: 'female',
        thumbnail_url: '/hairstyles/style_02_thumb.jpg',
        prompt: 'long straight hair for a female'
      },
      {
        id: 'style_03',
        name: '波浪长发',
        gender: 'female',
        thumbnail_url: '/hairstyles/style_03_thumb.jpg',
        prompt: 'long wavy hair for a female'
      },
      {
        id: 'style_04',
        name: '短发',
        gender: 'male',
        thumbnail_url: '/hairstyles/style_04_thumb.jpg',
        prompt: 'short hair for a male'
      },
      {
        id: 'style_05',
        name: '中长发',
        gender: 'male',
        thumbnail_url: '/hairstyles/style_05_thumb.jpg',
        prompt: 'medium length hair for a male'
      }
    ]

    return NextResponse.json({ 
      success: true, 
      data: mockHairstyles 
    })
  }
}