import { CheckCircle2 } from 'lucide-react'
import { TOTAL_QUESTIONS } from '../data/questions'
import { buildChartData } from '../utils/scoring'
import type { DISCScores } from '../types'

interface ResultScreenProps {
  scores: DISCScores
  candidateName?: string
  showCloseButton?: boolean
  onClose?: () => void
  closeButtonText?: string
}

export default function ResultScreen({
  scores,
  candidateName,
  showCloseButton = true,
  onClose,
  closeButtonText = '完成测试',
}: ResultScreenProps) {
  const chartData = buildChartData(scores)
  const getPercentage = (score: number) => Math.round((score / TOTAL_QUESTIONS) * 100) || 0
  const maxScore = Math.max(...chartData.map((d) => d.score), 1)

  return (
    <div className="py-6 sm:py-8 max-w-3xl mx-auto animate-fade-in">
      {/* 顶部成功标记 */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-4 shadow-lg shadow-green-200">
          <CheckCircle2 size={36} className="text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {candidateName ? `${candidateName} 的测试结果` : '测试完成！'}
        </h2>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          DISC 行为风格量化统计
        </p>
      </div>

      <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">
          统计结果分析
        </h3>

        {/* 柱状图 */}
        <div className="mb-10">
          <h4 className="text-xs font-semibold text-gray-400 mb-6 text-center tracking-widest uppercase">
            得分分布柱状图
          </h4>
          <div className="flex justify-around items-end h-48 sm:h-64 bg-gradient-to-b from-slate-50 to-gray-50 p-4 rounded-xl border border-gray-200 pt-10">
            {chartData.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center w-1/5 h-full justify-end relative group"
              >
                <span className="text-sm sm:text-lg font-bold text-gray-700 absolute -top-7 sm:-top-8 transition-transform group-hover:-translate-y-1">
                  {item.score}
                  <span className="text-[10px] sm:text-xs text-gray-400 font-normal ml-0.5">题</span>
                </span>
                <div
                  className={`w-full max-w-[40px] sm:max-w-[56px] ${item.color} rounded-t-lg transition-all duration-1000 shadow-sm opacity-85 group-hover:opacity-100`}
                  style={{
                    height: `${(item.score / maxScore) * 85}%`,
                    minHeight: '8px',
                  }}
                />
                <span className="text-xs sm:text-sm font-bold text-gray-700 mt-3 sm:mt-4 text-center">
                  {item.fullLabel}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 数据表格 - 桌面端 */}
        <div className="hidden sm:block">
          <h4 className="text-xs font-semibold text-gray-400 mb-4 text-center tracking-widest uppercase">
            详细数据量表
          </h4>
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-slate-50 text-slate-600 text-sm">
                  <th className="py-4 px-6 border-b font-bold">特质维度</th>
                  <th className="py-4 px-6 border-b font-bold">命中题数</th>
                  <th className="py-4 px-6 border-b font-bold">占比分布</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-b last:border-b-0 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-4 px-6 flex items-center font-bold text-gray-800">
                      <span className={`w-4 h-4 rounded-md ${item.color} mr-4 shadow-sm`} />
                      {item.fullLabel}
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-lg text-gray-700">
                      {item.score}
                      <span className="text-sm font-normal text-gray-400 ml-1">/ {TOTAL_QUESTIONS}</span>
                    </td>
                    <td className="py-4 px-6 font-mono text-gray-600">
                      <div className="flex items-center">
                        <span className="w-14 font-bold">{getPercentage(item.score)}%</span>
                        <div className="w-32 h-2.5 bg-gray-100 rounded-full ml-2 overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${getPercentage(item.score)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 数据卡片 - 移动端 */}
        <div className="sm:hidden space-y-3">
          <h4 className="text-xs font-semibold text-gray-400 mb-4 text-center tracking-widest uppercase">
            详细数据量表
          </h4>
          {chartData.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border border-gray-100 ${item.bgColor}`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`font-bold ${item.textColor}`}>{item.fullLabel}</span>
                <span className="font-mono font-bold text-gray-700">
                  {item.score}
                  <span className="text-xs text-gray-400 font-normal">/{TOTAL_QUESTIONS}</span>
                </span>
              </div>
              <div className="w-full h-2 bg-white/60 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                  style={{ width: `${getPercentage(item.score)}%` }}
                />
              </div>
              <div className="text-right mt-1">
                <span className="text-xs font-mono text-gray-500">{getPercentage(item.score)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCloseButton && onClose && (
        <div className="text-center mt-8">
          <button
            onClick={onClose}
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-10 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
          >
            {closeButtonText}
          </button>
        </div>
      )}
    </div>
  )
}
