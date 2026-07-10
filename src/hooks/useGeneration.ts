'use client'
import { useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'

interface GenerationOptions {
  type: 'image' | 'video'; style: string; prompt: string
  negativePrompt?: string; imageUrl?: string | null; duration?: number; fps?: number
}

export function useGeneration() {
  const { data: session, update: updateSession } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const generate = useCallback(async (options: GenerationOptions) => {
    if (!session?.user) { setError('Please sign in to generate content'); return null }
    setIsLoading(true); setError(null); setProgress(0)
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) { clearInterval(progressInterval); return 90 }
        return prev + Math.random() * 10
      })
    }, 500)

    try {
      const endpoint = options.type === 'image' ? '/api/generate/image' : '/api/generate/video'
      const response = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options),
      })
      clearInterval(progressInterval)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Generation failed')
      }
      setProgress(100)
      const result = await response.json()
      await updateSession()
      setTimeout(() => setProgress(0), 1000)
      return result
    } catch (err) {
      clearInterval(progressInterval); setProgress(0)
      const message = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(message); return null
    } finally { setIsLoading(false) }
  }, [session, updateSession])

  const clearError = useCallback(() => setError(null), [])
  return { generate, isLoading, progress, error, clearError }
}