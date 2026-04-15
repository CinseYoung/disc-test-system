import { Clock } from 'lucide-react'
import { DISC_QUESTIONS, TOTAL_QUESTIONS } from '../data/questions'
import { formatTime } from '../utils/format'

interface TestingScreenProps {
  answers: Record<number, number>
  timeLeft: number
  onSelect: (questionId: number, optionIndex: number) => void
  onSubmit: () => void
}

export default function TestingScreen({ answers, timeLeft, onSelect, onSubmit }: TestingScreenProps) {
  const answeredCount = Object.keys(answers).length
  const isAllAnswered = answeredCount === TOTAL_QUESTIONS
  const progress = (answeredCount / TOTAL_QUESTIONS) * 100

  return (
    <div className="py-4 sm:py-6 max-w-3xl mx-auto">
      {/* 顶部悬浮状态栏 */}
      <div className="sticky top-[57px] sm:top-[65px] z-10 mb-6">
        <div className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-xl shadow-md border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm sm:text-base font-bold text-gray-700">
              答题进度：
              <span className="text-blue-600 ml-1">{answeredCount} / {TOTAL_QUESTIONS}</span>
            </h2>
            <div
              className={`flex items-center font-mono text-sm sm:text-base font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${
                timeLeft < 180
                  ? 'text-red-600 bg-red-50 animate-pulse'
                  : 'text-blue-600 bg-blue-50'
              }`}
            >
              <Clock className="mr-1.5" size={16} />
              {formatTime(timeLeft)}
            </div>
          </div>
          {/* 进度条 */}
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 题目列表 */}
      <div className="space-y-4 sm:space-y-6">
        {DISC_QUESTIONS.map((q, index) => (
          <div
            key={q.id}
            className={`bg-white p-4 sm:p-6 rounded-xl border transition-all ${
              answers[q.id] !== undefined
                ? 'border-green-200 shadow-sm'
                : 'border-gray-100 shadow-sm hover:shadow-md'
            }`}
          >
            <h3 className="text-sm sm:text-base font-bold text-gray-700 mb-3 sm:mb-4 pb-2 border-b border-gray-100">
              <span className="text-blue-600 mr-2">第 {index + 1} 题</span>
              请选择最符合您的一项：
            </h3>

            <div className="space-y-2 sm:space-y-3">
              {q.options.map((opt, optIdx) => (
                <label
                  key={optIdx}
                  className={`block p-3 sm:p-4 border rounded-xl cursor-pointer transition-all ${
                    answers[q.id] === optIdx
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200 shadow-sm'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 border-gray-300 mt-0.5 flex-shrink-0"
                      checked={answers[q.id] === optIdx}
                      onChange={() => onSelect(q.id, optIdx)}
                    />
                    <span className="ml-3 text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
                      {opt.text}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 底部提交按钮 */}
      <div className="mt-8 sm:mt-10 text-center sticky bottom-4 sm:bottom-6 z-10">
        <button
          onClick={onSubmit}
          disabled={!isAllAnswered}
          className={`font-bold py-3.5 sm:py-4 px-8 sm:px-12 rounded-full transition-all text-base sm:text-lg shadow-lg ${
            isAllAnswered
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-green-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'
              : 'bg-gray-800/80 text-white/90 cursor-not-allowed backdrop-blur-sm'
          }`}
        >
          {isAllAnswered
            ? '立即提交查看结果'
            : `还有 ${TOTAL_QUESTIONS - answeredCount} 题未完成`}
        </button>
      </div>
    </div>
  )
}
