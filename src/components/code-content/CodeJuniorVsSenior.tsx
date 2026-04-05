import { toCSS } from '@/lib/theme.helper'
import type { ThemeConfig } from '@/lib/theme.type'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FadeInMotion } from '../FadeInUp'
import { ShikiCodeBlock } from '../ShikiCodeBlock'

interface JuniorVsSeniorData {
  juniorCode: string
  seniorCode: string
  language?: string
}

interface JuniorVsSeniorProps {
  codeData: JuniorVsSeniorData
  theme: ThemeConfig
}

export function CodeJuniorVsSenior({ codeData, theme }: JuniorVsSeniorProps) {
  const [juniorComplete, setJuniorComplete] = useState(false)

  return (
    <div className="relative w-full max-w-2xl mx-auto p-6 space-y-6">
      <FadeInMotion
        direction="left"
        className="rounded-2xl shadow-lg overflow-hidden"
        style={toCSS(theme.questionCodeBg)}
      >
        <div className="px-8 pt-6 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span className="text-yellow-500">Junior Developer</span>
          </div>
        </div>
        <ShikiCodeBlock
          code={codeData.juniorCode}
          language={codeData.language}
          animate
          delay={30}
          onComplete={() => setJuniorComplete(true)}
        />
      </FadeInMotion>

      {/* Senior Code Box */}
      {juniorComplete && (
        <FadeInMotion
          direction="left"
          className="rounded-2xl shadow-lg overflow-hidden"
          style={toCSS(theme.questionCodeBg)}
        >
          <div className="px-8 pt-6 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-yellow-500">Senior Developer</span>
            </div>
          </div>
          <ShikiCodeBlock
            code={codeData.seniorCode}
            language={codeData.language}
            animate
            delay={30}
          />
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
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl"
            style={{
              ...toCSS(theme.circleBg),
              ...toCSS(theme.circleTextColor, 'text'),
            }}
          >
            VS
          </div>
        </motion.div>
      )}
    </div>
  )
}
