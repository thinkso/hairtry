import { create } from 'zustand'

interface Hairstyle {
  id: string
  name: string
  gender: 'male' | 'female'
  thumbnail_url: string
  prompt: string
}

interface AppState {
  uploadedImage: string | null
  selectedHairstyle: Hairstyle | null
  generatedImage: string | null
  isLoading: boolean
  error: string | null
  setUploadedImage: (image: string | null) => void
  setSelectedHairstyle: (hairstyle: Hairstyle | null) => void
  setGeneratedImage: (image: string | null) => void
  setIsLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

export const useStore = create<AppState>((set) => ({
  uploadedImage: null,
  selectedHairstyle: null,
  generatedImage: null,
  isLoading: false,
  error: null,
  
  setUploadedImage: (image) => set({ uploadedImage: image, generatedImage: null }),
  setSelectedHairstyle: (hairstyle) => set({ selectedHairstyle: hairstyle, generatedImage: null }),
  setGeneratedImage: (image) => set({ generatedImage: image }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  reset: () => set({
    uploadedImage: null,
    selectedHairstyle: null,
    generatedImage: null,
    isLoading: false,
    error: null
  })
}))