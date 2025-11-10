import { useState } from 'react'
import { motion } from 'framer-motion'
import { TypewriterText } from '../TypewriterText'
import { FadeInMotion } from '../FadeInUp'

interface JuniorVsSeniorData {
  juniorCode: string
  seniorCode: string
}

interface JuniorVsSeniorProps {
  codeData: JuniorVsSeniorData
}

export function CodeJuniorVsSenior({ codeData }: JuniorVsSeniorProps) {
  const [juniorComplete, setJuniorComplete] = useState(false)

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <FadeInMotion
        direction="left"
        className="bg-gray-900 rounded-2xl p-8 shadow-lg text-white"
      >
        <div className="mb-4 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
          <span className="text-yellow-500">Junior Developer</span>
        </div>
        <div className="font-mono text-lg">
          <TypewriterText
            text={codeData.juniorCode}
            delay={30}
            onComplete={() => setJuniorComplete(true)}
          />
        </div>
      </FadeInMotion>

      {/* Senior Code Box */}
      {juniorComplete && (
        <FadeInMotion
          direction="left"
          className="bg-gray-900 rounded-2xl p-8 shadow-lg text-white"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-yellow-500">Senior Developer</span>
          </div>
          <div className="font-mono text-lg">
            <TypewriterText text={codeData.seniorCode} delay={30} />
          </div>
        </FadeInMotion>
      )}

      {/* VS Badge */}
      {juniorComplete && (
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.8 }}
        >
          <div className="w-16 h-16 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-xl">
            VS
          </div>
        </motion.div>
      )}
    </div>
  )
}
