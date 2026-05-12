import { AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react'

interface ConfirmModalProps {
  answeredCount: number
  totalQuestions: number
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmModal({
  answeredCount,
  totalQuestions,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const isAllAnswered = answeredCount === totalQuestions
  const unansweredCount = totalQuestions - answeredCount

  return (
    // 模态背景（半透明黑色 + 模糊）
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* 弹窗卡片 */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-scale-in">
        {/* 图标 */}
        <div className="flex justify-center mb-5">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            isAllAnswered 
              ? 'bg-green-50' 
              : 'bg-orange-50'
          }`}>
            {isAllAnswered ? (
              <CheckCircle2 size={36} className="text-green-500" />
            ) : (
              <AlertCircle size={36} className="text-orange-500" />
            )}
          </div>
        </div>

        {/* 标题 */}
        <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
          {isAllAnswered ? '确认提交测试？' : '确定要提交吗？'}
        </h3>

        {/* 答题统计 */}
        <div className="bg-gray-50 rounded-xl p-4 mb-5 text-center">
          <p className="text-gray-600 text-sm mb-2">当前答题进度</p>
          <div className="flex items-center justify-center space-x-6">
            <div>
              <span className="text-2xl font-bold text-blue-600">{answeredCount}</span>
              <span className="text-sm text-gray-400 ml-1">/ {totalQuestions}</span>
            </div>
            {!isAllAnswered && (
              <div className="text-left">
                <p className="text-xs text-orange-600 font-medium">
                  还有 {unansweredCount} 题未答
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  未答题将计 0 分
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 温馨提示（未答完时显示） */}
        {!isAllAnswered && (
          <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 mb-5">
            <p className="text-xs text-orange-700 leading-relaxed">
              💡 提示：建议答完所有题目后再提交，以获得更准确的测试结果。
            </p>
          </div>
        )}

        {/* 按钮组 */}
        <div className="flex space-x-3">
          {/* 取消按钮 */}
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all flex items-center justify-center"
          >
            <ArrowLeft size={18} className="mr-1.5" />
            继续答题
          </button>

          {/* 确认提交按钮 */}
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-white transition-all ${
              isAllAnswered
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-200'
                : 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg shadow-orange-200'
            } flex items-center justify-center`}
          >
            <CheckCircle2 size={18} className="mr-1.5" />
            确认提交
          </button>
        </div>
      </div>
    </div>
  )
}
