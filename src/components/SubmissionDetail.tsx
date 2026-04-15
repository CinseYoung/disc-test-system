import { X } from 'lucide-react'
import { formatDate, formatDuration } from '../utils/format'
import ResultScreen from './ResultScreen'
import type { TestSubmission } from '../types'

interface SubmissionDetailProps {
  submission: TestSubmission
  onClose: () => void
}

export default function SubmissionDetail({ submission, onClose }: SubmissionDetailProps) {
  const scores = {
    D: submission.score_d,
    I: submission.score_i,
    S: submission.score_s,
    C: submission.score_c,
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* 遮罩 */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* 弹窗内容 */}
      <div
        className="relative bg-gray-50 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <X size={18} className="text-gray-500" />
        </button>

        {/* 元信息 */}
        <div className="px-5 sm:px-8 pt-6 pb-2">
          <div className="text-sm text-gray-400 space-y-1">
            <p>提交时间：{formatDate(submission.created_at)}</p>
            <p>答题耗时：{formatDuration(submission.duration_seconds)}</p>
          </div>
        </div>

        {/* 复用 ResultScreen */}
        <div className="px-2 sm:px-4 pb-6">
          <ResultScreen
            scores={scores}
            candidateName={submission.candidate_name}
            showCloseButton={false}
          />
        </div>
      </div>
    </div>
  )
}
