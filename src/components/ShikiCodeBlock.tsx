import { highlightCode } from '@/lib/shiki'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

interface ShikiCodeBlockProps {
  code: string
  language?: string
  animate?: boolean
  delay?: number
  onComplete?: () => void
  className?: string
  style?: React.CSSProperties
}

/**
 * Parse Shiki HTML output into an array of "character tokens",
 * each carrying its own inline style from Shiki.
 *
 * Shiki output structure:
 *   <pre ...><code><span class="line"><span style="color:...">text</span>...</span>\n...</code></pre>
 *
 * We walk the DOM, extract every visible character,
 * and tag it with the computed style so we can reveal them one-by-one
 * while keeping syntax colors.
 */
interface CharToken {
  char: string
  style: string // inline style from Shiki span (e.g. "color:#569CD6")
}

function parseShikiHtml(html: string): CharToken[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const codeEl = doc.querySelector('code')
  if (!codeEl) return []

  const tokens: CharToken[] = []

  function walk(node: Node, inheritedStyle: string) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? ''
      for (const ch of text) {
        tokens.push({ char: ch, style: inheritedStyle })
      }
      return
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement
      // Pick up style from this element, fall back to inherited
      const style = el.getAttribute('style') ?? inheritedStyle
      for (const child of Array.from(el.childNodes)) {
        walk(child, style)
      }
    }
  }

  for (const child of Array.from(codeEl.childNodes)) {
    walk(child, '')
  }

  return tokens
}

export function ShikiCodeBlock({
  code,
  language = 'javascript',
  animate = true,
  delay = 30,
  onComplete,
  className = '',
  style,
}: ShikiCodeBlockProps) {
  const [tokens, setTokens] = useState<CharToken[]>([])
  const [bgColor, setBgColor] = useState('#1e1e1e')
  const [visibleCount, setVisibleCount] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const completeCalled = useRef(false)

  // Highlight code with Shiki → parse into char tokens
  useEffect(() => {
    completeCalled.current = false
    setVisibleCount(0)
    setIsReady(false)

    highlightCode(code, language).then((html) => {
      // Extract background color from Shiki <pre> tag
      const bgMatch = html.match(/background-color:\s*([^;"]+)/)
      if (bgMatch) setBgColor(bgMatch[1])

      const parsed = parseShikiHtml(html)
      setTokens(parsed)

      if (!animate) {
        setVisibleCount(parsed.length)
      }
      setIsReady(true)
    })
  }, [code, language, animate])

  // Typewriter: reveal one character at a time
  useEffect(() => {
    if (!isReady || !animate || tokens.length === 0) return

    if (visibleCount < tokens.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1)
      }, delay)
      return () => clearTimeout(timer)
    }

    if (visibleCount >= tokens.length && !completeCalled.current) {
      completeCalled.current = true
      onComplete?.()
    }
  }, [isReady, animate, visibleCount, tokens.length, delay, onComplete])

  // Build the visible JSX from tokens
  const rendered = useMemo(() => {
    const visible = tokens.slice(0, visibleCount)

    // Group consecutive chars with same style into spans for efficiency
    const groups: { style: string; text: string }[] = []
    for (const t of visible) {
      const last = groups[groups.length - 1]
      if (last && last.style === t.style) {
        last.text += t.char
      } else {
        groups.push({ style: t.style, text: t.char })
      }
    }

    return groups.map((g, i) => (
      <span key={i} style={cssStringToObject(g.style)}>
        {g.text}
      </span>
    ))
  }, [tokens, visibleCount])

  if (!isReady) {
    return (
      <div className={className} style={style}>
        <pre className="whitespace-pre-wrap font-mono text-sm p-4 rounded-lg bg-[#1e1e1e] text-[#d4d4d4]">
          {code.slice(0, visibleCount)}
        </pre>
      </div>
    )
  }

  const isTyping = animate && visibleCount < tokens.length

  return (
    <motion.div
      className={`shiki-code-block ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <pre
        className="whitespace-pre-wrap wrap-break-word font-mono text-sm leading-relaxed p-6 m-0 rounded-xl"
        style={{ backgroundColor: bgColor }}
      >
        <code>
          {rendered}
          {isTyping && (
            <span className="animate-pulse text-green-400">|</span>
          )}
        </code>
      </pre>
    </motion.div>
  )
}

/** Convert CSS inline string like "color:#569CD6;font-style:italic" → CSSProperties */
function cssStringToObject(css: string): React.CSSProperties {
  if (!css) return {}
  const result: Record<string, string> = {}
  for (const part of css.split(';')) {
    const [key, value] = part.split(':')
    if (key && value) {
      // Convert kebab-case to camelCase
      const camelKey = key.trim().replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
      result[camelKey] = value.trim()
    }
  }
  return result
}
