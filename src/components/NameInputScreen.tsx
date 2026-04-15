import { useState } from 'react'
import { UserCircle, ArrowRight } from 'lucide-react'

interface NameInputScreenProps {
  onSubmit: (name: string) => void
}

export default function NameInputScreen({ onSubmit }: NameInputScreenProps) {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onSubmit(name.trim())
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
            <UserCircle size={32} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">请输入您的姓名</h2>
          <p className="text-gray-400 text-sm mt-1">用于标识您的测试结果</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="请输入姓名"
            autoFocus
            maxLength={20}
            className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-300 bg-gray-50 focus:bg-white"
          />

          <button
            type="submit"
            disabled={!name.trim()}
            className={`w-full mt-6 font-bold py-4 rounded-xl transition-all flex items-center justify-center text-lg ${
              name.trim()
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'
                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
            }`}
          >
            开始答题
            <ArrowRight className="ml-2" size={20} />
          </button>
        </form>
      </div>
    </div>
  )
}
