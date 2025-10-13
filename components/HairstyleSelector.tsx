'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { hairstylesApi, type Hairstyle } from '@/lib/supabase'

export default function HairstyleSelector() {
  const { uploadedImage, selectedHairstyle, setSelectedHairstyle } = useStore()
  const [hairstyles, setHairstyles] = useState<Hairstyle[]>([])
  const [filteredHairstyles, setFilteredHairstyles] = useState<Hairstyle[]>([])
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('female')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadHairstyles()
  }, [])

  useEffect(() => {
    if (hairstyles.length > 0) {
      const filtered = hairstyles.filter(style => style.gender === selectedGender)
      setFilteredHairstyles(filtered)
    }
  }, [hairstyles, selectedGender])

  const loadHairstyles = async () => {
    try {
      setLoading(true)
      const data = await hairstylesApi.getAll()
      setHairstyles(data)
    } catch (error) {
      console.error('加载发型数据失败:', error)
      // 使用模拟数据作为备用
      setHairstyles(mockHairstyles)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 性别筛选 */}
      <div className="flex space-x-4">
        <button
          onClick={() => setSelectedGender('female')}
          className={`px-4 py-2 rounded-lg transition-all ${
            selectedGender === 'female'
              ? 'bg-primary-600 text-white'
              : 'bg-dark-100 text-gray-400 hover:bg-dark-200'
          }`}
        >
          女款发型
        </button>
        <button
          onClick={() => setSelectedGender('male')}
          className={`px-4 py-2 rounded-lg transition-all ${
            selectedGender === 'male'
              ? 'bg-primary-600 text-white'
              : 'bg-dark-100 text-gray-400 hover:bg-dark-200'
          }`}
        >
          男款发型
        </button>
      </div>

      {/* 发型网格 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredHairstyles.map((hairstyle) => (
          <div
            key={hairstyle.id}
            className={`
              border-2 rounded-2xl p-4 cursor-pointer transition-all duration-200
              ${selectedHairstyle?.id === hairstyle.id
                ? 'border-primary-500 bg-primary-500/10'
                : 'border-gray-600 hover:border-gray-500'
              }
            `}
            onClick={() => setSelectedHairstyle(hairstyle)}
          >
            <div className="aspect-square bg-gray-700 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
              {hairstyle.thumbnail_url ? (
                <img
                  src={hairstyle.thumbnail_url}
                  alt={hairstyle.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // 如果图片加载失败，显示emoji作为备用
                    e.currentTarget.style.display = 'none'
                    const parent = e.currentTarget.parentElement
                    if (parent) {
                      parent.innerHTML = '<span class="text-2xl">💇</span>'
                    }
                  }}
                />
              ) : (
                <span className="text-2xl">💇</span>
              )}
            </div>
            <h3 className="font-medium text-sm text-center">{hairstyle.name}</h3>
          </div>
        ))}
      </div>

      {filteredHairstyles.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          暂无{selectedGender === 'female' ? '女款' : '男款'}发型数据
        </div>
      )}
    </div>
  )
}

// 模拟发型数据
const mockHairstyles: Hairstyle[] = [
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