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
        <div className="relative bg-dark-100 rounded-2xl p-4">
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img
              src={uploadedImage}
              alt="上传的头像"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => {
                setUploadedImage(null)
                setSelectedHairstyle(null)
                setGeneratedImage(null)
              }}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
            >
              ✕
            </button>
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">已上传头像，可重新上传</p>
        </div>
      ) : (
        // 上传区域
        <div
          className={`
            border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200
            ${dragOver ? 'border-primary-500 bg-primary-500/10' : 'border-gray-600 hover:border-gray-500'}
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
          
          <div className="space-y-2">
            <div className="text-4xl">📸</div>
            <p className="text-lg font-medium">点击或拖拽上传头像</p>
            <p className="text-gray-400 text-sm">支持 JPG、PNG 格式，最大 5MB</p>
          </div>
        </div>
      )}
    </div>
  )
}