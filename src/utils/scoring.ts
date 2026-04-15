import { DISC_QUESTIONS } from '../data/questions'
import type { DISCScores, DISCType, ChartDataItem } from '../types'

export function calculateScores(answers: Record<number, number>): DISCScores {
  const scores: DISCScores = { D: 0, I: 0, S: 0, C: 0 }

  DISC_QUESTIONS.forEach((q) => {
    const selectedIndex = answers[q.id]
    if (selectedIndex !== undefined) {
      const traits = q.options[selectedIndex].traits
      scores.D += traits.D
      scores.I += traits.I
      scores.S += traits.S
      scores.C += traits.C
    }
  })

  return scores
}

export function getDominantType(scores: DISCScores): DISCType {
  const entries = Object.entries(scores) as [DISCType, number][]
  return entries.reduce((max, curr) => (curr[1] > max[1] ? curr : max))[0]
}

const TYPE_META: Record<DISCType, { label: string; fullLabel: string; color: string; bgColor: string; textColor: string }> = {
  D: { label: 'D', fullLabel: 'D (支配型)', color: 'bg-red-500', bgColor: 'bg-red-50', textColor: 'text-red-600' },
  I: { label: 'I', fullLabel: 'I (影响型)', color: 'bg-yellow-400', bgColor: 'bg-yellow-50', textColor: 'text-yellow-600' },
  S: { label: 'S', fullLabel: 'S (稳健型)', color: 'bg-green-500', bgColor: 'bg-green-50', textColor: 'text-green-600' },
  C: { label: 'C', fullLabel: 'C (服从型)', color: 'bg-blue-500', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
}

export function buildChartData(scores: DISCScores): ChartDataItem[] {
  return (['D', 'I', 'S', 'C'] as DISCType[]).map((type) => ({
    label: TYPE_META[type].label,
    fullLabel: TYPE_META[type].fullLabel,
    score: scores[type],
    color: TYPE_META[type].color,
    bgColor: TYPE_META[type].bgColor,
    textColor: TYPE_META[type].textColor,
  }))
}

export function getDominantLabel(scores: DISCScores): string {
  const type = getDominantType(scores)
  return TYPE_META[type].fullLabel
}
