'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'

export default function ResultDisplay() {
  const { uploadedImage, generatedImage, selectedHairstyle } = useStore()
  const [sliderPosition, setSliderPosition] = useState(50)

  const downloadImage = () => {
    if (!generatedImage) return

    const link = document.createElement('a')
    link.href = generatedImage
    link.download = `hairtry-${selectedHairstyle?.name}-${Date.now()}.jpg`
    link.click()
  }

  if (!uploadedImage || !generatedImage) return null

  return (
    <div className="space-y-6">
      {/* 对比滑块 */}
      <div className="relative bg-dark-100 rounded-2xl p-4">
        <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
          {/* 原图 */}
          <div className="absolute inset-0">
            <img
              src={uploadedImage}
              alt="原图"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* 生成图 */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
          >
            <img
              src={generatedImage}
              alt="生成结果"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* 滑块控制 */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-primary-500 cursor-col-resize"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={(e) => {
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
            }}
          >
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-8 bg-primary-500 rounded"></div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-400 mt-3 px-2">
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
          onClick={() => {
            setSliderPosition(50)
          }}
          className="btn-secondary flex-1"
        >
          🔄 重置对比
        </button>
      </div>

      {/* 样式信息 */}
      <div className="bg-dark-100 rounded-2xl p-4">
        <h4 className="font-medium mb-2">当前发型: {selectedHairstyle?.name}</h4>
        <p className="text-gray-400 text-sm">
          提示词: {selectedHairstyle?.prompt}
        </p>
      </div>
    </div>
  )
}