import { BarChart3, RefreshCw, Users, CalendarDays } from 'lucide-react'
import { useSubmissions } from '../hooks/useSubmissions'
import SearchBar from '../components/SearchBar'
import SubmissionList from '../components/SubmissionList'

export default function AdminPage() {
  const {
    submissions,
    loading,
    totalCount,
    hasMore,
    searchKeyword,
    search,
    loadMore,
    refresh,
  } = useSubmissions()

  // 计算今日提交数
  const today = new Date().toISOString().slice(0, 10)
  const todayCount = submissions.filter(
    (s) => s.created_at.slice(0, 10) === today
  ).length

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-gray-100 text-slate-800 font-sans">
      {/* 顶部导航栏 */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 py-3.5 sm:py-4 px-4 sm:px-6 shadow-sm fixed top-0 left-0 right-0 z-20">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="font-bold text-lg sm:text-xl tracking-tight text-gray-800 flex items-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-2.5">
              <BarChart3 className="text-white" size={18} />
            </div>
            <span className="hidden sm:inline">DISC 测试管理后台</span>
            <span className="sm:hidden">管理后台</span>
          </div>

          <button
            onClick={refresh}
            disabled={loading}
            className="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors bg-gray-50 hover:bg-blue-50 px-3 py-2 rounded-lg disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={`mr-1.5 ${loading ? 'animate-spin' : ''}`}
            />
            刷新
          </button>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12">
        {/* 统计摘要 */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 shadow-sm">
            <div className="flex items-center text-gray-400 mb-2">
              <Users size={16} className="mr-1.5" />
              <span className="text-xs font-medium uppercase tracking-wider">总提交数</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-800">{totalCount}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 shadow-sm">
            <div className="flex items-center text-gray-400 mb-2">
              <CalendarDays size={16} className="mr-1.5" />
              <span className="text-xs font-medium uppercase tracking-wider">今日提交</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-600">{todayCount}</div>
          </div>
        </div>

        {/* 搜索栏 */}
        <div className="mb-6">
          <SearchBar onSearch={search} keyword={searchKeyword} />
        </div>

        {/* 提交记录列表 */}
        <SubmissionList
          submissions={submissions}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={loadMore}
        />
      </main>
    </div>
  )
}
