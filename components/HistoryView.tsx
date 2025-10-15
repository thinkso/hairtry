'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { deleteHistory, clearHistory } from '@/lib/historyStorage'

export default function HistoryView() {
  const { history, setHistory, loadHistory } = useStore()
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [showSaveHint, setShowSaveHint] = useState<string | null>(null)

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  const handlePreview = (itemId: string) => {
    setSelectedItem(itemId === selectedItem ? null : itemId)
  }

  const handleDelete = (itemId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    deleteHistory(itemId)
    loadHistory()
  }

  const handleClearAll = () => {
    if (confirm('确定要清空所有历史记录吗？此操作不可撤销。')) {
      clearHistory()
      loadHistory()
    }
  }

  // 长按保存功能
  const handleTouchStart = (itemId: string) => {
    const timer = setTimeout(() => {
      setShowSaveHint(itemId)
      setTimeout(() => setShowSaveHint(null), 2000) // 2秒后隐藏提示
      
      // 触发下载
      const item = history.find(h => h.id === itemId)
      if (item) {
        const link = document.createElement('a')
        link.href = item.imageData
        link.download = `hairtry-${item.hairstyleName}-${item.id}.jpg`
        link.click()
      }
    }, 1000) // 长按1秒触发

    // 保存计时器以便清理
    const clearTimer = () => clearTimeout(timer)
    document.addEventListener('touchend', clearTimer, { once: true })
    document.addEventListener('mouseup', clearTimer, { once: true })
  }

  if (history.length === 0) {
    return (
      <div className="card gradient-border">
        <div className="text-center py-8">
          <div className="text-4xl opacity-60 mb-4">📋</div>
          <p className="text-gray-300">暂无历史记录</p>
          <p className="text-gray-400 text-sm mt-2">生成新的发型后将会显示在这里</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* 标题和操作 */}
      <div className="card gradient-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-lg text-gray-100">历史记录</h3>
            <p className="text-gray-300 text-sm mt-1">
              共 {history.length} 条记录
            </p>
          </div>
          
          <button
            onClick={handleClearAll}
            className="btn-secondary text-sm"
          >
            清空全部
          </button>
        </div>
      </div>

      {/* 历史记录列表 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {history.map((item) => (
          <div
            key={item.id}
            className={`
              card gradient-border cursor-pointer transition-all duration-300
              ${selectedItem === item.id ? 'border-primary-500 bg-gradient-to-r from-primary-500/10 to-secondary-500/10' : ''}
            `}
            onClick={() => handlePreview(item.id)}
          >
            <div 
              className="relative aspect-square rounded-lg overflow-hidden bg-dark-100/50"
              onTouchStart={() => handleTouchStart(item.id)}
              onMouseDown={() => handleTouchStart(item.id)}
            >
              <img
                src={item.imageData}
                alt={item.hairstyleName}
                className="w-full h-full object-cover"
              />
              
              {/* 长按保存提示 */}
              {showSaveHint === item.id && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="bg-white text-dark-300 px-3 py-2 rounded-lg text-xs font-medium">
                    已保存
                  </div>
                </div>
              )}
              
              {/* 删除按钮 */}
              <button
                onClick={(e) => handleDelete(item.id, e)}
                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-all duration-300"
              >
                ×
              </button>
            </div>
            
            <div className="mt-2">
              <h4 className="font-medium text-sm text-gray-100 truncate">
                {item.hairstyleName}
              </h4>
              <p className="text-gray-400 text-xs mt-1">
                {new Date(item.timestamp).toLocaleString('zh-CN', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 预览模态框 */}
      {selectedItem && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const item = history.find(h => h.id === selectedItem)
              if (!item) return null
              
              return (
                <>
                  <img
                    src={item.imageData}
                    alt={item.hairstyleName}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                  
                  {/* 关闭按钮 */}
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full p-2 transition-all duration-300 shadow-lg"
                  >
                    ×
                  </button>
                  
                  {/* 预览信息 */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-3 rounded-lg text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.hairstyleName}</span>
                      <span className="text-gray-300">
                        {new Date(item.timestamp).toLocaleString('zh-CN')}
                      </span>
                    </div>
                    <p className="text-gray-300 text-xs mt-2">
                      点击图片外区域关闭预览
                    </p>
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}