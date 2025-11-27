import type { BaseMode, Mode } from './constant.theme'
import type { ThemeColor } from './theme.type'

export function toCSS(themeColor: ThemeColor) {
  if (themeColor.type === 'solid') {
    return {
      backgroundColor: themeColor.color1,
    }
  }

  return {
    backgroundImage: `linear-gradient(135deg, ${themeColor.color1}, ${themeColor.color2})`,
  }
}

export function getBaseMode(mode: Mode): BaseMode | null {
  if (mode === 'menu') return null
  return mode.replace('manage-', '') as BaseMode
}
