'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'

export default function ResultDisplay() {
  const { uploadedImage, generatedImage, selectedHairstyle } = useStore()
  const [sliderPosition, setSliderPosition] = useState(50)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [previewType, setPreviewType] = useState<'original' | 'generated' | null>(null)

  const downloadImage = () => {
    if (!generatedImage) return

    const link = document.createElement('a')
    link.href = generatedImage
    link.download = `hairtry-${selectedHairstyle?.name}-${Date.now()}.jpg`
    link.click()
  }

  const openPreview = (image: string, type: 'original' | 'generated') => {
    setPreviewImage(image)
    setPreviewType(type)
  }

  const closePreview = () => {
    setPreviewImage(null)
    setPreviewType(null)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.clientX
    const startPosition = sliderPosition
    const container = e.currentTarget.parentElement
    
    if (!container) return
    
    const onMouseMove = (moveEvent: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const newPosition = startPosition + ((moveEvent.clientX - startX) / rect.width) * 100
      setSliderPosition(Math.max(0, Math.min(100, newPosition)))
    }
    
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
    
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    const touch = e.touches[0]
    const startX = touch.clientX
    const startPosition = sliderPosition
    const container = e.currentTarget.parentElement
    
    if (!container) return
    
    const onTouchMove = (moveEvent: TouchEvent) => {
      const touch = moveEvent.touches[0]
      const rect = container.getBoundingClientRect()
      const newPosition = startPosition + ((touch.clientX - startX) / rect.width) * 100
      setSliderPosition(Math.max(0, Math.min(100, newPosition)))
    }
    
    const onTouchEnd = () => {
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
    }
    
    document.addEventListener('touchmove', onTouchMove)
    document.addEventListener('touchend', onTouchEnd)
  }

  if (!uploadedImage || !generatedImage) return null

  return (
    <div className="space-y-6">
      {/* 对比滑块 */}
      <div className="relative card gradient-border">
        <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
          {/* 原图 - 可点击预览 */}
          <div 
            className="absolute inset-0 cursor-pointer"
            onClick={() => openPreview(uploadedImage, 'original')}
            title="点击预览原图"
          >
            <img
              src={uploadedImage}
              alt="原图"
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* 生成图 - 可点击预览 */}
          <div
            className="absolute inset-0 cursor-pointer"
            style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
            onClick={() => openPreview(generatedImage, 'generated')}
            title="点击预览生成结果"
          >
            <img
              src={generatedImage}
              alt="生成结果"
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* 滑块控制 */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-primary-500 cursor-col-resize touch-none"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-8 bg-primary-500 rounded"></div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-300 mt-3 px-2">
          <span>原图</span>
          <span>生成结果</span>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={downloadImage}
          className="btn-primary flex-1"
        >
          💾 保存图片
        </button>
        
        <button
          onClick={() => openPreview(generatedImage, 'generated')}
          className="btn-secondary flex-1"
        >
          🔍 预览大图
        </button>
        
        <button
          onClick={() => {
            setSliderPosition(50)
          }}
          className="btn-secondary flex-1"
        >
          🔄 重置对比
        </button>
      </div>

      {/* 预览模态框 */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closePreview}
        >
          <div 
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewImage}
              alt={previewType === 'original' ? '原图预览' : '生成结果预览'}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            {/* 关闭按钮 */}
            <button
              onClick={closePreview}
              className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full p-2 transition-all duration-300 shadow-lg"
            >
              ×
            </button>
            
            {/* 预览标题 */}
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
              {previewType === 'original' ? '原图预览' : '生成结果预览'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}