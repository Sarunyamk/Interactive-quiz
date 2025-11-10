import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  ChevronUp,
  ChevronDown,
} from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'

interface QuizItem {
  questionText?: string
  question: string
  options: string[]
  correctAnswer: number
}

interface MultipleQuizSet {
  id: string
  name: string
  quizzes: QuizItem[]
}

interface ManageMultipleQuizProps {
  onSelect: (quizSet: MultipleQuizSet) => void
  onBack: () => void
}

export function ManageMultipleQuiz({
  onSelect,
  onBack,
}: ManageMultipleQuizProps) {
  const [quizSets, setQuizSets] = useState<MultipleQuizSet[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [setName, setSetName] = useState('')
  const [quizzes, setQuizzes] = useState<QuizItem[]>([])
  const [editingQuizIndex, setEditingQuizIndex] = useState<number | null>(null)
  const [quizFormData, setQuizFormData] = useState({
    questionText: '',
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 0,
  })

  useEffect(() => {
    const saved = localStorage.getItem('multipleQuizSets')
    if (saved) {
      setQuizSets(JSON.parse(saved))
    }
  }, [])

  const saveToLocalStorage = (data: MultipleQuizSet[]) => {
    localStorage.setItem('multipleQuizSets', JSON.stringify(data))
  }

  const handleAddSet = () => {
    setIsEditing(true)
    setEditingId(null)
    setSetName('')
    setQuizzes([])
    setEditingQuizIndex(null)
  }

  const handleEditSet = (quizSet: MultipleQuizSet) => {
    setIsEditing(true)
    setEditingId(quizSet.id)
    setSetName(quizSet.name)
    setQuizzes(quizSet.quizzes)
    setEditingQuizIndex(null)
  }

  const handleSaveSet = () => {
    if (!setName.trim() || quizzes.length === 0) {
      alert('กรุณาใส่ชื่อชุดคำถามและเพิ่มคำถามอย่างน้อย 1 ข้อ')
      return
    }

    const newSet: MultipleQuizSet = {
      id: editingId || Date.now().toString(),
      name: setName,
      quizzes: quizzes,
    }

    let updated: MultipleQuizSet[]
    if (editingId) {
      updated = quizSets.map((set) => (set.id === editingId ? newSet : set))
    } else {
      updated = [...quizSets, newSet]
    }

    setQuizSets(updated)
    saveToLocalStorage(updated)
    setIsEditing(false)
    setEditingId(null)
  }

  const handleDeleteSet = (id: string) => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบชุดคำถามนี้?')) {
      const updated = quizSets.filter((set) => set.id !== id)
      setQuizSets(updated)
      saveToLocalStorage(updated)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingId(null)
  }

  const handleAddQuiz = () => {
    setEditingQuizIndex(quizzes.length)
    setQuizFormData({
      questionText: '',
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: 0,
    })
  }

  const handleEditQuiz = (index: number) => {
    setEditingQuizIndex(index)
    const quiz = quizzes[index]
    setQuizFormData({
      questionText: quiz.questionText || '',
      question: quiz.question,
      optionA: quiz.options[0],
      optionB: quiz.options[1],
      optionC: quiz.options[2],
      optionD: quiz.options[3],
      correctAnswer: quiz.correctAnswer,
    })
  }

  const handleSaveQuiz = () => {
    const newQuiz: QuizItem = {
      questionText: quizFormData.questionText,
      question: quizFormData.question,
      options: [
        quizFormData.optionA,
        quizFormData.optionB,
        quizFormData.optionC,
        quizFormData.optionD,
      ],
      correctAnswer: quizFormData.correctAnswer,
    }

    if (editingQuizIndex !== null && editingQuizIndex < quizzes.length) {
      const updated = [...quizzes]
      updated[editingQuizIndex] = newQuiz
      setQuizzes(updated)
    } else {
      setQuizzes([...quizzes, newQuiz])
    }

    setEditingQuizIndex(null)
  }

  const handleDeleteQuiz = (index: number) => {
    setQuizzes(quizzes.filter((_, i) => i !== index))
  }

  const handleMoveQuiz = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= quizzes.length) return

    const updated = [...quizzes]
    ;[updated[index], updated[newIndex]] = [updated[newIndex], updated[index]]
    setQuizzes(updated)
  }

  if (isEditing) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <Card className="p-6">
          <h2 className="text-2xl mb-6">
            {editingId ? 'แก้ไข' : 'เพิ่ม'}ชุดคำถาม
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>ชื่อชุดคำถาม</Label>
              <Input
                value={setName}
                onChange={(e) => setSetName(e.target.value)}
                placeholder="เช่น JavaScript Quiz Set 1"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <Label>คำถามทั้งหมด ({quizzes.length})</Label>
                <Button onClick={handleAddQuiz} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  เพิ่มคำถาม
                </Button>
              </div>

              {editingQuizIndex !== null ? (
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <h3 className="mb-4">
                    {editingQuizIndex < quizzes.length ? 'แก้ไข' : 'เพิ่ม'}
                    คำถามที่ {editingQuizIndex + 1}
                  </h3>
                  <div className="space-y-3">
                    {/* ✅ ข้อความคำถาม (ธรรมดา) */}
                    <div className="space-y-2">
                      <Label>ข้อความคำถาม (ไม่บังคับ)</Label>
                      <Input
                        value={quizFormData.questionText || ''}
                        onChange={(e) =>
                          setQuizFormData({
                            ...quizFormData,
                            questionText: e.target.value,
                          })
                        }
                        placeholder="เช่น What is the output of this code?"
                      />
                    </div>

                    {/* ✅ โค้ดคำถาม */}
                    <div className="space-y-2">
                      <Label>โค้ดคำถาม</Label>
                      <Textarea
                        value={quizFormData.question}
                        onChange={(e) =>
                          setQuizFormData({
                            ...quizFormData,
                            question: e.target.value,
                          })
                        }
                        placeholder="ใส่โค้ดคำถาม..."
                        className="font-mono h-40"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      {['A', 'B', 'C', 'D'].map((letter) => (
                        <div key={letter} className="space-y-2">
                          <Label>ตัวเลือก {letter}</Label>
                          <Input
                            value={
                              quizFormData[
                                `option${letter}` as keyof typeof quizFormData
                              ] as string
                            }
                            onChange={(e) =>
                              setQuizFormData({
                                ...quizFormData,
                                [`option${letter}`]: e.target.value,
                              })
                            }
                            placeholder={`ตัวเลือก ${letter}`}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Label>คำตอบที่ถูกต้อง</Label>
                      <select
                        value={quizFormData.correctAnswer}
                        onChange={(e) =>
                          setQuizFormData({
                            ...quizFormData,
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

                    <div className="flex gap-2">
                      <Button
                        onClick={handleSaveQuiz}
                        size="sm"
                        className="flex-1"
                      >
                        บันทึกคำถาม
                      </Button>
                      <Button
                        onClick={() => setEditingQuizIndex(null)}
                        size="sm"
                        variant="outline"
                        className="flex-1"
                      >
                        ยกเลิก
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : (
                <div className="space-y-2">
                  {quizzes.map((quiz, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex flex-col gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleMoveQuiz(index, 'up')}
                            disabled={index === 0}
                          >
                            <ChevronUp className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleMoveQuiz(index, 'down')}
                            disabled={index === quizzes.length - 1}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm mb-2">
                            <span className="font-semibold">#{index + 1}</span>
                          </div>

                          {/* ✅ แสดงข้อความคำถาม */}
                          {quiz.questionText && (
                            <p className="text-sm text-gray-700 mb-2">
                              {quiz.questionText}
                            </p>
                          )}

                          <pre className="bg-gray-50 p-2 rounded text-xs mb-2 overflow-auto">
                            {quiz.question}
                          </pre>

                          <div className="text-xs text-gray-600">
                            คำตอบ: {['A', 'B', 'C', 'D'][quiz.correctAnswer]}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditQuiz(index)}
                          >
                            <Edit2 className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteQuiz(index)}
                          >
                            <Trash2 className="w-3 h-3 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button onClick={handleSaveSet} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                บันทึกชุดคำถาม
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
        <h2 className="text-2xl">จัดการชุดคำถามหลายข้อ</h2>
        <div className="flex gap-2">
          <Button onClick={handleAddSet}>
            <Plus className="w-4 h-4 mr-2" />
            เพิ่มชุดคำถาม
          </Button>
          <Button onClick={onBack} variant="outline">
            กลับ
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {quizSets.length === 0 ? (
          <Card className="p-8 text-center text-gray-500">
            ยังไม่มีชุดคำถาม กดปุ่ม "เพิ่มชุดคำถาม" เพื่อสร้างชุดคำถามใหม่
          </Card>
        ) : (
          quizSets.map((quizSet, index) => (
            <motion.div
              key={quizSet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl mb-2">{quizSet.name}</h3>
                    <p className="text-gray-600 mb-3">
                      {quizSet.quizzes.length} คำถาม
                    </p>
                    <div className="space-y-2">
                      {quizSet.quizzes.map((quiz, qIndex) => (
                        <div
                          key={qIndex}
                          className="bg-gray-50 p-3 rounded text-sm"
                        >
                          <span className="text-gray-500">#{qIndex + 1}</span>
                          {quiz.questionText && (
                            <p className="text-gray-700 mt-1">
                              {quiz.questionText}
                            </p>
                          )}
                          <pre className="text-xs mt-1 overflow-auto whitespace-pre-wrap">
                            {quiz.question.substring(0, 80)}
                            {quiz.question.length > 80 ? '...' : ''}
                          </pre>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onSelect(quizSet)}
                    >
                      เล่น
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditSet(quizSet)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteSet(quizSet.id)}
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
