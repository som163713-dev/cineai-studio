import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'CINEAI Studio | AI Image & Video Generator',
  description: 'Create stunning AI-generated images and videos with CINEAI Studio.',
  keywords: 'AI image generator, AI video generator, artificial intelligence',
  authors: [{ name: 'CINEAI Studio' }],
  openGraph: {
    title: 'CINEAI Studio | AI Image & Video Generator',
    description: 'Create stunning AI-generated images and videos',
    type: 'website',
    locale: 'fa_IR',
    siteName: 'CINEAI Studio',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/icons/favicon.ico" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className="min-h-screen bg-dark antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}