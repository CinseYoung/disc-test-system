import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { TestSubmission } from '../types'

const PAGE_SIZE = 20

export function useSubmissions() {
  const [submissions, setSubmissions] = useState<TestSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  const fetchSubmissions = useCallback(async (pageNum = 0, keyword = searchKeyword) => {
    if (!supabase) return
    setLoading(true)

    let query = supabase
      .from('test_submissions')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE - 1)

    if (keyword.trim()) {
      query = query.ilike('candidate_name', `%${keyword.trim()}%`)
    }

    const { data, error, count } = await query

    if (error) {
      console.error('查询提交记录失败:', error)
      setLoading(false)
      return
    }

    if (pageNum === 0) {
      setSubmissions(data || [])
    } else {
      setSubmissions((prev) => [...prev, ...(data || [])])
    }

    setTotalCount(count || 0)
    setHasMore((data?.length || 0) === PAGE_SIZE)
    setPage(pageNum)
    setLoading(false)
  }, [searchKeyword])

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      fetchSubmissions(page + 1)
    }
  }, [hasMore, loading, page, fetchSubmissions])

  const search = useCallback((keyword: string) => {
    setSearchKeyword(keyword)
    setPage(0)
    fetchSubmissions(0, keyword)
  }, [fetchSubmissions])

  const refresh = useCallback(() => {
    setPage(0)
    fetchSubmissions(0)
  }, [fetchSubmissions])

  // 初始加载
  useEffect(() => {
    fetchSubmissions(0, '')
  }, [])

  // Realtime 订阅
  useEffect(() => {
    if (!supabase) return

    const channel = supabase
      .channel('submissions-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'test_submissions' },
        (payload) => {
          const newRecord = payload.new as TestSubmission
          setSubmissions((prev) => [newRecord, ...prev])
          setTotalCount((prev) => prev + 1)
        }
      )
      .subscribe()

    return () => {
      supabase!.removeChannel(channel)
    }
  }, [])

  return {
    submissions,
    loading,
    totalCount,
    hasMore,
    searchKeyword,
    search,
    loadMore,
    refresh,
  }
}
