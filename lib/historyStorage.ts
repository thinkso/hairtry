// 历史记录数据结构
export interface HistoryItem {
  id: string
  timestamp: number
  imageData: string // base64格式的图片数据
  hairstyleName: string
  prompt: string
}

// 存储键名
const HISTORY_STORAGE_KEY = 'hairtry_history'

// 最大历史记录数量
const MAX_HISTORY_ITEMS = 20 // 减少数量避免存储空间问题

// 最大图片尺寸（KB）
const MAX_IMAGE_SIZE_KB = 500

/**
 * 压缩图片数据
 */
function compressImageData(imageData: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      // 设置压缩后的尺寸
      const maxWidth = 800
      const maxHeight = 800
      let { width, height } = img
      
      if (width > maxWidth || height > maxHeight) {
        if (width > height) {
          height = Math.round((height * maxWidth) / width)
          width = maxWidth
        } else {
          width = Math.round((width * maxHeight) / height)
          height = maxHeight
        }
      }
      
      canvas.width = width
      canvas.height = height
      
      ctx?.drawImage(img, 0, 0, width, height)
      
      // 压缩质量
      const compressedData = canvas.toDataURL('image/jpeg', 0.7)
      resolve(compressedData)
    }
    
    img.onerror = () => {
      console.warn('图片压缩失败，使用原始数据')
      resolve(imageData)
    }
    
    img.src = imageData
  })
}

/**
 * 检查图片数据大小
 */
function checkImageSize(imageData: string): boolean {
  // base64数据大小估算：每字符约0.75字节
  const sizeKB = (imageData.length * 0.75) / 1024
  console.log('图片数据大小:', sizeKB.toFixed(2), 'KB')
  return sizeKB <= MAX_IMAGE_SIZE_KB
}

/**
 * 获取所有历史记录
 */
export function getHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY)
    if (!stored) return []
    
    const history = JSON.parse(stored)
    console.log('读取历史记录，数量:', history.length)
    return history
  } catch (error) {
    console.error('读取历史记录失败:', error)
    return []
  }
}

/**
 * 添加历史记录
 */
export async function addHistory(item: Omit<HistoryItem, 'id' | 'timestamp'>): Promise<void> {
  if (typeof window === 'undefined') return
  
  try {
    console.log('开始添加历史记录...')
    
    // 检查图片数据
    if (!item.imageData || !item.imageData.startsWith('data:image')) {
      console.error('无效的图片数据格式')
      return
    }
    
    // 压缩图片
    console.log('压缩图片数据...')
    const compressedImage = await compressImageData(item.imageData)
    
    if (!checkImageSize(compressedImage)) {
      console.warn('图片数据过大，跳过保存')
      return
    }
    
    const history = getHistory()
    console.log('当前历史记录数量:', history.length)
    
    // 创建新的历史记录项
    const newItem: HistoryItem = {
      ...item,
      imageData: compressedImage, // 使用压缩后的图片
      id: Date.now().toString(),
      timestamp: Date.now()
    }
    
    // 添加到开头
    history.unshift(newItem)
    
    // 限制历史记录数量
    if (history.length > MAX_HISTORY_ITEMS) {
      console.log('超过最大限制，删除多余记录')
      history.splice(MAX_HISTORY_ITEMS)
    }
    
    // 尝试保存
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history))
      console.log('保存历史记录成功，数量:', history.length)
    } catch (saveError) {
      console.error('存储空间不足，尝试清理...', saveError)
      
      // 如果存储失败，删除一半记录
      history.splice(Math.floor(history.length / 2))
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history))
      console.log('清理后保存成功，剩余数量:', history.length)
    }
    
  } catch (error) {
    console.error('添加历史记录失败:', error)
  }
}

/**
 * 删除历史记录
 */
export function deleteHistory(id: string): void {
  if (typeof window === 'undefined') return
  
  try {
    const history = getHistory().filter(item => item.id !== id)
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history))
    console.log('删除历史记录成功，剩余数量:', history.length)
  } catch (error) {
    console.error('删除历史记录失败:', error)
  }
}

/**
 * 清空所有历史记录
 */
export function clearHistory(): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY)
    console.log('清空历史记录成功')
  } catch (error) {
    console.error('清空历史记录失败:', error)
  }
}

/**
 * 获取历史记录数量
 */
export function getHistoryCount(): number {
  return getHistory().length
}