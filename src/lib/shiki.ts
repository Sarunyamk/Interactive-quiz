import { type HighlighterCore, createHighlighter } from 'shiki'

// Singleton pattern — createHighlighter() โหลด WASM + themes + langs หนัก
// ต้องสร้างครั้งเดียว cache ไว้ใน module scope
let highlighterPromise: Promise<HighlighterCore> | null = null

const SUPPORTED_LANGS = [
  'javascript',
  'typescript',
  'tsx',
  'jsx',
  'css',
  'html',
  'json',
  'bash',
  'python',
  'go',
] as const

export type SupportedLanguage = (typeof SUPPORTED_LANGS)[number]

function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['dark-plus'],
      langs: [...SUPPORTED_LANGS],
    })
  }
  return highlighterPromise
}

export async function highlightCode(
  code: string,
  language: string = 'javascript'
): Promise<string> {
  const highlighter = await getHighlighter()

  const validLangs = highlighter.getLoadedLanguages()
  const lang = validLangs.includes(language) ? language : 'javascript'

  return highlighter.codeToHtml(code, {
    lang,
    theme: 'dark-plus',
  })
}
