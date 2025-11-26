export interface ThemeConfig {
  mainBg: ThemeColor
  questionCodeBg: ThemeColor
  questionCodeTextColor: ThemeColor
  questionBg: ThemeColor
  questionTextColor: ThemeColor
  choiceBg: ThemeColor
  choiceTextColor: ThemeColor
  circleBg: ThemeColor
  circleTextColor: ThemeColor
  correctBg: ThemeColor
  correctTextColor: ThemeColor
}

export interface ThemeColor {
  type: "solid" | "gradient"
  color1: string       // ใช้ตอน solid และ gradient
  color2?: string      // ใช้เฉพาะ gradient
}
