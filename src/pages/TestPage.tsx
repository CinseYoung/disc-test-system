import { useState, useCallback, useEffect } from 'react'
import { BarChart3 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useTimer } from '../hooks/useTimer'
import { calculateScores } from '../utils/scoring'
import { TEST_DURATION, COOLDOWN_DURATION } from '../data/questions'
import WelcomeScreen from '../components/WelcomeScreen'
import NameInputScreen from '../components/NameInputScreen'
import TestingScreen from '../components/TestingScreen'
import ResultScreen from '../components/ResultScreen'
import CooldownScreen from '../components/CooldownScreen'
import type { AppState, DISCScores } from '../types'

const COOLDOWN_KEY = 'disc_cooldown_until'

function getCooldownRemaining(): number {
  const until = localStorage.getItem(COOLDOWN_KEY)
  if (!until) return 0
  const remaining = Math.floor((parseInt(until, 10) - Date.now()) / 1000)
  return remaining > 0 ? remaining : 0
}

function setCooldownTimestamp() {
  const until = Date.now() + COOLDOWN_DURATION * 1000
  localStorage.setItem(COOLDOWN_KEY, until.toString())
}

export default function TestPage() {
  const cooldownRemaining = getCooldownRemaining()
  const [appState, setAppState] = useState<AppState>(cooldownRemaining > 0 ? 'cooldown' : 'welcome')
  const [candidateName, setCandidateName] = useState('')
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [scores, setScores] = useState<DISCScores>({ D: 0, I: 0, S: 0, C: 0 })
  const [submitting, setSubmitting] = useState(false)

  const handleTimeout = useCallback(() => {
    handleSubmit()
  }, [])

  const timer = useTimer({
    initialSeconds: TEST_DURATION,
    onTimeout: handleTimeout,
  })

  const cooldownTimer = useTimer({
    initialSeconds: cooldownRemaining,
    autoStart: cooldownRemaining > 0,
    onTimeout: () => {
      setAppState('welcome')
      localStorage.removeItem(COOLDOWN_KEY)
    },
  })

  // 监控冷却结束
  useEffect(() => {
    if (appState === 'cooldown' && cooldownTimer.timeLeft <= 0) {
      setAppState('welcome')
      localStorage.removeItem(COOLDOWN_KEY)
    }
  }, [appState, cooldownTimer.timeLeft])

  const handleStartFromWelcome = () => {
    setAppState('nameInput')
  }

  const handleNameSubmit = (name: string) => {
    setCandidateName(name)
    setAnswers({})
    timer.reset(TEST_DURATION)
    timer.start()
    setAppState('testing')
  }

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  async function handleSubmit() {
    if (submitting) return
    setSubmitting(true)
    setAppState('submitting')

    const currentScores = calculateScores(answers)
    setScores(currentScores)

    const durationSeconds = timer.elapsed

    if (supabase) {
      const { error } = await supabase.from('test_submissions').insert({
        candidate_name: candidateName,
        answers,
        score_d: currentScores.D,
        score_i: currentScores.I,
        score_s: currentScores.S,
        score_c: currentScores.C,
        duration_seconds: durationSeconds,
      })

      if (error) {
        console.error('提交失败:', error)
      }
    } else {
      console.error('Supabase 未配置，数据仅保留在本地')
    }

    setSubmitting(false)
    setAppState('result')
  }

  const handleCloseResult = () => {
    setCooldownTimestamp()
    cooldownTimer.reset(COOLDOWN_DURATION)
    cooldownTimer.start()
    setAppState('cooldown')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-gray-100 text-slate-800 font-sans">
      {/* 顶部导航栏 */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 py-3.5 sm:py-4 px-4 sm:px-6 shadow-sm fixed top-0 left-0 right-0 z-20">
        <div className="max-w-4xl mx-auto flex items-center">
          <div className="font-bold text-lg sm:text-xl tracking-tight text-gray-800 flex items-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mr-2.5">
              <BarChart3 className="text-white" size={18} />
            </div>
            DISC 职业性格评估
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12">
        {appState === 'welcome' && (
          <WelcomeScreen onStart={handleStartFromWelcome} />
        )}

        {appState === 'nameInput' && (
          <NameInputScreen onSubmit={handleNameSubmit} />
        )}

        {appState === 'testing' && (
          <TestingScreen
            answers={answers}
            timeLeft={timer.timeLeft}
            onSelect={handleSelectOption}
            onSubmit={handleSubmit}
          />
        )}

        {appState === 'submitting' && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-500 font-medium">正在提交您的测试结果...</p>
            </div>
          </div>
        )}

        {appState === 'result' && (
          <ResultScreen
            scores={scores}
            showCloseButton
            onClose={handleCloseResult}
            closeButtonText="完成测试（进入冷却）"
          />
        )}

        {appState === 'cooldown' && (
          <CooldownScreen cooldownLeft={cooldownTimer.timeLeft} />
        )}
      </main>
    </div>
  )
}
