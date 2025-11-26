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
export type Mode =
  | 'menu'
  | 'code-quiz'
  | 'code-image'
  | 'junior-senior'
  | 'multiple-quiz'
  | 'manage-code-quiz'
  | 'manage-code-image'
  | 'manage-junior-senior'
  | 'manage-multiple-quiz'
