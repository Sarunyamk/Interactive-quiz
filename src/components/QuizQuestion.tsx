import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Option {
  id: string
  text: string
}

interface QuizQuestionProps {
  question: string
  options: Option[]
  correctAnswer: string
}

export default function QuizQuestion({
  question,
  options,
  correctAnswer,
}: QuizQuestionProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [visibleOptions, setVisibleOptions] = useState<number>(0)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)

  // Typewriter effect for question
  useEffect(() => {
    setDisplayedText('')
    setShowOptions(false)
    setVisibleOptions(0)
    setCountdown(null)
    setShowAnswer(false)

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= question.length) {
        setDisplayedText(question.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
        // Start showing options after question is complete
        setTimeout(() => setShowOptions(true), 300)
      }
    }, 50) // Speed of typing

    return () => clearInterval(interval)
  }, [question])

  // Show options one by one
  useEffect(() => {
    if (showOptions && visibleOptions < options.length) {
      const timeout = setTimeout(() => {
        setVisibleOptions((prev) => prev + 1)
      }, 300)
      return () => clearTimeout(timeout)
    } else if (showOptions && visibleOptions === options.length) {
      // Start countdown after all options are shown
      setTimeout(() => setCountdown(10), 500)
    }
  }, [showOptions, visibleOptions, options.length])

  // Countdown timer
  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timeout = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timeout)
    } else if (countdown === 0) {
      // Show answer when countdown reaches 0
      setShowAnswer(true)
    }
  }, [countdown])

  return (
    <div className="w-full max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 rounded-2xl p-8 mb-6 shadow-2xl border border-gray-700"
      >
        <div className="mb-4">
          <span className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-full">
            Question
          </span>
        </div>
        <pre className="text-white text-xl whitespace-pre-wrap font-mono">
          {displayedText}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-2 h-6 bg-green-400 ml-1"
          />
        </pre>
      </motion.div>

      {/* Options Box */}
      <motion.div className="space-y-3 mb-6">
        {options.map((option, index) => (
          <AnimatePresence key={option.id}>
            {visibleOptions > index && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <motion.div
                  animate={
                    showAnswer && option.id === correctAnswer
                      ? {
                          scale: [1, 1.05, 1],
                          borderColor: ['#4ade80', '#22c55e', '#4ade80'],
                        }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    showAnswer && option.id === correctAnswer
                      ? 'bg-green-500 border-green-400 shadow-lg shadow-green-500/50'
                      : 'bg-gray-800 border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                        showAnswer && option.id === correctAnswer
                          ? 'bg-white text-green-600'
                          : 'bg-purple-600 text-white'
                      }`}
                    >
                      {option.id}
                    </span>
                    <span
                      className={`text-xl ${
                        showAnswer && option.id === correctAnswer
                          ? 'text-white'
                          : 'text-gray-200'
                      }`}
                    >
                      {option.text}
                    </span>
                  </div>
                </motion.div>

                {/* Celebration Effect */}
                {showAnswer && option.id === correctAnswer && (
                  <>
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{
                          opacity: 1,
                          scale: 0,
                          x: 0,
                          y: 0,
                        }}
                        animate={{
                          opacity: 0,
                          scale: 1,
                          x: (Math.random() - 0.5) * 200,
                          y: (Math.random() - 0.5) * 200,
                        }}
                        transition={{
                          duration: 1,
                          delay: i * 0.02,
                        }}
                        className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full pointer-events-none"
                        style={{
                          background: [
                            '#fbbf24',
                            '#f59e0b',
                            '#ec4899',
                            '#8b5cf6',
                            '#3b82f6',
                          ][i % 5],
                        }}
                      />
                    ))}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </motion.div>

      {/* Countdown Timer */}
      <AnimatePresence>
        {countdown !== null && countdown > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="flex items-center justify-center"
          >
            <motion.div
              animate={{
                scale: countdown <= 3 ? [1, 1.3, 1] : 1,
                rotate: countdown <= 3 ? [0, -5, 5, 0] : 0,
                backgroundColor:
                  countdown <= 3
                    ? ['#ef4444', '#b91c1c', '#ef4444']
                    : ['#fbbf24', '#f59e0b', '#fbbf24'],
                boxShadow:
                  countdown <= 3
                    ? [
                        '0 0 30px #ef4444',
                        '0 0 50px #b91c1c',
                        '0 0 30px #ef4444',
                      ]
                    : [
                        '0 0 20px #fbbf24',
                        '0 0 30px #f59e0b',
                        '0 0 20px #fbbf24',
                      ],
              }}
              transition={{
                duration: countdown <= 3 ? 0.5 : 1,
                repeat: countdown <= 3 ? Infinity : 0,
              }}
              className={`relative w-28 h-28 rounded-full flex items-center justify-center text-4xl font-bold`}
            >
              <svg className="absolute inset-0 w-28 h-28 -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="46"
                  stroke="white"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${(countdown / 10) * 289} 289`}
                  className="transition-all duration-1000"
                />
              </svg>
              <span className="text-white z-10">{countdown}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Answer Revealed Message */}
      <AnimatePresence>
        {showAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center"
          >
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
              <span className="font-bold underline">{correctAnswer}</span> ! ✨
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
