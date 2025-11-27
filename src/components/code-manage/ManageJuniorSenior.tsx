import type { ThemeConfig } from '@/lib/theme.type'
import { motion } from 'framer-motion'
import { Edit2, Plus, Save, Trash2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ThemeSettingsModal } from '../ThemeSettingsModal'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

interface JuniorSeniorData {
  id: string
  questionText?: string
  juniorCode: string
  seniorCode: string
}

interface ManageJuniorSeniorProps {
  onSelect: (data: JuniorSeniorData) => void
  onBack: () => void
  theme: ThemeConfig
  setTheme: (t: ThemeConfig) => void
}

export function ManageJuniorSenior({
  onSelect,
  onBack,
  theme,
  setTheme,
}: ManageJuniorSeniorProps) {
  const [items, setItems] = useState<JuniorSeniorData[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [openTheme, setOpenTheme] = useState(false)
  const [formData, setFormData] = useState({
    questionText: '',
    juniorCode: '',
    seniorCode: '',
  })

  useEffect(() => {
    const saved = localStorage.getItem('juniorSeniorData')
    if (saved) {
      setItems(JSON.parse(saved))
    }
  }, [])

  const saveToLocalStorage = (data: JuniorSeniorData[]) => {
    localStorage.setItem('juniorSeniorData', JSON.stringify(data))
  }

  const handleAdd = () => {
    setIsEditing(true)
    setEditingId(null)
    setFormData({
      questionText: '',
      juniorCode: '',
      seniorCode: '',
    })
  }

  const handleEdit = (item: JuniorSeniorData) => {
    setIsEditing(true)
    setEditingId(item.id)
    setFormData({
      questionText: item.questionText || '',
      juniorCode: item.juniorCode,
      seniorCode: item.seniorCode,
    })
  }

  const handleSave = () => {
    const newItem: JuniorSeniorData = {
      id: editingId || Date.now().toString(),
      questionText: formData.questionText,
      juniorCode: formData.juniorCode,
      seniorCode: formData.seniorCode,
    }

    let updated: JuniorSeniorData[]
    if (editingId) {
      updated = items.map((item) => (item.id === editingId ? newItem : item))
    } else {
      updated = [...items, newItem]
    }

    setItems(updated)
    saveToLocalStorage(updated)
    setIsEditing(false)
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้?')) {
      const updated = items.filter((item) => item.id !== id)
      setItems(updated)
      saveToLocalStorage(updated)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingId(null)
  }

  if (isEditing) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <Card className="p-6">
          <h2 className="text-2xl mb-6">
            {editingId ? 'แก้ไข' : 'เพิ่ม'}โค้ด Junior vs Senior
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Junior Developer Code</Label>
              <Textarea
                value={formData.juniorCode}
                onChange={(e) =>
                  setFormData({ ...formData, juniorCode: e.target.value })
                }
                placeholder="ใส่โค้ดของ Junior Developer..."
                className="font-mono h-48"
              />
            </div>

            <div className="space-y-2">
              <Label>Senior Developer Code</Label>
              <Textarea
                value={formData.seniorCode}
                onChange={(e) =>
                  setFormData({ ...formData, seniorCode: e.target.value })
                }
                placeholder="ใส่โค้ดของ Senior Developer..."
                className="font-mono h-48"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                บันทึก
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex-1"
              >
                <X className="w-4 h-4 mr-2" />
                ยกเลิก
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl">จัดการ Junior vs Senior</h2>
        <div className="flex gap-2">
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            เพิ่มโค้ด
          </Button>
          <Button variant="outline" onClick={() => setOpenTheme(true)}>
            ⚙️ ตั้งค่า Theme
          </Button>
          <Button onClick={onBack} variant="outline">
            กลับ
          </Button>
        </div>
      </div>
      {openTheme && (
        <ThemeSettingsModal
          mode="junior-senior"
          theme={theme}
          onChange={(updated) => setTheme(updated)}
          onClose={() => setOpenTheme(false)}
        />
      )}

      <div className="grid grid-cols-1 gap-4">
        {items.length === 0 ? (
          <Card className="p-8 text-center text-gray-500">
            ยังไม่มีข้อมูล กดปุ่ม "เพิ่มโค้ด" เพื่อสร้างข้อมูลใหม่
          </Card>
        ) : (
          items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-orange-600 mb-2">
                        Junior Developer
                      </div>
                      <pre className="bg-orange-50 p-4 rounded-lg text-xs overflow-auto max-h-40 border border-orange-200">
                        {item.juniorCode}
                      </pre>
                    </div>
                    <div>
                      <div className="text-sm text-green-600 mb-2">
                        Senior Developer
                      </div>
                      <pre className="bg-green-50 p-4 rounded-lg text-xs overflow-auto max-h-40 border border-green-200">
                        {item.seniorCode}
                      </pre>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onSelect(item)}
                    >
                      เล่น
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
