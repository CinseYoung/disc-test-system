import { Clock, RefreshCw } from 'lucide-react'
import type { DraftData } from '../hooks/useAutoSave'

interface RestoreModalProps {
  draft: DraftData
  onRestore: (draft: DraftData) => void
  onDiscard: () => void
}

export default function RestoreModal({ draft, onRestore, onDiscard }: RestoreModalProps) {
  const answeredCount = Object.keys(draft.answers).length
  const saveTime = new Date(draft.timestamp).toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    // 模态背景
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* 弹窗卡片 */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-scale-in">
        {/* 图标 */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
            <Clock size={36} className="text-blue-500" />
          </div>
        </div>

        {/* 标题 */}
        <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
          检测到上次的答题进度
        </h3>

        {/* 草稿信息 */}
        <div className="bg-gray-50 rounded-xl p-4 mb-5 text-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-500">保存时间</span>
            <span className="text-gray-700 font-medium">{saveTime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">已答题数</span>
            <span className="text-blue-600 font-bold">
              {answeredCount} / 40
            </span>
          </div>
        </div>

        {/* 提示 */}
        <p className="text-xs text-gray-400 text-center mb-5">
          是否恢复上次的答题进度？放弃将清除草稿并从头开始。
        </p>

        {/* 按钮组 */}
        <div className="flex space-x-3">
          {/* 放弃按钮 */}
          <button
            onClick={onDiscard}
            className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all"
          >
            放弃并重新开始
          </button>

          {/* 恢复按钮 */}
          <button
            onClick={() => onRestore(draft)}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold transition-all flex items-center justify-center shadow-lg shadow-blue-200"
          >
            <RefreshCw size={18} className="mr-1.5" />
            恢复进度
          </button>
        </div>
      </div>
    </div>
  )
}
