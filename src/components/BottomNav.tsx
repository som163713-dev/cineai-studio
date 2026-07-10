'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useMessages } from '@/hooks/useMessages'
import { Home, Sparkles, FolderOpen, CreditCard, User } from 'lucide-react'

export function BottomNav({ lang }: { lang: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const messages = useMessages(lang)

  const navItems = [
    { href: `/${lang}`, icon: Home, label: messages?.nav?.home || 'Home' },
    { href: `/${lang}/studio`, icon: Sparkles, label: messages?.nav?.studio || 'Studio' },
    { href: `/${lang}/gallery`, icon: FolderOpen, label: messages?.nav?.gallery || 'Gallery' },
    { href: `/${lang}/pricing`, icon: CreditCard, label: messages?.nav?.pricing || 'Pricing' },
    { href: `/${lang}/dashboard`, icon: User, label: messages?.nav?.dashboard || 'Profile' },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-dark-2/95 backdrop-blur supports-[backdrop-filter]:bg-dark-2/80 border-t border-dark-3 z-50 safe-area-bottom">
      <div className="flex justify-around items-center px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <button key={item.href} onClick={() => router.push(item.href)} className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all min-w-[60px] ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-white'}`}>
              <Icon className={`w-5 h-5 ${isActive ? 'drop-shadow-glow' : ''}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}