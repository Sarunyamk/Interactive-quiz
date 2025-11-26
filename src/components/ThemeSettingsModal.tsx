// import { useState } from 'react'

// import type { ThemeConfig } from '@/lib/theme.tpye'
// import { Card } from './ui/card'
// import { Label } from './ui/label'
// import { Input } from './ui/input'
// import { Button } from './ui/button'

// interface ThemeSettingsModalProps {
//   theme: ThemeConfig
//   onChange: (updated: ThemeConfig) => void
//   onClose: () => void
// }

// export function ThemeSettingsModal({ theme, onChange, onClose }: ThemeSettingsModalProps) {
//   const [tempTheme, setTempTheme] = useState(theme)

//   const handleSave = () => {
//     onChange(tempTheme)
//     onClose()
//   }

//   const handleInput = (key: keyof ThemeConfig, value: string) => {
//     setTempTheme({ ...tempTheme, [key]: value })
//   }

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
//       <Card className="p-6 w-full max-w-lg bg-white shadow-xl">
//         <h2 className="text-xl font-semibold mb-4">🎨 ตั้งค่าธีมของ Quiz</h2>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <Label>Main Background</Label>
//             <Input
//               type="color"
//               value={tempTheme.mainBg}
//               onChange={(e) => handleInput('mainBg', e.target.value)}
//             />
//           </div>

//           <div>
//             <Label>Question Code Background</Label>
//             <Input
//               type="color"
//               value={tempTheme.questionCodeBg}
//               onChange={(e) => handleInput('questionCodeBg', e.target.value)}
//             />
//           </div>

//           <div>
//             <Label>Question Code Text Color</Label>
//             <Input
//               type="color"
//               value={tempTheme.questionCodeTextColor}
//               onChange={(e) => handleInput('questionCodeTextColor', e.target.value)}
//             />
//           </div>
//           <div>
//             <Label>Question Background</Label>
//             <Input
//               type="color"
//               value={tempTheme.questionBg}
//               onChange={(e) => handleInput('questionBg', e.target.value)}
//             />
//           </div>

//           <div>
//             <Label>Question Text Color</Label>
//             <Input
//               type="color"
//               value={tempTheme.questionTextColor}
//               onChange={(e) => handleInput('questionTextColor', e.target.value)}
//             />
//           </div>

//           <div>
//             <Label>Choice Background</Label>
//             <Input
//               type="color"
//               value={tempTheme.choiceBg}
//               onChange={(e) => handleInput('choiceBg', e.target.value)}
//             />
//           </div>

//           <div>
//             <Label>Choice Text Color</Label>
//             <Input
//               type="color"
//               value={tempTheme.choiceTextColor}
//               onChange={(e) => handleInput('choiceTextColor', e.target.value)}
//             />
//           </div>
//           <div>
//             <Label>Correct Choice Background</Label>
//             <Input
//               type="color"
//               value={tempTheme.correctBg}
//               onChange={(e) => handleInput('correctBg', e.target.value)}
//             />
//           </div>

//           <div>
//             <Label>Correct Choice Text Color</Label>
//             <Input
//               type="color"
//               value={tempTheme.correctTextColor}
//               onChange={(e) => handleInput('correctTextColor', e.target.value)}
//             />
//           </div>

//           <div>
//             <Label>Circle Background</Label>
//             <Input
//               type="color"
//               value={tempTheme.circleBg}
//               onChange={(e) => handleInput('circleBg', e.target.value)}
//             />
//           </div>

//           <div>
//             <Label>Circle Text Color</Label>
//             <Input
//               type="color"
//               value={tempTheme.circleTextColor}
//               onChange={(e) => handleInput('circleTextColor', e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="flex justify-end gap-3 mt-6">
//           <Button variant="outline" onClick={onClose}>
//             ยกเลิก
//           </Button>
//           <Button onClick={handleSave}>บันทึก</Button>
//         </div>
//       </Card>
//     </div>
//   )
// }
import { useState } from "react"
import { Card } from "./ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

interface ThemeColor {
  type: "solid" | "gradient"
  color1: string
  color2?: string
}

interface ThemeConfig {
  [key: string]: ThemeColor
}

export function ThemeSettingsModal({ theme, onChange, onClose }) {
  const [tempTheme, setTempTheme] = useState(theme)

  const updateField = (key: string, updated: Partial<ThemeColor>) => {
    setTempTheme(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        ...updated
      }
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <Card className="p-6 w-full max-w-2xl bg-white">
        <h2 className="text-xl font-semibold mb-4">🎨 ตั้งค่าธีม Quiz</h2>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          {Object.entries(tempTheme).map(([key, config]) => (
            <div key={key} className="border p-4 rounded-xl bg-gray-50">
              <h3 className="font-semibold mb-2">{key}</h3>

              {/* Toggle */}
              <div className="flex gap-4 mb-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={config.type === "solid"}
                    onChange={() => updateField(key, { type: "solid" })}
                  />
                  สีเดียว
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={config.type === "gradient"}
                    onChange={() => updateField(key, { type: "gradient" })}
                  />
                  Gradient
                </label>
              </div>

              {/* Color Picker */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Color 1</Label>
                  <Input
                    type="color"
                    value={config.color1}
                    onChange={(e) => updateField(key, { color1: e.target.value })}
                  />
                </div>

                {config.type === "gradient" && (
                  <div>
                    <Label>Color 2</Label>
                    <Input
                      type="color"
                      value={config.color2 || "#ffffff"}
                      onChange={(e) => updateField(key, { color2: e.target.value })}
                    />
                  </div>
                )}
              </div>

              {/* Manual Input */}
              <div className="mt-3">
                <Label>ใส่โค้ดสีเอง (เช่น #fff หรือ linear-gradient)</Label>
                <Input
                  value={
                    config.type === "solid"
                      ? config.color1
                      : `linear-gradient(135deg, ${config.color1}, ${config.color2})`
                  }
                  onChange={(e) => {
                    const value = e.target.value

                    if (value.includes("gradient")) {
                      // gradient
                      const match = value.match(/linear-gradient.*\((.*),(.*)\)/)
                      if (match) {
                        updateField(key, {
                          type: "gradient",
                          color1: match[1].trim(),
                          color2: match[2].replace(")", "").trim()
                        })
                      }
                    } else {
                      // solid
                      updateField(key, {
                        type: "solid",
                        color1: value
                      })
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>ยกเลิก</Button>
          <Button onClick={() => { onChange(tempTheme); onClose(); }}>
            บันทึก
          </Button>
        </div>
      </Card>
    </div>
  )
}
