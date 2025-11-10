import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Image, Users, ListChecks, Settings } from 'lucide-react'

import { Button } from './components/ui/button'
import { ManageCodeQuiz } from './components/code-manage/ManageCodeQuiz'
import { ManageCodeImage } from './components/code-manage/ManageCodeImage'
import { ManageJuniorSenior } from './components/code-manage/ManageJuniorSenior'
import { ManageMultipleQuiz } from './components/code-manage/ManageMultipleQuiz'
import { CodeQuiz } from './components/code-content/CodeQuiz'
import { CodeImage } from './components/code-content/CodeImage'
import { CodeJuniorVsSenior } from './components/code-content/CodeJuniorVsSenior'
import { CodeMultipleQuiz } from './components/code-content/CodeMultipleQuiz'
import { Gradients } from './style'
import { cn } from './lib/utils'

type Mode =
  | 'menu'
  | 'code-quiz'
  | 'code-image'
  | 'junior-senior'
  | 'multiple-quiz'
  | 'manage-code-quiz'
  | 'manage-code-image'
  | 'manage-junior-senior'
  | 'manage-multiple-quiz'

const menuButtons = [
  {
    id: 'code-quiz' as Mode,
    manageId: 'manage-code-quiz' as Mode,
    icon: Code,
    title: 'Code Quiz',
    description: 'คำถามโค้ด + ตัวเลือก',
    color: 'from-purple-500 to-blue-500',
  },
  {
    id: 'code-image' as Mode,
    manageId: 'manage-code-image' as Mode,
    icon: Image,
    title: 'Code Image',
    description: 'รูปภาพคำถาม + ตัวเลือก',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'junior-senior' as Mode,
    manageId: 'manage-junior-senior' as Mode,
    icon: Users,
    title: 'Junior vs Senior',
    description: 'เปรียบเทียบโค้ด Junior & Senior',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'multiple-quiz' as Mode,
    manageId: 'manage-multiple-quiz' as Mode,
    icon: ListChecks,
    title: 'Multiple Quiz',
    description: 'ชุดคำถามหลายข้อ',
    color: 'from-orange-500 to-amber-500',
  },
]

export default function App() {
  const [mode, setMode] = useState<Mode>('menu')
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null)

  if (mode === 'menu') {
    return (
      <div
        className={cn(
          'min-h-screen flex items-center justify-center p-4',
          Gradients.cool
        )}
      >
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl mb-4">🎬 TikTok Quiz Maker</h1>
            <p className="text-gray-600 text-xl">
              เลือกรูปแบบคำถามที่คุณต้องการสร้าง
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuButtons.map((button, index) => {
              const Icon = button.icon
              return (
                <motion.div
                  key={button.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div
                      className={`w-16 h-16 rounded-xl bg-linear-to-br ${button.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl mb-2">{button.title}</h2>
                    <p className="text-gray-600 mb-4">{button.description}</p>
                    <div className="flex gap-2 justify-end">
                      <Button
                        onClick={() => setMode(button.manageId)}
                        variant="outline"
                        size="sm"
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  if (mode === 'manage-code-quiz') {
    return (
      <div
        className={cn(
          'min-h-screen flex items-center justify-center p-4',
          Gradients.cool
        )}
      >
        <ManageCodeQuiz
          onSelect={(quiz) => {
            setSelectedQuiz(quiz)
            setMode('code-quiz')
          }}
          onBack={() => setMode('menu')}
        />
      </div>
    )
  }

  if (mode === 'manage-code-image') {
    return (
      <div
        className={cn(
          'min-h-screen flex items-center justify-center p-4',
          Gradients.cool
        )}
      >
        <ManageCodeImage
          onSelect={(quiz) => {
            setSelectedQuiz(quiz)
            setMode('code-image')
          }}
          onBack={() => setMode('menu')}
        />
      </div>
    )
  }

  if (mode === 'manage-junior-senior') {
    return (
      <div
        className={cn(
          'min-h-screen flex items-center justify-center p-4',
          Gradients.cool
        )}
      >
        <ManageJuniorSenior
          onSelect={(data) => {
            setSelectedQuiz(data)
            setMode('junior-senior')
          }}
          onBack={() => setMode('menu')}
        />
      </div>
    )
  }

  if (mode === 'manage-multiple-quiz') {
    return (
      <div
        className={cn(
          'min-h-screen flex items-center justify-center p-4',
          Gradients.cool
        )}
      >
        <ManageMultipleQuiz
          onSelect={(quizSet) => {
            setSelectedQuiz(quizSet)
            setMode('multiple-quiz')
          }}
          onBack={() => setMode('menu')}
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center p-4',
        Gradients.cool
      )}
    >
      <div className="w-full max-w-7xl">
        <div className="mb-10">
          <Button
            onClick={() => setMode('menu')}
            variant="outline"
            className="mb-4"
          >
            ← กลับไปเมนู
          </Button>
        </div>

        <motion.div
          key={mode + (selectedQuiz?.id || 'default')}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {mode === 'code-quiz' && <CodeQuiz quizData={selectedQuiz} />}
          {mode === 'code-image' && <CodeImage quizData={selectedQuiz} />}
          {mode === 'junior-senior' && (
            <CodeJuniorVsSenior codeData={selectedQuiz} />
          )}
          {mode === 'multiple-quiz' && (
            <CodeMultipleQuiz quizzes={selectedQuiz?.quizzes} />
          )}
        </motion.div>
      </div>
    </div>
  )
}
