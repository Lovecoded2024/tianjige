'use client'

import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe, Moon, Sun, Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Locale, localeNames, localeFlags, locales } from '@/i18n-config'
import { useRouter, usePathname } from '@/navigation'
import Link from 'next/link'

export function Navbar() {
  const t = useTranslations()
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = pathname?.split('/')[1] as Locale || 'zh'

  const handleLocaleChange = (locale: Locale) => {
    const newPath = pathname?.replace(`/${currentLocale}`, `/${locale}`) || `/${locale}`
    router.push(newPath)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${currentLocale}`} className="flex items-center space-x-3 group">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-primary" />
              <div className="absolute -inset-1 bg-primary/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="hidden sm:inline-block text-xl font-bold text-gradient bg-gradient-to-r from-primary via-purple-400 to-gold bg-clip-text">
              天机阁
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { key: 'home', href: `/${currentLocale}` },
              { key: 'fortune', href: `/${currentLocale}/fortune` },
              { key: 'artifacts', href: `/${currentLocale}/artifacts` },
              { key: 'master', href: `/${currentLocale}/master` },
            ].map((item) => (
              <Link key={item.key} href={item.href}>
                <span className="nav-link">{t(`nav.${item.key}`)}</span>
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">{t('nav.language')}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass border-white/10 min-w-[140px]">
                {locales.map((locale) => (
                  <DropdownMenuItem
                    key={locale}
                    onClick={() => handleLocaleChange(locale)}
                    className="flex items-center space-x-2 cursor-pointer py-3"
                  >
                    <span className="text-lg">{localeFlags[locale]}</span>
                    <span>{localeNames[locale]}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full hover:bg-white/5"
            >
              <Sun className="h-5 w-5 dark:hidden" />
              <Moon className="hidden h-5 w-5 dark:block" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* CTA Button */}
            <Link href={`/${currentLocale}/fortune`}>
              <Button className="btn-elegant hidden sm:flex py-2">
                <Sparkles className="h-4 w-4 mr-2" />
                {t('nav.fortune')}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden rounded-full hover:bg-white/5">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
