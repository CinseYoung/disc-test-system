export interface DISCTraits {
  D: number
  I: number
  S: number
  C: number
}

export interface QuestionOption {
  text: string
  traits: DISCTraits
}

export interface Question {
  id: number
  options: QuestionOption[]
}

export interface DISCScores {
  D: number
  I: number
  S: number
  C: number
}

export type DISCType = 'D' | 'I' | 'S' | 'C'

export type AppState = 'welcome' | 'nameInput' | 'testing' | 'submitting' | 'result' | 'cooldown'

export interface TestSubmission {
  id: string
  candidate_name: string
  answers: Record<number, number>
  score_d: number
  score_i: number
  score_s: number
  score_c: number
  duration_seconds: number | null
  created_at: string
}

export interface ChartDataItem {
  label: string
  fullLabel: string
  score: number
  color: string
  bgColor: string
  textColor: string
}
