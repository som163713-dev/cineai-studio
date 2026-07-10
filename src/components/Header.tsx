'use client'
import { useSession, signOut } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useMessages } from '@/hooks/useMessages'
import { useState, useEffect } from 'react'
import { Menu, X, LogOut, User, CreditCard, Sparkles } from 'lucide-react'

export function Header({ lang }: { lang: string }) {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const messages = useMessages(lang)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: `/${lang}/studio`, label: messages?.nav?.studio || 'Studio', icon: Sparkles },
    { href: `/${lang}/gallery`, label: messages?.nav?.gallery || 'Gallery' },
    { href: `/${lang}/pricing`, label: messages?.nav?.pricing || 'Pricing' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-dark-2/95 backdrop-blur supports-[backdrop-filter]:bg-dark-2/80 border-b border-dark-3 shadow-lg' : 'bg-dark-2 border-b border-dark-3'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${lang}`} className="flex items-center gap-2 text-xl font-bold hover:opacity-80 transition">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20"><span className="text-xl">🎬</span></div>
            <span className="hidden sm:block gradient-text">CINEAI</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive(item.href) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-white hover:bg-dark-3'}`}>{item.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <select value={lang} onChange={(e) => { const newLang = e.target.value; const newPath = pathname.replace(`/${lang}`, `/${newLang}`); router.push(newPath) }} className="bg-dark-3 border border-dark-3 rounded-lg px-2 py-1 text-sm text-white focus:outline-none focus:border-primary hidden md:block">
              <option value="fa">🇮🇷 فارسی</option><option value="en">🇬🇧 English</option><option value="ar">🇸🇦 العربية</option><option value="tr">🇹🇷 Türkçe</option><option value="de">🇩🇪 Deutsch</option>
            </select>
            {session ? (
              <div className="hidden md:flex items-center gap-3">
                <Link href={`/${lang}/dashboard`}><Button variant="ghost" size="sm" className="gap-2"><User className="w-4 h-4" /><span className="max-w-[100px] truncate">{session.user?.name?.split(' ')[0] || 'User'}</span></Button></Link>
                <div className="flex items-center gap-1 px-3 py-1 bg-dark-3 rounded-lg"><CreditCard className="w-4 h-4 text-primary" /><span className="text-sm font-semibold text-primary">{session.user?.credits || 0}</span></div>
                <Button variant="ghost" size="sm" onClick={() => signOut()} className="text-muted-foreground hover:text-white"><LogOut className="w-4 h-4" /></Button>
              </div>
            ) : (
              <div className="hidden md:block"><Button onClick={() => router.push(`/${lang}/auth/signin`)} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">{messages?.nav?.login || 'Sign In'}</Button></div>
            )}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-dark-3 transition">{isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden border-t border-dark-3 py-4 space-y-2 animate-fade-in">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className={`block px-4 py-3 rounded-lg transition ${isActive(item.href) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-dark-3 hover:text-white'}`}>{item.label}</Link>
            ))}
            <div className="border-t border-dark-3 pt-4 px-4 space-y-3">
              <select value={lang} onChange={(e) => { const newLang = e.target.value; const newPath = pathname.replace(`/${lang}`, `/${newLang}`); router.push(newPath); setIsMenuOpen(false) }} className="w-full bg-dark-3 border border-dark-3 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary">
                <option value="fa">🇮🇷 فارسی</option><option value="en">🇬🇧 English</option><option value="ar">🇸🇦 العربية</option><option value="tr">🇹🇷 Türkçe</option><option value="de">🇩🇪 Deutsch</option>
              </select>
              {session ? (
                <>
                  <Link href={`/${lang}/dashboard`} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-dark-3 transition">
                    <User className="w-5 h-5" />
                    <div><p className="text-sm font-medium">{session.user?.name}</p><p className="text-xs text-muted-foreground">{session.user?.email}</p></div>
                  </Link>
                  <div className="flex items-center gap-2 px-4"><CreditCard className="w-4 h-4 text-primary" /><span className="text-sm">Credits: <strong className="text-primary">{session.user?.credits || 0}</strong></span></div>
                  <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300" onClick={() => { signOut(); setIsMenuOpen(false) }}><LogOut className="w-4 h-4 ml-2" />{messages?.nav?.logout || 'Sign Out'}</Button>
                </>
              ) : (
                <Button className="w-full bg-gradient-to-r from-primary to-secondary" onClick={() => { router.push(`/${lang}/auth/signin`); setIsMenuOpen(false) }}>{messages?.nav?.login || 'Sign In'}</Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}