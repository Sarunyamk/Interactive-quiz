import { Code, Image, ListChecks, Users } from 'lucide-react'
import type { Mode } from './constant.theme'
import type { ThemeConfig } from './theme.type'

export const defaultTheme: ThemeConfig = {
  mainBg: { type: 'solid', color1: '#111827' },
  questionCodeBg: { type: 'solid', color1: '#1f2937' },
  questionCodeTextColor: { type: 'solid', color1: '#ffffff' },
  questionBg: { type: 'solid', color1: '#1f2937' },
  questionTextColor: { type: 'solid', color1: '#ffffff' },
  choiceBg: { type: 'solid', color1: '#ffffff' },
  choiceTextColor: { type: 'solid', color1: '#000000' },
  circleBg: { type: 'solid', color1: '#7c3aed' },
  circleTextColor: { type: 'solid', color1: '#ffffff' },
  correctBg: { type: 'solid', color1: '#10b981' },
  correctTextColor: { type: 'solid', color1: '#ffffff' },
}

export const menuButtons = [
  {
    id: 'code-quiz' as Mode,
    manageId: 'manage-code-quiz' as Mode,
    icon: Code,
    title: 'Code Quiz',
    description: 'คำถามโค้ด + ตัวเลือก',
    color: 'from-purple-500 to-blue-500',
  },
  {
    id: 'code-image' as Mode,
    manageId: 'manage-code-image' as Mode,
    icon: Image,
    title: 'Code Image',
    description: 'รูปภาพคำถาม + ตัวเลือก',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'junior-senior' as Mode,
    manageId: 'manage-junior-senior' as Mode,
    icon: Users,
    title: 'Junior vs Senior',
    description: 'เปรียบเทียบโค้ด Junior & Senior',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'multiple-quiz' as Mode,
    manageId: 'manage-multiple-quiz' as Mode,
    icon: ListChecks,
    title: 'Multiple Quiz',
    description: 'ชุดคำถามหลายข้อ',
    color: 'from-orange-500 to-amber-500',
  },
]
