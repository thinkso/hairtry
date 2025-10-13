'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { usageLogsApi } from '@/lib/supabase'

export default function AIGenerator() {
  const { uploadedImage, selectedHairstyle, setGeneratedImage, setIsLoading, setError } = useStore()
  const [isGenerating, setIsGenerating] = useState(false)

  const generateHairstyle = async () => {
    if (!uploadedImage || !selectedHairstyle) return

    setIsGenerating(true)
    setIsLoading(true)
    setError(null)

    const startTime = Date.now()

    try {
      // 将base64数据转换为Blob
      const response = await fetch(uploadedImage)
      const blob = await response.blob()
      
      // 准备API调用参数
      const requestData = {
        imageBase64: uploadedImage.split(',')[1], // 移除data:image/jpeg;base64,前缀
        hairstylePrompt: selectedHairstyle.prompt
      }

      // 调用后端API
      const apiResponse = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json()
        throw new Error(errorData.error || '生成失败')
      }

      const result = await apiResponse.json()
      
      if (result.success && result.image) {
        setGeneratedImage(`data:image/jpeg;base64,${result.image}`)
        
        // 记录成功日志
        await usageLogsApi.create({
          hairstyle_id: selectedHairstyle.id,
          status: 'success',
          duration_ms: Date.now() - startTime
        })
      } else {
        throw new Error(result.error || '生成失败')
      }

    } catch (error) {
      console.error('生成失败:', error)
      setError(error instanceof Error ? error.message : '生成过程中发生错误')
      
      // 记录失败日志
      await usageLogsApi.create({
        hairstyle_id: selectedHairstyle.id,
        status: 'failed',
        duration_ms: Date.now() - startTime
      })
    } finally {
      setIsGenerating(false)
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-dark-100 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-lg">准备生成</h3>
            <p className="text-gray-400 text-sm mt-1">
              已选择: <span className="text-primary-500">{selectedHairstyle?.name}</span>
            </p>
          </div>
          
          <button
            onClick={generateHairstyle}
            disabled={isGenerating}
            className="btn-primary disabled:opacity-50"
          >
            {isGenerating ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>生成中...</span>
              </div>
            ) : (
              '生成新造型'
            )}
          </button>
        </div>
      </div>

      {isGenerating && (
        <div className="bg-dark-100 rounded-2xl p-6">
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <div>
              <p className="font-medium">AI正在生成新发型...</p>
              <p className="text-gray-400 text-sm">这可能需要几秒钟时间</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}