'use client'

import { useStore } from '@/lib/store'
import { HairColor } from '@/types'

export default function HairColorSelector() {
  const { selectedHairColor, setSelectedHairColor } = useStore()

  // 发色数据
  const hairColors: HairColor[] = [
    {
      id: 'color_black',
      name: '黑色',
      value: '#2C2C2C',
      prompt: 'black hair'
    },
    {
      id: 'color_brown',
      name: '棕色',
      value: '#8B4513',
      prompt: 'brown hair'
    },
    {
      id: 'color_dark_brown',
      name: '深棕色',
      value: '#654321',
      prompt: 'dark brown hair'
    },
    {
      id: 'color_light_brown',
      name: '浅棕色',
      value: '#A0522D',
      prompt: 'light brown hair'
    },
    {
      id: 'color_blonde',
      name: '金色',
      value: '#F5DEB3',
      prompt: 'blonde hair'
    },
    {
      id: 'color_platinum_blonde',
      name: '铂金色',
      value: '#F0E68C',
      prompt: 'platinum blonde hair'
    },
    {
      id: 'color_red',
      name: '红色',
      value: '#A52A2A',
      prompt: 'red hair'
    },
    {
      id: 'color_auburn',
      name: '赤褐色',
      value: '#954535',
      prompt: 'auburn hair'
    },
    {
      id: 'color_gray',
      name: '灰色',
      value: '#808080',
      prompt: 'gray hair'
    },
    {
      id: 'color_white',
      name: '白色',
      value: '#F5F5F5',
      prompt: 'white hair'
    },
    {
      id: 'color_blue',
      name: '蓝色',
      value: '#4169E1',
      prompt: 'blue hair'
    },
    {
      id: 'color_purple',
      name: '紫色',
      value: '#8A2BE2',
      prompt: 'purple hair'
    },
    {
      id: 'color_pink',
      name: '粉色',
      value: '#FF69B4',
      prompt: 'pink hair'
    },
    {
      id: 'color_green',
      name: '绿色',
      value: '#32CD32',
      prompt: 'green hair'
    },
    {
      id: 'color_rainbow',
      name: '彩虹色',
      value: 'linear-gradient(45deg, #ff0000, #ffa500, #ffff00, #008000, #0000ff, #4b0082, #ee82ee)',
      prompt: 'rainbow colored hair'
    }
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-100">选择发色</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {hairColors.map((color) => (
          <div
            key={color.id}
            className={`
              flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all duration-300
              border-2 ${selectedHairColor?.id === color.id 
                ? 'border-primary-500 bg-primary-500/20 shadow-lg scale-105' 
                : 'border-dark-100/40 bg-dark-100/20 hover:border-primary-300/50 hover:bg-primary-300/10'
              }
            `}
            onClick={() => setSelectedHairColor(color)}
          >
            <div 
              className="w-12 h-12 rounded-full mb-2 border-2 border-gray-600 shadow-inner"
              style={{ 
                background: color.value,
                backgroundImage: color.value.startsWith('linear-gradient') ? color.value : 'none'
              }}
            />
            <span className="text-xs text-center text-gray-200 font-medium">
              {color.name}
            </span>
          </div>
        ))}
      </div>

      {selectedHairColor && (
        <div className="mt-4 p-3 bg-dark-100/30 rounded-lg border border-primary-500/30">
          <p className="text-sm text-gray-200">
            已选择: <span className="font-semibold text-primary-300">{selectedHairColor.name}</span>
          </p>
        </div>
      )}
    </div>
  )
}