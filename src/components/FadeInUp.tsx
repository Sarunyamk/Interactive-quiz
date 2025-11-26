import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right'

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  distance?: number
  direction?: Direction
  className?: string
  style? : React.CSSProperties
}

export function FadeInMotion({
  children,
  delay = 0.2,
  duration = 0.5,
  distance = 50,
  direction = 'up',
  className = '',
  style
}: FadeInProps) {
  const getOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance }
      case 'down':
        return { y: -distance }
      case 'left':
        return { x: distance }
      case 'right':
        return { x: -distance }
      default:
        return {}
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...getOffset() }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
