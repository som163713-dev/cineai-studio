import { getMessages as getMessagesFromHook } from '@/hooks/useMessages'

export function getMessages(lang: string = 'fa') {
  return getMessagesFromHook(lang)
}

export const supportedLanguages = ['fa', 'en', 'ar', 'tr', 'de']
export const defaultLanguage = 'fa'
export const languageNames = {
  fa: 'فارسی',
  en: 'English',
  ar: 'العربية',
  tr: 'Türkçe',
  de: 'Deutsch',
}
