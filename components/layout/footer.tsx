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
    <footer className="border-t border-mystic-500/20 bg-background/50 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-mystic-500" />
              <span className="text-xl font-bold gradient-text">天机阁</span>
            </div>
            <p className="text-sm text-muted-foreground">
              五千年智慧与AI的完美融合
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">快速链接</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href={`/${currentLocale}`} className="hover:text-foreground">
                  首页
                </Link>
              </li>
              <li>
                <Link href={`/${currentLocale}/fortune`} className="hover:text-foreground">
                  算命
                </Link>
              </li>
              <li>
                <Link href={`/${currentLocale}/artifacts`} className="hover:text-foreground">
                  法器
                </Link>
              </li>
              <li>
                <Link href={`/${currentLocale}/master`} className="hover:text-foreground">
                  大师
                </Link>
              </li>
            </ul>
          </div>

          {/* Language */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">语言</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {locales.map((locale) => (
                <li key={locale}>
                  <button
                    onClick={() => handleLocaleChange(locale)}
                    className="flex items-center space-x-2 hover:text-foreground"
                  >
                    <span>{localeFlags[locale]}</span>
                    <span>{localeNames[locale]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">社交</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/tianjige"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Globe className="h-5 w-5" />
                <span className="sr-only">Website</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-mystic-500/20 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 天机阁. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
