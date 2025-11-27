import type { ThemeColor } from '@/lib/theme.type'
import { useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'

export function ThemeSettingsModal({
  theme,
  onChange,
  onClose,
  mode = 'code-quiz',
}) {
  const [tempTheme, setTempTheme] = useState(theme)

  const modeImage = mode === 'code-image'

  const updateField = (key: string, updated: Partial<ThemeColor>) => {
    setTempTheme((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        ...updated,
      },
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
                    checked={config.type === 'solid'}
                    onChange={() => updateField(key, { type: 'solid' })}
                  />
                  สีเดียว
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={config.type === 'gradient'}
                    onChange={() => updateField(key, { type: 'gradient' })}
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
                    onChange={(e) =>
                      updateField(key, { color1: e.target.value })
                    }
                  />
                </div>

                {config.type === 'gradient' && (
                  <div>
                    <Label>Color 2</Label>
                    <Input
                      type="color"
                      value={config.color2 || '#ffffff'}
                      onChange={(e) =>
                        updateField(key, { color2: e.target.value })
                      }
                    />
                  </div>
                )}
              </div>

              {/* Manual Input */}
              <div className="mt-3">
                <Label>ใส่โค้ดสีเอง (เช่น #fff หรือ linear-gradient)</Label>
                <Input
                  value={
                    config.type === 'solid'
                      ? config.color1
                      : `linear-gradient(135deg, ${config.color1}, ${config.color2})`
                  }
                  onChange={(e) => {
                    const value = e.target.value.trim()

                    // ❌ ถ้าไม่ได้ขึ้นต้นด้วย linear-gradient → ถือว่าเป็น solid
                    if (!value.startsWith('linear-gradient')) {
                      updateField(key, {
                        type: 'solid',
                        color1: value,
                      })
                      return
                    }

                    // ✅ ใช่ gradient → parse แบบปลอดภัย
                    const match = value.match(
                      /linear-gradient\([^,]+,\s*([^,]+),\s*([^)]+)\)/
                    )

                    if (match) {
                      updateField(key, {
                        type: 'gradient',
                        color1: match[1].trim(),
                        color2: match[2].trim(),
                      })
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            ยกเลิก
          </Button>
          <Button
            onClick={() => {
              onChange(tempTheme)
              onClose()
            }}
          >
            บันทึก
          </Button>
        </div>
      </Card>
    </div>
  )
}
