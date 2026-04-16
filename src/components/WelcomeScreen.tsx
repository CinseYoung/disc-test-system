import { BarChart3, ChevronRight, Info } from 'lucide-react'

interface WelcomeScreenProps {
  onStart: () => void
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="text-center py-8 sm:py-12 animate-fade-in">
      <div className="mb-6 flex justify-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-200">
          <BarChart3 size={40} className="text-white" />
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
        DISC 性格测试系统
      </h1>
      <p className="text-gray-400 text-sm mb-8">职业性格量表评估</p>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto mb-8 text-left">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <Info className="mr-2 text-blue-500 flex-shrink-0" size={20} />
          答题须知
        </h3>

        <p className="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base">
          测试共计 <strong>40 题</strong>，请在每一个大标题下的四个选项中，
          <strong className="text-blue-600">只选择一个最符合你自己的</strong>。
        </p>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl text-blue-800 text-sm leading-relaxed mb-5 border border-blue-100">
          <strong>💡 提示：</strong>
          请按第一印象最快的速度选择。如果不能确定，可回忆童年时的情况，或者以你最熟悉的人对你的评价来从中选择。
        </div>

        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
            <span><strong>限时要求：</strong>本测试限制时间15分钟，建议完成时间10分钟</span>
          </li>
          <li className="flex items-start">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
            <span><strong>防刷机制：</strong>提交后 5 分钟内不可重复测试</span>
          </li>
          <li className="flex items-start">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
            <span><strong>结果呈现：</strong>提交后将自动统计 D、I、S、C 各维度得分</span>
          </li>
        </ul>
      </div>

      <button
        onClick={onStart}
        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3.5 px-10 rounded-full transition-all flex items-center justify-center mx-auto shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
      >
        我已了解，开始测试
        <ChevronRight className="ml-1" size={20} />
      </button>
    </div>
  )
}
