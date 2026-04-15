import { RefreshCw, AlertCircle } from 'lucide-react'
import { formatTime } from '../utils/format'

interface CooldownScreenProps {
  cooldownLeft: number
}

export default function CooldownScreen({ cooldownLeft }: CooldownScreenProps) {
  return (
    <div className="text-center py-16 sm:py-20 max-w-md mx-auto animate-fade-in">
      <div className="mb-8 flex justify-center">
        <div className="w-24 h-24 rounded-full bg-orange-50 flex items-center justify-center">
          <RefreshCw size={48} className="text-orange-500 animate-spin-slow" />
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">进入冷却期</h2>

      <p className="text-gray-500 mb-8 leading-relaxed text-sm sm:text-base px-4">
        为了保证测试结果的直觉性和准确性，防止反复修改答案，系统已锁定重测功能。请稍后再来。
      </p>

      <div className="bg-gradient-to-br from-orange-50 to-amber-50 text-orange-700 py-5 px-8 rounded-2xl inline-flex flex-col items-center border border-orange-100 shadow-sm">
        <span className="text-xs font-bold mb-2 flex items-center uppercase tracking-wider text-orange-500">
          <AlertCircle className="mr-1" size={14} />
          距离解锁还剩
        </span>
        <span className="font-mono text-4xl sm:text-5xl font-bold text-orange-600">
          {formatTime(cooldownLeft)}
        </span>
      </div>
    </div>
  )
}
