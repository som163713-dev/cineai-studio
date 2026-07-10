import { messages as faMessages } from '@/i18n/fa'
import { messages as enMessages } from '@/i18n/en'
import { messages as arMessages } from '@/i18n/ar'
import { messages as trMessages } from '@/i18n/tr'
import { messages as deMessages } from '@/i18n/de'

const messagesMap: Record<string, any> = { fa: faMessages, en: enMessages, ar: arMessages, tr: trMessages, de: deMessages }

export function getMessages(locale: string) { return messagesMap[locale] || messagesMap.fa }

export function getDirection(locale: string): 'rtl' | 'ltr' { return ['fa', 'ar'].includes(locale) ? 'rtl' : 'ltr' }

export const supportedLocales = ['fa', 'en', 'ar', 'tr', 'de'] as const
export type SupportedLocale = typeof supportedLocales[number]

export const localeNames: Record<SupportedLocale, string> = { fa: 'فارسی', en: 'English', ar: 'العربية', tr: 'Türkçe', de: 'Deutsch' }
export const localeFlags: Record<SupportedLocale, string> = { fa: '🇮🇷', en: '🇬🇧', ar: '🇸🇦', tr: '🇹🇷', de: '🇩🇪' }