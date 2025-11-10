import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TypewriterText } from '../TypewriterText'
import { Confetti } from '../Confetti'
import { CountdownTimer } from '../CountdownTimer'
import { FadeInMotion } from '../FadeInUp'

interface QuizItem {
  questionText?: string
  question: string
  options: string[]
  correctAnswer: number
}

interface MultipleQuizProps {
  quizzes: QuizItem[]
}

export function CodeMultipleQuiz({ quizzes }: MultipleQuizProps) {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [questionComplete, setQuestionComplete] = useState(false)
  const [showOptions, setShowOptions] = useState(0)
  const [showTimer, setShowTimer] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [celebrate, setCelebrate] = useState(false)
  const [nextCountdown, setNextCountdown] = useState<number | null>(null)
  const [showOverlay, setShowOverlay] = useState(false)

  const currentQuiz = quizzes[currentQuizIndex]

  useEffect(() => {
    setQuestionComplete(false)
    setShowOptions(0)
    setShowTimer(false)
    setShowAnswer(false)
    setCelebrate(false)
  }, [currentQuizIndex])

  useEffect(() => {
    if (questionComplete && showOptions < 4) {
      const timer = setTimeout(() => {
        setShowOptions((prev) => prev + 1)
      }, 300)
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

    setTimeout(() => {
      setShowOverlay(true)

      setTimeout(() => {
        if (currentQuizIndex < quizzes.length - 1) {
          setNextCountdown(3)
        }
      }, 500)
    }, 3000)
  }

  useEffect(() => {
    if (nextCountdown === null) return

    if (nextCountdown > 0) {
      const timer = setTimeout(
        () => setNextCountdown((prev) => (prev ?? 0) - 1),
        1000
      )
      return () => clearTimeout(timer)
    } else if (nextCountdown === 0) {
      setNextCountdown(null)
      setShowOverlay(false)
      setCurrentQuizIndex((prev) => prev + 1)
    }
  }, [nextCountdown])

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-center gap-2 mb-4">
        {quizzes.map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 rounded-full ${
              index === currentQuizIndex
                ? 'bg-yellow-500 w-12'
                : index < currentQuizIndex
                ? 'bg-green-500 w-8'
                : 'bg-gray-300 w-8'
            }`}
            initial={{ width: 0 }}
            animate={{
              width: index === currentQuizIndex ? 48 : 32,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      <div className="text-center text-white mb-4">
        คำถามที่ {currentQuizIndex + 1} จาก {quizzes.length}
      </div>

      <FadeInMotion
        direction="left"
        key={currentQuizIndex}
        className="bg-gray-900 rounded-2xl p-8 shadow-lg text-white"
      >
        <div className="font-mono text-lg">
          <TypewriterText
            text={currentQuiz.question}
            delay={30}
            onComplete={() => setQuestionComplete(true)}
          />
        </div>
      </FadeInMotion>

      {questionComplete && currentQuiz.questionText && (
        <FadeInMotion
          direction="up"
          className="text-center text-xl text-white bg-gray-900 backdrop-blur rounded-xl p-4 shadow-md"
        >
          {currentQuiz.questionText}
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
                      showAnswer && index === currentQuiz.correctAnswer
                        ? 1.05
                        : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    scale: { duration: 0.5, delay: 0 },
                  }}
                  className={`relative p-6 rounded-xl shadow-md transition-all ${
                    showAnswer && index === currentQuiz.correctAnswer
                      ? 'bg-linear-to-r from-green-400 to-emerald-500 text-white'
                      : 'bg-white hover:shadow-lg'
                  }`}
                >
                  {showAnswer &&
                    index === currentQuiz.correctAnswer &&
                    celebrate && <Confetti />}
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        showAnswer && index === currentQuiz.correctAnswer
                          ? 'bg-white text-green-500'
                          : 'bg-linear-to-br from-purple-500 to-blue-500 text-white'
                      }`}
                    >
                      {letter}
                    </div>
                    <div className="flex-1 font-mono">
                      {currentQuiz.options[index]}
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
          <div>
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
                  {['A', 'B', 'C', 'D'][currentQuiz.correctAnswer]}
                </span>{' '}
                ! ✨
              </motion.div>
            </FadeInMotion>

            {/* ✅ overlay countdown */}
            <AnimatePresence>
              {showOverlay && currentQuizIndex < quizzes.length - 1 && (
                <motion.div
                  key="next-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="text-white text-6xl font-bold text-center"
                  >
                    Next question in <br />
                    <span className="text-yellow-400 text-8xl">
                      {nextCountdown ?? 3}
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ✅ overlay ตอนจบ */}
            <AnimatePresence>
              {showOverlay && currentQuizIndex === quizzes.length - 1 && (
                <motion.div
                  key="final-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 150, damping: 18 }}
                    className="text-center text-white"
                  >
                    <div className="text-5xl font-bold mb-4">
                      🎉 How many questions did you get right ?
                    </div>
                    <div className="text-2xl text-gray-200">
                      Thank you for playing 🎯
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
