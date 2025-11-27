import { motion } from 'framer-motion'
import { Settings } from 'lucide-react'
import { useEffect, useState } from 'react'

import { CodeImage } from './components/code-content/CodeImage'
import { CodeJuniorVsSenior } from './components/code-content/CodeJuniorVsSenior'
import { CodeMultipleQuiz } from './components/code-content/CodeMultipleQuiz'
import { CodeQuiz } from './components/code-content/CodeQuiz'
import { ManageCodeImage } from './components/code-manage/ManageCodeImage'
import { ManageCodeQuiz } from './components/code-manage/ManageCodeQuiz'
import { ManageJuniorSenior } from './components/code-manage/ManageJuniorSenior'
import { ManageMultipleQuiz } from './components/code-manage/ManageMultipleQuiz'
import { Button } from './components/ui/button'
import { THEME_MAP, type Mode } from './lib/constant.theme'
import { defaultTheme, menuButtons } from './lib/data'
import { toCSS } from './lib/theme.helper'
import type { ThemeConfig } from './lib/theme.type'
import { cn } from './lib/utils'
import { Gradients } from './style'

export default function App() {
  const [mode, setMode] = useState<Mode>('menu')
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null)
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme)

  const themeKey = THEME_MAP[mode]

  useEffect(() => {
    const saved = localStorage.getItem(themeKey)
    if (saved) setTheme(JSON.parse(saved))
  }, [mode])

  useEffect(() => {
    localStorage.setItem(themeKey, JSON.stringify(theme))
  }, [theme, mode])

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
          theme={theme}
          setTheme={setTheme}
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
          theme={theme}
          setTheme={setTheme}
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
          theme={theme}
          setTheme={setTheme}
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
          theme={theme}
          setTheme={setTheme}
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
      className="min-h-screen flex items-center justify-center p-4"
      style={toCSS(theme.mainBg)}
    >
      <div className="w-full max-w-7xl mx-auto">
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
          {mode === 'code-quiz' && (
            <CodeQuiz quizData={selectedQuiz} theme={theme} />
          )}
          {mode === 'code-image' && (
            <CodeImage quizData={selectedQuiz} theme={theme} />
          )}
          {mode === 'junior-senior' && (
            <CodeJuniorVsSenior codeData={selectedQuiz} theme={theme}/>
          )}
          {mode === 'multiple-quiz' && (
            <CodeMultipleQuiz quizzes={selectedQuiz?.quizzes} theme={theme} />
          )}
        </motion.div>
      </div>
    </div>
  )
}
