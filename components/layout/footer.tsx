'use client'

import Link from 'next/link'
import { Sparkles, Github, Globe } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Locale, localeNames, localeFlags, locales } from '@/i18n-config'
import { usePathname, useRouter } from '@/navigation'
import React from 'react'

export function Footer() {
  const t = useTranslations()
  const pathname = usePathname()
  const router = useRouter()

  const currentLocale = React.useMemo(() => {
    return (pathname?.split('/')[1] as Locale) || 'zh'
  }, [pathname])

  const handleLocaleChange = (locale: Locale) => {
    const newPath = pathname?.replace(`/${currentLocale}`, `/${locale}`) || `/${locale}`
    router.replace(newPath)
  }

  return (
    <footer className="border-t border-foreground/[0.06] bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1 space-y-4">
            <div className="flex items-center space-x-2.5">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold text-gradient">天机阁</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
              五千年智慧与AI的完美融合
            </p>
          </div>

          <div>
            <h3 className="mb-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
              快速链接
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: '首页', href: `/${currentLocale}` },
                { label: '算命', href: `/${currentLocale}/fortune` },
                { label: '法器', href: `/${currentLocale}/artifacts` },
                { label: '大师', href: `/${currentLocale}/master` },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
              语言
            </h3>
            <ul className="space-y-2.5 text-sm">
              {locales.map((locale) => (
                <li key={locale}>
                  <button
                    onClick={() => handleLocaleChange(locale)}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <span className="text-base">{localeFlags[locale]}</span>
                    <span>{localeNames[locale]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
              社交
            </h3>
            <div className="flex space-x-3">
              <a
                href="https://github.com/tianjige"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-foreground/5 text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-foreground/5 text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-all duration-200"
                aria-label="Website"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-foreground/[0.06] text-center text-xs text-muted-foreground/70">
          <p>&copy; {new Date().getFullYear()} 天机阁. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
