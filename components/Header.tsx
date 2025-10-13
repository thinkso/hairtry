export default function Header() {
  return (
    <header className="bg-dark-200 border-b border-dark-100">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">HairTry</h1>
            <p className="text-gray-400 mt-1">AI智能换发，快速预览你的新造型</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm">服务正常</span>
          </div>
        </div>
      </div>
    </header>
  )
}