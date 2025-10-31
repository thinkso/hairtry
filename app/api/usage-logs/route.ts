import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/mysql'

export async function POST(request: NextRequest) {
  try {
    const logData = await request.json()
    
    const { hairstyle_id, status, duration_ms } = logData
    
    if (!hairstyle_id || !status || !duration_ms) {
      return NextResponse.json(
        { success: false, error: '缺少必要参数' },
        { status: 400 }
      )
    }

    const result = await query(
      'INSERT INTO usage_logs (hairstyle_id, status, duration_ms) VALUES (?, ?, ?)',
      [hairstyle_id, status, duration_ms]
    )

    return NextResponse.json({ 
      success: true, 
      data: result 
    })
  } catch (error) {
    console.error('创建使用日志失败:', error)
    
    return NextResponse.json(
      { success: false, error: '创建日志失败' },
      { status: 500 }
    )
  }
}