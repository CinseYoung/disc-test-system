import type { DISCTraits } from '../types'

interface QuestionNavigatorProps {
  totalQuestions: number
  currentIndex: number
  answers: Record<number, number>
  onJumpTo: (index: number) => void
}

export default function QuestionNavigator({
  totalQuestions,
  currentIndex,
  answers,
  onJumpTo,
}: QuestionNavigatorProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
      <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
        <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs mr-2">
          {Object.keys(answers).length}
        </span>
        题目导航器
      </h4>

      {/* 题号网格 */}
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const questionId = i + 1
          const isAnswered = answers[questionId] !== undefined
          const isCurrent = i === currentIndex

          return (
            <button
              key={questionId}
              onClick={() => onJumpTo(i)}
              className={`
                w-8 h-8 rounded-lg text-xs font-bold transition-all
                ${
                  isCurrent
                    ? 'bg-blue-500 text-white ring-2 ring-blue-200 scale-110'
                    : isAnswered
                    ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                }
              `}
            >
              {questionId}
            </button>
          )
        })}
      </div>

      {/* 图例 */}
      <div className="flex items-center justify-center space-x-4 mt-3 text-xs text-gray-400">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-1" />
          当前题
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-50 border border-blue-200 mr-1" />
          已答
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gray-50 border border-gray-200 mr-1" />
          未答
        </div>
      </div>
    </div>
  )
}
