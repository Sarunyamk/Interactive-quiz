export const THEME_MAP: Record<Mode, string> = {
  "manage-code-quiz": "theme-manage-code-quiz",
  "code-quiz": "theme-manage-code-quiz",

  "manage-code-image": "theme-manage-code-image",
  "code-image": "theme-manage-code-image",

  "manage-junior-senior": "theme-manage-junior-senior",
  "junior-senior": "theme-manage-junior-senior",

  "manage-multiple-quiz": "theme-manage-multiple-quiz",
  "multiple-quiz": "theme-manage-multiple-quiz",

  // menu ไม่ต้องใช้ theme
  "menu": "theme-menu",
};

export const THEME_KEYS_BY_MODE = {
  "code-quiz": [
    "mainBg",
    "questionCodeBg",
    "questionCodeTextColor",
    "questionBg",
    "questionTextColor",
    "choiceBg",
    "choiceTextColor",
    "circleBg",
    "circleTextColor",
    "correctBg",
    "correctTextColor"
  ],

  "multiple-quiz": [
    "mainBg",
    "questionCodeBg",
    "questionCodeTextColor",
    "questionBg",
    "questionTextColor",
    "choiceBg",
    "choiceTextColor",
    "circleBg",
    "circleTextColor",
    "correctBg",
    "correctTextColor"
  ],

  "code-image": [
    "mainBg",
    "questionCodeBg",
    "questionBg",
    "questionTextColor",
    "choiceBg",
    "choiceTextColor",
    "correctBg",
    "correctTextColor",
    "circleBg",
    "circleTextColor"
  ],

  "junior-senior": [
    "mainBg",
    "questionCodeBg",        // ใช้เป็นพื้นหลัง code box
    "questionCodeTextColor", // ใช้สำหรับ text code
    "circleBg",
    "circleTextColor"
  ],
}as const

export type BaseMode = keyof typeof THEME_KEYS_BY_MODE
export type ThemeKey = (typeof THEME_KEYS_BY_MODE)[BaseMode][number]

// export type Mode =
//   | 'menu'
//   | 'code-quiz'
//   | 'code-image'
//   | 'junior-senior'
//   | 'multiple-quiz'
//   | 'manage-code-quiz'
//   | 'manage-code-image'
//   | 'manage-junior-senior'
//   | 'manage-multiple-quiz'

export type Mode =
  | 'menu'
  | BaseMode
  | `manage-${BaseMode}`
