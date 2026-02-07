'use client'

import Link from 'next/link'
import { Sparkles, Globe, Zap, Shield, ArrowRight, Award, Users, TrendingUp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface HomePageProps {
  params: {
    locale: string
  }
}

export default function HomePage({ params: { locale } }: HomePageProps) {
  const t = useTranslations()

  return (
    <div className="min-h-screen bg-elegant">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center space-x-3 group">
              <div className="relative">
                <Sparkles className="w-8 h-8 text-primary" />
                <div className="absolute -inset-1 bg-primary/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xl font-bold text-gradient bg-gradient-to-r from-primary via-purple-400 to-gold bg-clip-text">
                天机阁
              </span>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { key: 'home', href: `/${locale}` },
                { key: 'fortune', href: `/${locale}/fortune` },
                { key: 'artifacts', href: `/${locale}/artifacts` },
                { key: 'master', href: `/${locale}/master` },
              ].map((item) => (
                <Link key={item.key} href={item.href}>
                  <span className="nav-link">{t(`nav.${item.key}`)}</span>
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {locale === 'zh' ? '中文' : locale === 'en' ? 'English' : locale === 'ja' ? '日本語' : '한국어'}
                </span>
              </div>
              <Link href={`/${locale}/fortune`}>
                <Button className="btn-elegant hidden sm:flex">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {t('home.hero.cta')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Orbs */}
          <div className="absolute top-1/4 -left-40 w-80 h-80 decoration decoration-circle opacity-20 animate-pulse-ring" />
          <div className="absolute bottom-1/4 -right-40 w-96 h-96 decoration decoration-circle opacity-15" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] decoration decoration-circle opacity-5" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full glass mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">{t('home.hero.badge')}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-white">{t('home.hero.title')}</span>
            <br />
            <motion.span
              initial={{ backgroundPosition: '0% center' }}
              animate={{ backgroundPosition: ['0% center', '100% center', '0% center'] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="text-gradient bg-gradient-to-r from-primary via-purple-400 to-gold bg-clip-text"
              style={{ backgroundSize: '200%' }}
            >
              {t('home.hero.subtitle')}
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {t('home.hero.desc')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href={`/${locale}/fortune`}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button className="btn-elegant text-lg px-10 py-5">
                  <Sparkles className="w-5 h-5 mr-2" />
                  {t('home.hero.cta')}
                </Button>
              </motion.div>
            </Link>
            <Link href={`/${locale}/master`}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" className="btn-outline-elegant text-lg px-10 py-5">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  {t('home.cta.button')}
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              { icon: Award, value: '5000+', label: t('home.hero.stats.years') },
              { icon: Users, value: '100K+', label: t('home.hero.stats.users') },
              { icon: TrendingUp, value: '99.9%', label: t('home.hero.stats.accuracy') },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="stat-number mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-12 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-primary uppercase tracking-widest">
              {t('home.features.badge')}
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-6">
              {t('home.features.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('home.features.subtitle')}
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.raw('home.features.items').map((feature: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card-elegant p-8 group cursor-pointer"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-gold/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-gold/30 transition-colors">
                    {feature.icon === 'sparkles' && (
                      <Sparkles className="w-8 h-8 text-primary" />
                    )}
                    {feature.icon === 'globe' && (
                      <Globe className="w-8 h-8 text-primary" />
                    )}
                    {feature.icon === 'zap' && (
                      <Zap className="w-8 h-8 text-primary" />
                    )}
                    {feature.icon === 'shield' && (
                      <Shield className="w-8 h-8 text-primary" />
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-gold uppercase tracking-widest">
              {t('home.howItWorks.badge')}
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-6">
              {t('home.howItWorks.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('home.howItWorks.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {t.raw('home.howItWorks.steps').map((step: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Connection Line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-px bg-gradient-to-r from-primary/30 via-primary/50 to-gold/30" />
                )}
                
                <div className="relative mb-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-24 h-24 mx-auto rounded-full glass flex items-center justify-center relative z-10"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-gold/20" />
                    {step.icon === 'user' && (
                      <Users className="w-10 h-10 text-primary relative z-10" />
                    )}
                    {step.icon === 'sparkles' && (
                      <Sparkles className="w-10 h-10 text-primary relative z-10" />
                    )}
                    {step.icon === 'star' && (
                      <TrendingUp className="w-10 h-10 text-gold relative z-10" />
                    )}
                  </motion.div>
                  <div className="absolute -top-1 -right-1 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg z-20">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl glass p-12 sm:p-16 text-center"
          >
            {/* Decorative */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 decoration decoration-circle opacity-10" />
              <div className="absolute -bottom-40 -left-40 w-96 h-96 decoration decoration-circle opacity-10" />
            </div>

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <Sparkles className="w-16 h-16 mx-auto text-primary glow" />
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl font-bold mb-6"
              >
                {t('home.cta.title')}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto"
              >
                {t('home.cta.subtitle')}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link href={`/${locale}/fortune`}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button className="btn-elegant text-lg px-12 py-5">
                      <Sparkles className="w-5 h-5 mr-2" />
                      {t('home.cta.button')}
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg">天机阁</span>
              <span className="text-muted-foreground text-sm ml-2">© 2024</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link href={`/${locale}`} className="hover:text-primary transition-colors">
                {t('nav.home')}
              </Link>
              <Link href={`/${locale}/fortune`} className="hover:text-primary transition-colors">
                {t('nav.fortune')}
              </Link>
              <Link href={`/${locale}/master`} className="hover:text-primary transition-colors">
                {t('nav.master')}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
