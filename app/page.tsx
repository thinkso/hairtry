'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import ImageUpload from '@/components/ImageUpload'
import HairstyleSelector from '@/components/HairstyleSelector'
import AIGenerator from '@/components/AIGenerator'
import ResultDisplay from '@/components/ResultDisplay'
import Footer from '@/components/Footer'
import { useStore } from '@/lib/store'

export default function Home() {
  const { uploadedImage, selectedHairstyle, generatedImage } = useStore()
  
  return (
    <div className="min-h-screen bg-dark-300">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* 上传区域 */}
        <section className="card">
          <h2 className="text-2xl font-bold mb-4">上传你的头像</h2>
          <ImageUpload />
        </section>

        {/* 发型选择区 */}
        {uploadedImage && (
          <section className="card">
            <h2 className="text-2xl font-bold mb-4">选择发型</h2>
            <HairstyleSelector />
          </section>
        )}

        {/* AI生成区 */}
        {uploadedImage && selectedHairstyle && (
          <section className="card">
            <h2 className="text-2xl font-bold mb-4">生成新造型</h2>
            <AIGenerator />
          </section>
        )}

        {/* 结果展示区 */}
        {generatedImage && (
          <section className="card">
            <h2 className="text-2xl font-bold mb-4">生成结果</h2>
            <ResultDisplay />
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  )
}