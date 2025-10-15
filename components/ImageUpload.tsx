'use client'

import { useRef, useState } from 'react'
import { useStore } from '@/lib/store'

export default function ImageUpload() {
  const { uploadedImage, setUploadedImage, setSelectedHairstyle, setGeneratedImage } = useStore()
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert('文件大小不能超过5MB')
      return
    }

    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target?.result as string
      setUploadedImage(base64)
      setSelectedHairstyle(null)
      setGeneratedImage(null)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      {uploadedImage ? (
        // 显示上传的图片预览
        <div className="relative card gradient-border">
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img
              src={uploadedImage}
              alt="上传的头像"
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => {
                setUploadedImage(null)
                setSelectedHairstyle(null)
                setGeneratedImage(null)
              }}
              className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full p-2 transition-all duration-300 shadow-lg"
            >
              ×
            </button>
          </div>
          <p className="text-center text-gray-300 text-sm mt-2">已上传头像，可重新上传</p>
        </div>
      ) : (
        // 上传区域
        <div
          className={`
            card gradient-border border-dashed cursor-pointer transition-all duration-300
            ${dragOver ? 'border-primary-500 bg-primary-500/20' : 'border-gray-500/30 hover:border-primary-400/50'}
          `}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFileSelect(file)
            }}
          />
          
          <div className="space-y-3 text-center">
            <div className="text-5xl opacity-80">📁</div>
            <p className="text-lg font-medium text-gray-100">点击或拖拽上传头像</p>
            <p className="text-gray-300 text-sm">支持 JPG、PNG 格式，最大 5MB</p>
          </div>
        </div>
      )}
    </div>
  )
}