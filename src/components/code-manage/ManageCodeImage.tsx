import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react'
import { Card } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

interface ImageQuizData {
  id: string
  imageUrl: string
  questionText?: string
  options: string[]
  correctAnswer: number
}

interface ManageCodeImageProps {
  onSelect: (quiz: ImageQuizData) => void
  onBack: () => void
}

export function ManageCodeImage({ onSelect, onBack }: ManageCodeImageProps) {
  const [quizzes, setQuizzes] = useState<ImageQuizData[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    imageUrl: '',
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 0,
  })

  useEffect(() => {
    const saved = localStorage.getItem('imageQuizzes')
    if (saved) {
      setQuizzes(JSON.parse(saved))
    }
  }, [])

  const saveToLocalStorage = (data: ImageQuizData[]) => {
    localStorage.setItem('imageQuizzes', JSON.stringify(data))
  }

  const handleAdd = () => {
    setIsEditing(true)
    setEditingId(null)
    setFormData({
      imageUrl: '',
      questionText: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: 0,
    })
  }

  const handleEdit = (quiz: ImageQuizData) => {
    setIsEditing(true)
    setEditingId(quiz.id)
    setFormData({
      imageUrl: quiz.imageUrl,
      questionText: quiz.questionText || '',
      optionA: quiz.options[0],
      optionB: quiz.options[1],
      optionC: quiz.options[2],
      optionD: quiz.options[3],
      correctAnswer: quiz.correctAnswer,
    })
  }

  const handleSave = () => {
    const newQuiz: ImageQuizData = {
      id: editingId || Date.now().toString(),
      imageUrl: formData.imageUrl,
      questionText: formData.questionText,
      options: [
        formData.optionA,
        formData.optionB,
        formData.optionC,
        formData.optionD,
      ],
      correctAnswer: formData.correctAnswer,
    }

    let updated: ImageQuizData[]
    if (editingId) {
      updated = quizzes.map((q) => (q.id === editingId ? newQuiz : q))
    } else {
      updated = [...quizzes, newQuiz]
    }

    setQuizzes(updated)
    saveToLocalStorage(updated)
    setIsEditing(false)
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบคำถามนี้?')) {
      const updated = quizzes.filter((q) => q.id !== id)
      setQuizzes(updated)
      saveToLocalStorage(updated)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingId(null)
  }

  if (isEditing) {
    return (
      <div className="w-full max-w-3xl mx-auto p-6">
        <Card className="p-6">
          <h2 className="text-2xl mb-6">
            {editingId ? 'แก้ไข' : 'เพิ่ม'}คำถาม Code Image
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>ข้อความคำถาม (ไม่บังคับ)</Label>
              <Input
                value={formData.questionText}
                onChange={(e) =>
                  setFormData({ ...formData, questionText: e.target.value })
                }
                placeholder="เช่น What is the output?"
              />
            </div>
            {/* Upload Image */}
            <div
              className="space-y-2"
              onDrop={(e) => {
                e.preventDefault()
                const file = e.dataTransfer.files[0]
                if (file && file.type.startsWith('image/')) {
                  const reader = new FileReader()
                  reader.onload = () => {
                    setFormData({
                      ...formData,
                      imageUrl: reader.result as string,
                    })
                  }
                  reader.readAsDataURL(file)
                }
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              <Label>อัปโหลดรูปภาพ</Label>

              {!formData.imageUrl ? (
                <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-purple-400 rounded-xl cursor-pointer hover:bg-purple-50/30 transition">
                  <p className="text-gray-500 mb-2">
                    ลากรูปมาวาง หรือคลิกเพื่อเลือกรูป
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file && file.type.startsWith('image/')) {
                        const reader = new FileReader()
                        reader.onload = () => {
                          setFormData({
                            ...formData,
                            imageUrl: reader.result as string,
                          })
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                  />
                </label>
              ) : (
                <div className="relative">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full max-h-60 object-contain rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, imageUrl: '' })}
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                  >
                    ลบรูป
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>ตัวเลือก A</Label>
                <Input
                  value={formData.optionA}
                  onChange={(e) =>
                    setFormData({ ...formData, optionA: e.target.value })
                  }
                  placeholder="ตัวเลือก A"
                />
              </div>
              <div className="space-y-2">
                <Label>ตัวเลือก B</Label>
                <Input
                  value={formData.optionB}
                  onChange={(e) =>
                    setFormData({ ...formData, optionB: e.target.value })
                  }
                  placeholder="ตัวเลือก B"
                />
              </div>
              <div className="space-y-2">
                <Label>ตัวเลือก C</Label>
                <Input
                  value={formData.optionC}
                  onChange={(e) =>
                    setFormData({ ...formData, optionC: e.target.value })
                  }
                  placeholder="ตัวเลือก C"
                />
              </div>
              <div className="space-y-2">
                <Label>ตัวเลือก D</Label>
                <Input
                  value={formData.optionD}
                  onChange={(e) =>
                    setFormData({ ...formData, optionD: e.target.value })
                  }
                  placeholder="ตัวเลือก D"
                />
              </div>
            </div>

            <div>
              <Label>คำตอบที่ถูกต้อง</Label>
              <select
                value={formData.correctAnswer}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    correctAnswer: parseInt(e.target.value),
                  })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value={0}>A</option>
                <option value={1}>B</option>
                <option value={2}>C</option>
                <option value={3}>D</option>
              </select>
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
        <h2 className="text-2xl">จัดการคำถาม Code Image</h2>
        <div className="flex gap-2">
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            เพิ่มคำถาม
          </Button>
          <Button onClick={onBack} variant="outline">
            กลับ
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {quizzes.length === 0 ? (
          <Card className="p-8 text-center text-gray-500">
            ยังไม่มีคำถาม กดปุ่ม "เพิ่มคำถาม" เพื่อสร้างคำถามใหม่
          </Card>
        ) : (
          quizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    {quiz.questionText && (
                      <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm">{quiz.questionText}</p>
                      </div>
                    )}
                    <img
                      src={quiz.imageUrl}
                      alt="Quiz"
                      className="w-full max-h-40 object-contain rounded-lg mb-4 border"
                    />
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {quiz.options.map((opt, i) => (
                        <div
                          key={i}
                          className={`p-2 rounded ${
                            i === quiz.correctAnswer
                              ? 'bg-green-100 border border-green-500'
                              : 'bg-gray-50'
                          }`}
                        >
                          <span className="font-semibold">
                            {['A', 'B', 'C', 'D'][i]}:
                          </span>{' '}
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onSelect(quiz)}
                    >
                      เล่น
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(quiz)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(quiz.id)}
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
