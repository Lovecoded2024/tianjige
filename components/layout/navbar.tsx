'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe, Moon, Sun, Sparkles, X, Menu } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Locale, localeNames, localeFlags, locales } from '@/i18n-config'
import { useRouter, usePathname } from '@/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const t = useTranslations()
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = pathname?.split('/')[1] as Locale || 'zh'
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleLocaleChange = (locale: Locale) => {
    const newPath = pathname?.replace(`/${currentLocale}`, `/${locale}`) || `/${locale}`
    router.push(newPath)
  }

  const navItems = [
    { key: 'home', href: `/${currentLocale}` },
    { key: 'fortune', href: `/${currentLocale}/fortune` },
    { key: 'artifacts', href: `/${currentLocale}/artifacts` },
    { key: 'master', href: `/${currentLocale}/master` },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-foreground/5 shadow-lg shadow-background/20'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            <Link href={`/${currentLocale}`} className="flex items-center space-x-2.5 group">
              <div className="relative">
                <Sparkles className="h-7 w-7 text-primary transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute -inset-1.5 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="hidden sm:inline-block text-lg font-bold text-gradient">
                天机阁
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Main">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.key !== 'home' && pathname?.startsWith(item.href))
                return (
                  <Link key={item.key} href={item.href}>
                    <span className={`nav-link ${isActive ? 'nav-link-active' : ''}`}>
                      {t(`nav.${item.key}`)}
                    </span>
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-foreground/5 h-9 w-9">
                    <Globe className="h-[18px] w-[18px]" />
                    <span className="sr-only">{t('nav.language')}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass border-foreground/10 min-w-[140px]">
                  {locales.map((locale) => (
                    <DropdownMenuItem
                      key={locale}
                      onClick={() => handleLocaleChange(locale)}
                      className="flex items-center space-x-2.5 cursor-pointer py-2.5 px-3"
                    >
                      <span className="text-base">{localeFlags[locale]}</span>
                      <span className="text-sm">{localeNames[locale]}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-full hover:bg-foreground/5 h-9 w-9"
                aria-label="Toggle theme"
              >
                <Sun className="h-[18px] w-[18px] dark:hidden" />
                <Moon className="hidden h-[18px] w-[18px] dark:block" />
              </Button>

              <Link href={`/${currentLocale}/fortune`} className="hidden sm:block">
                <Button className="btn-elegant py-2 px-5 text-sm">
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  {t('nav.fortune')}
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full hover:bg-foreground/5 h-9 w-9"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-16 left-0 right-0 z-50 glass border-b border-foreground/5 md:hidden"
              role="navigation"
              aria-label="Mobile"
            >
              <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || (item.key !== 'home' && pathname?.startsWith(item.href))
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors min-h-[44px] ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
                      }`}
                    >
                      {t(`nav.${item.key}`)}
                    </Link>
                  )
                })}
                <div className="pt-2">
                  <Link href={`/${currentLocale}/fortune`} className="block">
                    <Button className="btn-elegant w-full py-3 text-sm min-h-[44px]">
                      <Sparkles className="h-4 w-4 mr-2" />
                      {t('nav.fortune')}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
