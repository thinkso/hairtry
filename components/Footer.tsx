export default function Footer() {
  return (
    <footer className="bg-dark-200 border-t border-dark-100 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            <p>隐私说明：照片仅用于本地生成，不会被存储</p>
          </div>
          
          <div className="text-gray-500 text-sm mt-2 md:mt-0">
            <p>HairTry v1.0.0 © 2024</p>
          </div>
        </div>
      </div>
    </footer>
  )
}