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
const MAX_HISTORY_ITEMS = 50

/**
 * 获取所有历史记录
 */
export function getHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('读取历史记录失败:', error)
    return []
  }
}

/**
 * 添加历史记录
 */
export function addHistory(item: Omit<HistoryItem, 'id' | 'timestamp'>): void {
  if (typeof window === 'undefined') return
  
  try {
    const history = getHistory()
    
    // 创建新的历史记录项
    const newItem: HistoryItem = {
      ...item,
      id: Date.now().toString(),
      timestamp: Date.now()
    }
    
    // 添加到开头
    history.unshift(newItem)
    
    // 限制历史记录数量
    if (history.length > MAX_HISTORY_ITEMS) {
      history.splice(MAX_HISTORY_ITEMS)
    }
    
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history))
  } catch (error) {
    console.error('保存历史记录失败:', error)
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