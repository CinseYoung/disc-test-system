import { useState, useEffect, useCallback, useRef } from 'react'

interface UseTimerOptions {
  initialSeconds: number
  onTimeout?: () => void
  autoStart?: boolean
}

export function useTimer({ initialSeconds, onTimeout, autoStart = false }: UseTimerOptions) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(autoStart)
  const onTimeoutRef = useRef(onTimeout)

  onTimeoutRef.current = onTimeout

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsRunning(false)
          onTimeoutRef.current?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isRunning, timeLeft])

  const start = useCallback(() => {
    setIsRunning(true)
  }, [])

  const reset = useCallback((seconds?: number) => {
    setTimeLeft(seconds ?? initialSeconds)
    setIsRunning(false)
  }, [initialSeconds])

  const elapsed = initialSeconds - timeLeft

  return { timeLeft, isRunning, start, reset, elapsed }
}
