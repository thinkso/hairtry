import { create } from 'zustand'
import { getHistory, type HistoryItem } from './historyStorage'

interface Hairstyle {
  id: string
  name: string
  gender: 'male' | 'female'
  thumbnail_url: string
  prompt: string
}

interface HairColor {
  id: string
  name: string
  value: string
  prompt: string
}

interface AppState {
  uploadedImage: string | null
  selectedHairstyle: Hairstyle | null
  selectedHairColor: HairColor | null
  generatedImage: string | null
  isLoading: boolean
  error: string | null
  history: HistoryItem[]
  showHistory: boolean
  setUploadedImage: (image: string | null) => void
  setSelectedHairstyle: (hairstyle: Hairstyle | null) => void
  setSelectedHairColor: (color: HairColor | null) => void
  setGeneratedImage: (image: string | null) => void
  setIsLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setHistory: (history: HistoryItem[]) => void
  setShowHistory: (show: boolean) => void
  loadHistory: () => void
  reset: () => void
}

export const useStore = create<AppState>((set, get) => ({
  uploadedImage: null,
  selectedHairstyle: null,
  selectedHairColor: null,
  generatedImage: null,
  isLoading: false,
  error: null,
  history: [],
  showHistory: false,
  
  setUploadedImage: (image) => set({ uploadedImage: image, generatedImage: null }),
  setSelectedHairstyle: (hairstyle) => set({ selectedHairstyle: hairstyle, generatedImage: null }),
  setSelectedHairColor: (color) => set({ selectedHairColor: color, generatedImage: null }),
  setGeneratedImage: (image) => set({ generatedImage: image }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setHistory: (history) => set({ history }),
  setShowHistory: (show) => set({ showHistory: show }),
  
  loadHistory: () => {
    const history = getHistory()
    set({ history })
  },
  
  reset: () => set({
    uploadedImage: null,
    selectedHairstyle: null,
    selectedHairColor: null,
    generatedImage: null,
    isLoading: false,
    error: null
  })
}))