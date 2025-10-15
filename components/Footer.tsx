export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-dark-300/60 to-dark-300/40 backdrop-blur-sm border-t border-dark-100/30 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-300 text-sm">
            <p>隐私说明：照片仅用于本地生成，不会被存储</p>
          </div>
          
          <div className="text-gray-400 text-sm mt-2 md:mt-0">
            <p>发型魔法师 v1.0.0 © 2025</p>
          </div>
        </div>
      </div>
    </footer>
  )
}