import { useState } from 'react'
import { Eye, ChevronDown, Loader2 } from 'lucide-react'
import { formatDate, formatDuration } from '../utils/format'
import { getDominantType } from '../utils/scoring'
import SubmissionDetail from './SubmissionDetail'
import type { TestSubmission } from '../types'

interface SubmissionListProps {
  submissions: TestSubmission[]
  loading: boolean
  loadingMore: boolean
  hasMore: boolean
  onLoadMore: () => void
}

const TYPE_BADGE: Record<string, string> = {
  D: 'bg-red-50 text-red-600 border-red-200',
  I: 'bg-yellow-50 text-yellow-600 border-yellow-200',
  S: 'bg-green-50 text-green-600 border-green-200',
  C: 'bg-blue-50 text-blue-600 border-blue-200',
}

const TYPE_LABEL: Record<string, string> = {
  D: 'D 支配型',
  I: 'I 影响型',
  S: 'S 稳健型',
  C: 'C 服从型',
}

export default function SubmissionList({
  submissions,
  loading,
  loadingMore,
  hasMore,
  onLoadMore,
}: SubmissionListProps) {
  const [selectedSubmission, setSelectedSubmission] = useState<TestSubmission | null>(null)

  // 首次加载动画
  if (loading && submissions.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400 text-sm">正在加载提交记录...</p>
      </div>
    )
  }

  // 空状态提示（无数据或搜索无结果）
  if (submissions.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="mb-4 text-gray-300">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01.002 2 2h-2.5a2 2 0 01-2-2m2.002 0h-3.5a2 2 0 01-2-2m0 0V5a2 2 0 012-2h3.5m-3.5 0h3.5m-3.5 0V7a2 2 0 012 2m0 0h-3.5M9 12h3.5m-3.5 0H5.002a2 2 0 00-2 2v2a2 2 0 002 2m2-4h3.5m0 0V5a2 2 0 00-2-2M9 5h3.5" />
          </svg>
        </div>
        <p className="text-lg font-medium text-gray-500 mb-2">暂无提交记录</p>
        <p className="text-sm text-gray-400">
          等待候选人完成测试后，数据将在此处实时显示
        </p>
      </div>
    )
  }

  return (
    <>
      {/* 桌面端表格 */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <th className="py-3.5 px-5 border-b font-semibold">候选人</th>
              <th className="py-3.5 px-5 border-b font-semibold">提交时间</th>
              <th className="py-3.5 px-5 border-b font-semibold">耗时</th>
              <th className="py-3.5 px-5 border-b font-semibold text-center">D</th>
              <th className="py-3.5 px-5 border-b font-semibold text-center">I</th>
              <th className="py-3.5 px-5 border-b font-semibold text-center">S</th>
              <th className="py-3.5 px-5 border-b font-semibold text-center">C</th>
              <th className="py-3.5 px-5 border-b font-semibold">主导类型</th>
              <th className="py-3.5 px-5 border-b font-semibold text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub) => {
              const dominant = getDominantType({
                D: sub.score_d,
                I: sub.score_i,
                S: sub.score_s,
                C: sub.score_c,
              })
              return (
                <tr
                  key={sub.id}
                  className="border-b last:border-b-0 hover:bg-blue-50/30 transition-colors"
                >
                  <td className="py-3.5 px-5 font-semibold text-gray-800">{sub.candidate_name}</td>
                  <td className="py-3.5 px-5 text-sm text-gray-500">{formatDate(sub.created_at)}</td>
                  <td className="py-3.5 px-5 text-sm text-gray-500">{formatDuration(sub.duration_seconds)}</td>
                  <td className="py-3.5 px-5 text-center font-mono font-bold text-red-500">{sub.score_d}</td>
                  <td className="py-3.5 px-5 text-center font-mono font-bold text-yellow-500">{sub.score_i}</td>
                  <td className="py-3.5 px-5 text-center font-mono font-bold text-green-500">{sub.score_s}</td>
                  <td className="py-3.5 px-5 text-center font-mono font-bold text-blue-500">{sub.score_c}</td>
                  <td className="py-3.5 px-5">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${TYPE_BADGE[dominant]}`}>
                      {TYPE_LABEL[dominant]}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-center">
                    <button
                      onClick={() => setSelectedSubmission(sub)}
                      className="text-blue-500 hover:text-blue-700 transition-colors p-1.5 hover:bg-blue-50 rounded-lg"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* 移动端卡片 */}
      <div className="md:hidden space-y-3">
        {submissions.map((sub) => {
          const dominant = getDominantType({
            D: sub.score_d,
            I: sub.score_i,
            S: sub.score_s,
            C: sub.score_c,
          })
          return (
            <div
              key={sub.id}
              className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
              onClick={() => setSelectedSubmission(sub)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-gray-800">{sub.candidate_name}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">{formatDate(sub.created_at)}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${TYPE_BADGE[dominant]}`}>
                  {TYPE_LABEL[dominant]}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'D', score: sub.score_d, color: 'text-red-500', bg: 'bg-red-500' },
                  { label: 'I', score: sub.score_i, color: 'text-yellow-500', bg: 'bg-yellow-400' },
                  { label: 'S', score: sub.score_s, color: 'text-green-500', bg: 'bg-green-500' },
                  { label: 'C', score: sub.score_c, color: 'text-blue-500', bg: 'bg-blue-500' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className={`text-lg font-mono font-bold ${item.color}`}>{item.score}</div>
                    <div className="w-full h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                      <div
                        className={`h-full ${item.bg} rounded-full`}
                        style={{ width: `${(item.score / 40) * 100}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* 加载更多 */}
      {hasMore && (
        <div className="text-center mt-6">
          {loadingMore ? (
            <div className="flex items-center justify-center text-gray-400 text-sm">
              <Loader2 size={18} className="animate-spin mr-2" />
              正在加载更多...
            </div>
          ) : (
            <button
              onClick={onLoadMore}
              className="text-blue-500 hover:text-blue-700 font-medium text-sm flex items-center mx-auto transition-colors"
            >
              加载更多
              <ChevronDown size={16} className="ml-1" />
            </button>
          )}
        </div>
      )}

      {/* 详情弹窗 */}
      {selectedSubmission && (
        <SubmissionDetail
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </>
  )
}
