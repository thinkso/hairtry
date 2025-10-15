import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// OpenRouter API配置
const OPENROUTER_API_KEY = process.env.GOOGLE_GEMINI_API_KEY!
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1'
const MODEL_NAME = 'google/gemini-2.5-flash-image-preview'

export async function POST(request: NextRequest) {
  try {
    const { imageBase64, hairstylePrompt } = await request.json()

    // 验证输入参数
    if (!imageBase64 || !hairstylePrompt) {
      return NextResponse.json(
        { success: false, error: '缺少必要的参数: imageBase64 和 hairstylePrompt' },
        { status: 400 }
      )
    }

    // 验证API密钥
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'OpenRouter API密钥未配置' },
        { status: 500 }
      )
    }

    // 构建提示词 - 优化版，强调角度一致性
    const prompt = `Generate a new profile photo with the specified hairstyle applied to the user's face.

**IMPORTANT: Please output only an image, no text description!**

**CRITICAL REQUIREMENTS:**
1. **Maintain exact same pose, face angle, expression, and head orientation** - DO NOT change the head position or camera angle
2. **Preserve all facial features** - Keep eyes, nose, mouth, chin, and skin tone identical
3. **Only modify the hairstyle** - Apply the specified hairstyle while keeping everything else unchanged
4. **Hairstyle specification: ${hairstylePrompt}**
5. **Natural integration** - Make the hairstyle look realistic and seamlessly integrated with the original face
6. **No perspective changes** - Maintain the exact same facial proportions and perspective
7. **Output a high-quality JPEG image directly** - Do not describe it in text
8. **Maintain original resolution** - Keep the same image quality and dimensions

**Key constraints for angle consistency:**
- If the face is turned left/right, maintain that exact angle
- If the head is tilted, preserve the tilt angle
- Keep the same eye level and facial perspective
- No rotation or flipping of the face

Generate the hairstyle modification while strictly maintaining the original pose and angle.`

    // OpenRouter API调用
    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://hairtry.app',
        'X-Title': 'HairTry'
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
        max_tokens: 1024
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      
      // 保存错误日志
      const logsDir = path.join(process.cwd(), 'logs')
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true })
      }
      
      const logFile = path.join(logsDir, `api-error-${Date.now()}.json`)
      fs.writeFileSync(logFile, JSON.stringify({
        timestamp: new Date().toISOString(),
        request: { hairstylePrompt, imageBase64Length: imageBase64.length },
        error: errorData,
        status: response.status
      }, null, 2))
      
      console.log(`API错误响应已保存到: ${logFile}`)
      throw new Error(`OpenRouter API请求失败: ${response.status} - ${errorData}`)
    }

    const data = await response.json()
    
    // 检查响应格式
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      // 保存错误日志
      const logsDir = path.join(process.cwd(), 'logs')
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true })
      }
      
      const logFile = path.join(logsDir, `api-error-${Date.now()}.json`)
      fs.writeFileSync(logFile, JSON.stringify({
        timestamp: new Date().toISOString(),
        request: { hairstylePrompt, imageBase64Length: imageBase64.length },
        response: data
      }, null, 2))
      
      console.log(`API错误响应已保存到: ${logFile}`)
      throw new Error('OpenRouter API返回了无效的响应格式')
    }

    const message = data.choices[0].message

    // 提取base64图像数据
    let generatedImage = null

    // 方法1: 检查images数组中的图像数据（这是实际的正确位置）
    if (message.images && Array.isArray(message.images) && message.images.length > 0) {
      const imageData = message.images[0]
      if (imageData.image_url && imageData.image_url.url) {
        const imageUrl = imageData.image_url.url
        const base64Match = imageUrl.match(/data:image\/[^;]+;base64,([^"\s]+)/)
        if (base64Match) {
          generatedImage = base64Match[1]
          console.log('成功从images数组中提取图像数据')
        }
      }
    }

    // 方法2: 检查content字段中的base64图像数据（备用方法）
    if (!generatedImage && message.content && typeof message.content === 'string') {
      const base64Match = message.content.match(/data:image\/[^;]+;base64,([^"\s]+)/)
      if (base64Match) {
        generatedImage = base64Match[1]
        console.log('从content字段中提取图像数据')
      }
    }

    // 方法3: 检查是否有附加的文件或图像数据
    if (!generatedImage && message.attachments && Array.isArray(message.attachments)) {
      for (const attachment of message.attachments) {
        if (attachment.type === 'image' && attachment.data) {
          generatedImage = attachment.data
          console.log('从attachments中提取图像数据')
          break
        }
      }
    }

    if (!generatedImage) {
      // 保存错误日志
      const logsDir = path.join(process.cwd(), 'logs')
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true })
      }
      
      const logFile = path.join(logsDir, `api-error-${Date.now()}.json`)
      fs.writeFileSync(logFile, JSON.stringify({
        timestamp: new Date().toISOString(),
        request: { hairstylePrompt, imageBase64Length: imageBase64.length },
        response: data
      }, null, 2))
      
      console.log(`API错误响应已保存到: ${logFile}`)
      
      if (message.content && typeof message.content === 'string' && message.content.length > 0) {
        throw new Error(`模型返回了文本响应而非图像: ${message.content.substring(0, 200)}...`)
      } else {
        throw new Error('无法从模型响应中提取图像数据，请检查响应格式')
      }
    }

    // 成功时不写日志，只返回结果
    return NextResponse.json({
      success: true,
      image: generatedImage,
      message: '发型生成成功'
    })

  } catch (error: any) {
    console.error('API调用失败:', error)

    // 处理特定的错误类型
    let errorMessage = '生成过程中发生错误'
    
    if (error.message?.includes('401')) {
      errorMessage = 'OpenRouter API密钥无效或缺失'
    } else if (error.message?.includes('429')) {
      errorMessage = 'API调用额度已用完或频率限制'
    } else if (error.message?.includes('400')) {
      errorMessage = '请求参数无效或格式错误'
    } else if (error.message?.includes('fetch failed')) {
      errorMessage = '网络连接失败，请检查API端点配置'
    } else {
      errorMessage = error.message || '生成过程中发生未知错误'
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}

// 处理OPTIONS请求（CORS预检）
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}