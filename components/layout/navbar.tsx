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
import { motion } from 'framer-motion'

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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${currentLocale}`} className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="h-8 w-8 text-primary" />
            </motion.div>
            <span className="hidden text-xl font-bold sm:inline-block text-gradient">
              天机阁
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {[
              { key: 'home', href: `/${currentLocale}` },
              { key: 'fortune', href: `/${currentLocale}/fortune` },
              { key: 'artifacts', href: `/${currentLocale}/artifacts` },
              { key: 'master', href: `/${currentLocale}/master` },
            ].map((item) => (
              <Link key={item.key} href={item.href}>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                >
                  {t(`nav.${item.key}`)}
                </motion.span>
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">{t('nav.language')}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-card border-white/10">
                {locales.map((locale) => (
                  <DropdownMenuItem
                    key={locale}
                    onClick={() => handleLocaleChange(locale)}
                    className="flex items-center space-x-2 cursor-pointer"
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
              className="rounded-full"
            >
              <Sun className="h-5 w-5 dark:hidden" />
              <Moon className="hidden h-5 w-5 dark:block" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden rounded-full">
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
