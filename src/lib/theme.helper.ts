// import type { ThemeColor } from "./theme.tpye"

// export function toCSS(themeColor: ThemeColor) {
//   if (themeColor.type === "solid") {
//     return themeColor.color1
//   }
//   return `linear-gradient(135deg, ${themeColor.color1}, ${themeColor.color2})`
// }
import type { ThemeColor } from "./theme.type"

export function toCSS(themeColor: ThemeColor) {
  if (themeColor.type === "solid") {
    return {
      backgroundColor: themeColor.color1
    }
  }

  return {
    backgroundImage: `linear-gradient(135deg, ${themeColor.color1}, ${themeColor.color2})`
  }
}
