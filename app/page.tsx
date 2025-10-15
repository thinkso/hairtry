'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import ImageUpload from '@/components/ImageUpload'
import HairstyleSelector from '@/components/HairstyleSelector'
import AIGenerator from '@/components/AIGenerator'
import ResultDisplay from '@/components/ResultDisplay'
import HistoryView from '@/components/HistoryView'
import Footer from '@/components/Footer'
import { useStore } from '@/lib/store'

export default function Home() {
  const { uploadedImage, selectedHairstyle, generatedImage, showHistory, setShowHistory } = useStore()
  
  return (
    <div className="min-h-screen bg-dark-300">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* 顶部切换按钮 */}
        <div className="flex space-x-4">
          <button
            onClick={() => setShowHistory(false)}
            className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
              !showHistory
                ? 'bg-gradient-to-r from-primary-600 to-secondary-500 text-white shadow-lg'
                : 'bg-dark-100/60 hover:bg-dark-100/80 text-gray-300 hover:text-white'
            }`}
          >
            🎨 生成新造型
          </button>
          
          <button
            onClick={() => setShowHistory(true)}
            className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
              showHistory
                ? 'bg-gradient-to-r from-primary-600 to-secondary-500 text-white shadow-lg'
                : 'bg-dark-100/60 hover:bg-dark-100/80 text-gray-300 hover:text-white'
            }`}
          >
            📋 查看历史记录
          </button>
        </div>

        {showHistory ? (
          // 历史记录视图
          <HistoryView />
        ) : (
          // 生成新造型视图
          <>
            {/* 上传区域 */}
            <section className="card">
              <h2 className="text-2xl font-bold mb-4 gradient-text">上传你的头像</h2>
              <ImageUpload />
            </section>

            {/* 发型选择区 */}
            {uploadedImage && (
              <section className="card">
                <h2 className="text-2xl font-bold mb-4 gradient-text">选择发型</h2>
                <HairstyleSelector />
              </section>
            )}

            {/* AI生成区 */}
            {uploadedImage && selectedHairstyle && (
              <section className="card">
                <h2 className="text-2xl font-bold mb-4 gradient-text">生成新造型</h2>
                <AIGenerator />
              </section>
            )}

            {/* 结果展示区 */}
            {generatedImage && (
              <section className="card">
                <h2 className="text-2xl font-bold mb-4 gradient-text">生成结果</h2>
                <ResultDisplay />
              </section>
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  )
}