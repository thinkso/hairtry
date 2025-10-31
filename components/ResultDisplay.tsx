'use client'

import { useState, useRef } from 'react'
import { useStore } from '@/lib/store'

export default function ResultDisplay() {
  const { uploadedImage, generatedImage, selectedHairstyle } = useStore()
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [previewType, setPreviewType] = useState<'original' | 'generated' | null>(null)
  const [showSaveHint, setShowSaveHint] = useState(false)
  const touchTimerRef = useRef<NodeJS.Timeout | null>(null)

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

  // 长按保存功能
  const handleTouchStart = () => {
    touchTimerRef.current = setTimeout(() => {
      setShowSaveHint(true)
      setTimeout(() => setShowSaveHint(false), 2000) // 2秒后隐藏提示
    }, 1000) // 长按1秒触发
  }

  const handleTouchEnd = () => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current)
      touchTimerRef.current = null
    }
  }

  if (!uploadedImage || !generatedImage) return null

  return (
    <div className="space-y-6">
      {/* 对比结果区域 */}
      <div className="card gradient-border">
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium text-gray-100">对比效果</h3>
          <p className="text-gray-300 text-sm mt-1">左右滑动查看原图与生成结果的对比</p>
        </div>
        
        {/* 左右对比布局 */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          {/* 原图 - 左侧 */}
          <div className="flex-1 max-w-md text-center">
            <h4 className="text-gray-300 font-medium mb-3">原图</h4>
            <div 
              className="relative cursor-pointer group"
              onClick={() => openPreview(uploadedImage, 'original')}
              title="点击预览大图"
            >
              <img
                src={uploadedImage}
                alt="原图"
                className="w-full h-auto max-h-80 object-contain rounded-lg border-2 border-gray-600 transition-all duration-300 group-hover:border-primary-500 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                原图
              </div>
            </div>
          </div>
          
          {/* 分隔线 */}
          <div className="hidden md:flex flex-col items-center justify-center">
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-primary-500 to-transparent"></div>
            <div className="text-primary-400 text-xs font-medium py-2">→</div>
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-primary-500 to-transparent"></div>
          </div>
          
          {/* 生成结果 - 右侧 */}
          <div className="flex-1 max-w-md text-center">
            <h4 className="text-gray-300 font-medium mb-3">生成结果</h4>
            <div 
              className="relative cursor-pointer group"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleTouchStart}
              onMouseUp={handleTouchEnd}
              onMouseLeave={handleTouchEnd}
              onClick={() => openPreview(generatedImage, 'generated')}
              title="点击预览大图"
            >
              <img
                src={generatedImage}
                alt="生成结果"
                className="w-full h-auto max-h-80 object-contain rounded-lg border-2 border-gray-600 transition-all duration-300 group-hover:border-secondary-500 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                新发型
              </div>
              
              {/* 长按保存提示 */}
              {showSaveHint && (
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                  <div className="bg-white text-dark-300 px-4 py-2 rounded-lg text-sm font-medium">
                    长按图片保存
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6 pt-4 border-t border-gray-700">
          <button
            onClick={downloadImage}
            className="btn-primary"
          >
            📥 下载生成结果
          </button>
          <p className="text-gray-400 text-sm">
            或长按右侧图片保存
          </p>
        </div>
      </div>

      {/* 预览模态框 */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          style={{ position: 'fixed', zIndex: 9999 }}
          onClick={closePreview}
        >
          <div 
            className="relative max-w-4xl max-h-full"
            style={{ position: 'relative', zIndex: 10000 }}
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