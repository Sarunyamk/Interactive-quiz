import { toCSS } from '@/lib/theme.helper'
import type { ThemeConfig } from '@/lib/theme.type'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Confetti } from '../Confetti'
import { CountdownTimer } from '../CountdownTimer'
import { FadeInMotion } from '../FadeInUp'
import { TypewriterText } from '../TypewriterText'

interface QuizData {
  question: string
  questionText?: string
  options: string[]
  correctAnswer: number
}

interface CodeQuizProps {
  quizData: QuizData
  theme: ThemeConfig
}

export function CodeQuiz({ quizData, theme }: CodeQuizProps) {
  const [questionComplete, setQuestionComplete] = useState(false)
  const [showOptions, setShowOptions] = useState(0)
  const [showTimer, setShowTimer] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [celebrate, setCelebrate] = useState(false)

  useEffect(() => {
    setQuestionComplete(false)
    setShowOptions(0)
    setShowTimer(false)
    setShowAnswer(false)
    setCelebrate(false)
  }, [quizData])

  useEffect(() => {
    if (questionComplete && showOptions < 4) {
      const timer = setTimeout(() => {
        setShowOptions((prev) => prev + 1)
      }, 500)
      return () => clearTimeout(timer)
    } else if (questionComplete && showOptions === 4) {
      const timer = setTimeout(() => {
        setShowTimer(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [questionComplete, showOptions])

  const handleTimerComplete = () => {
    setShowAnswer(true)
    setCelebrate(true)
  }
  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <FadeInMotion
        direction="left"
        className="rounded-2xl p-8 shadow-lg "
        style={{
          ...toCSS(theme.questionCodeBg),
          ...toCSS(theme.questionCodeTextColor),
        }}
      >
        <div className="font-mono text-lg">
          <TypewriterText
            text={quizData.question}
            delay={50}
            onComplete={() => setQuestionComplete(true)}
          />
        </div>
      </FadeInMotion>

      {/* Question Text */}
      {questionComplete && quizData.questionText && (
        <FadeInMotion
          className="text-center text-xl backdrop-blur rounded-xl p-4 shadow-md"
          style={{
            ...toCSS(theme.questionBg),
            ...toCSS(theme.questionTextColor),
          }}
        >
          {quizData.questionText}
        </FadeInMotion>
      )}

      {/* Options */}
      {questionComplete && (
        <div className="grid grid-cols-1 gap-4">
          {['A', 'B', 'C', 'D'].map(
            (letter, index) =>
              index < showOptions && (
                <motion.div
                  key={letter}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale:
                      showAnswer && index === quizData.correctAnswer ? 1.05 : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    scale: { duration: 0.5, delay: 0 },
                  }}
                  style={{
                    ...(showAnswer && index === quizData.correctAnswer
                      ? toCSS(theme.correctBg)
                      : toCSS(theme.choiceBg)),
                    ...(showAnswer && index === quizData.correctAnswer
                      ? toCSS(theme.correctTextColor)
                      : toCSS(theme.choiceTextColor)),
                  }}
                  className="relative p-6 rounded-xl shadow-md transition-all"
                >
                  {showAnswer &&
                    index === quizData.correctAnswer &&
                    celebrate && <Confetti />}
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center`}
                      style={{
                        ...toCSS(theme.circleBg),
                        ...toCSS(theme.circleTextColor),
                      }}
                    >
                      {letter}A
                    </div>
                    <div className="flex-1 font-mono">
                      {quizData.options[index]}
                    </div>
                  </div>
                </motion.div>
              )
          )}
        </div>
      )}

      {/* Timer */}
      {showTimer && !showAnswer && (
        <CountdownTimer duration={10} onComplete={handleTimerComplete} />
      )}

      <AnimatePresence>
        {showAnswer && (
          <FadeInMotion className="mt-6 text-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: 3,
              }}
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-full shadow-lg animate-bounce"
            >
              ✨ Correct Answer is{' '}
              <span className="font-bold underline">
                {['A', 'B', 'C', 'D'][quizData.correctAnswer]}
              </span>{' '}
              ! ✨
            </motion.div>
          </FadeInMotion>
        )}
      </AnimatePresence>
    </div>
  )
}
