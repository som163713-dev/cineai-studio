'use client'
import { useMemo } from 'react'
import { getMessages } from '@/lib/i18n'

export function useMessages(lang: string = 'fa') {
  const messages = useMemo(() => {
    try { return getMessages(lang) } catch (error) {
      console.error('Failed to load messages for language:', lang, error)
      return getMessages('fa')
    }
  }, [lang])
  return messages
}