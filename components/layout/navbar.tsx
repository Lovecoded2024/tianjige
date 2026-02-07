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
    <header className="sticky top-0 z-50 w-full border-b border-mystic-500/20 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${currentLocale}`} className="flex items-center space-x-2">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-mystic-500" />
              <div className="absolute -inset-1 animate-pulse-glow rounded-full bg-mystic-500/20" />
            </div>
            <span className="hidden text-xl font-bold sm:inline-block gradient-text">
              天机阁
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href={`/${currentLocale}`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t('nav.home')}
            </Link>
            <Link
              href={`/${currentLocale}/fortune`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t('nav.fortune')}
            </Link>
            <Link
              href={`/${currentLocale}/artifacts`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t('nav.artifacts')}
            </Link>
            <Link
              href={`/${currentLocale}/master`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t('nav.master')}
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">{t('nav.language')}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {locales.map((locale) => (
                  <DropdownMenuItem
                    key={locale}
                    onClick={() => handleLocaleChange(locale)}
                    className="flex items-center space-x-2"
                  >
                    <span>{localeFlags[locale]}</span>
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
            >
              <Sun className="h-5 w-5 dark:hidden" />
              <Moon className="hidden h-5 w-5 dark:block" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden">
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
