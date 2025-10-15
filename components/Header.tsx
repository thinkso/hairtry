export default function Header() {
  return (
    <header className="bg-gradient-to-r from-dark-300/80 to-dark-300/60 backdrop-blur-md border-b border-dark-100/30">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold gradient-text">发型魔法师</h1>
            <p className="text-gray-300 mt-1">AI智能换发，快速预览你的新造型</p>
          </div>
        </div>
      </div>
    </header>
  )
}