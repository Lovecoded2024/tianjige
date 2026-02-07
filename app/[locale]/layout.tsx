import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/i18n-config'
import '../globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: {
    default: '天机阁 | DestinyForge - AI命理平台',
    template: '%s | 天机阁',
  },
  description: '五千年智慧与AI的完美融合 - 通过生辰八字，揭开命运的神秘面纱',
  keywords: ['命理', '八字', '算命', 'AI', '周易', '风水', '运势', ' fortune telling', 'BaZi'],
  authors: [{ name: 'TianJiGe' }],
  creator: 'TianJiGe',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://tianjige.com',
    siteName: '天机阁',
    title: '天机阁 | DestinyForge - AI命理平台',
    description: '五千年智慧与AI的完美融合',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '天机阁 - AI命理平台',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '天机阁 | DestinyForge - AI命理平台',
    description: '五千年智慧与AI的完美融合',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0a1e' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
