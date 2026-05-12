import { useCallback } from 'react'

const DRAFT_KEY = 'disc_test_draft'

export interface DraftData {
  answers: Record<number, number>
  candidateName: string
  currentQuestionIndex: number
  timestamp: number
}

export function useAutoSave() {
  // 保存草稿
  const saveDraft = useCallback((answers: Record<number, number>, candidateName: string, currentQuestionIndex: number) => {
    const draft: DraftData = {
      answers,
      candidateName,
      currentQuestionIndex,
      timestamp: Date.now(),
    }
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
  }, [])

  // 获取草稿
  const getDraft = useCallback((): DraftData | null => {
    const draftStr = localStorage.getItem(DRAFT_KEY)
    if (!draftStr) return null

    try {
      const draft = JSON.parse(draftStr) as DraftData
      // 检查草稿是否有效（必须包含 answers 和 candidateName）
      if (draft.answers && draft.candidateName !== undefined) {
        return draft
      }
      return null
    } catch {
      return null
    }
  }, [])

  // 清除草稿
  const clearDraft = useCallback(() => {
    localStorage.removeItem(DRAFT_KEY)
  }, [])

  return { saveDraft, getDraft, clearDraft }
}
