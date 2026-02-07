'use client'

import Link from 'next/link'
import { Sparkles, Globe, Zap, Shield, Star, Moon, Sun, ArrowRight } from 'lucide-react'
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 animated-bg" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [null, Math.random() * -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            >
              <Star className="h-2 w-2 text-mystic-400 opacity-30" />
            </motion.div>
          ))}
        </div>

        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center rounded-full border border-mystic-500/30 bg-mystic-500/10 px-6 py-3 text-sm backdrop-blur-sm"
            >
              <Sparkles className="mr-2 h-4 w-4 text-mystic-400" />
              <span className="text-mystic-300">五千年智慧 × AI 科技</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            >
              <span className="block text-white">洞悉天机</span>
              <motion.span
                initial={{ backgroundPosition: '0% 50%' }}
                animate={{ backgroundPosition: '100% 50%' }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                className="block bg-gradient-to-r from-mystic-400 via-gold-400 to-mystic-400 bg-clip-text text-transparent"
                style={{ backgroundSize: '200%' }}
              >
                掌控命运
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl"
            >
              {t('home.hero.desc')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link href={`/${locale}/fortune`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" variant="mystic" className="group text-lg px-8 py-6">
                    <Sparkles className="mr-2 h-5 w-5" />
                    {t('home.hero.cta')}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </Link>
              <Link href={`/${locale}/master`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-mystic-500/30 bg-white/5 text-lg px-8 py-6 backdrop-blur-sm hover:bg-white/10"
                  >
                    <Moon className="mr-2 h-4 w-4" />
                    {t('home.cta.button')}
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex h-12 w-8 items-center justify-center rounded-full border-2 border-mystic-500/30"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-2 w-1 rounded-full bg-mystic-500" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mystic-500/5 to-transparent" />
        <div className="container relative px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold">{t('home.features.title')}</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t('home.features.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {t.raw('home.features.items').map((feature: any, index: number) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-mystic-500/20 bg-card/80 p-8 backdrop-blur-xl transition-all hover:border-mystic-500/40 hover:shadow-2xl hover:shadow-mystic-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-mystic-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-mystic-500/20 to-purple-600/20"
                >
                  {feature.icon === 'sparkles' && (
                    <Sparkles className="h-8 w-8 text-mystic-400" />
                  )}
                  {feature.icon === 'globe' && (
                    <Globe className="h-8 w-8 text-mystic-400" />
                  )}
                  {feature.icon === 'zap' && (
                    <Zap className="h-8 w-8 text-mystic-400" />
                  )}
                  {feature.icon === 'shield' && (
                    <Shield className="h-8 w-8 text-mystic-400" />
                  )}
                </motion.div>
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold">{t('home.howItWorks.title')}</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t('home.howItWorks.subtitle')}
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {t.raw('home.howItWorks.steps').map((step: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative text-center"
              >
                <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-mystic-500/20 to-gold-500/20">
                  {step.icon === 'user' && <UserIcon className="h-12 w-12 text-mystic-400" />}
                  {step.icon === 'sparkles' && <Sparkles className="h-12 w-12 text-mystic-400" />}
                  {step.icon === 'star' && <Star className="h-12 w-12 text-mystic-400" />}
                </div>
                <div className="absolute -top-2 -right-4 text-8xl font-bold text-mystic-500/10">
                  0{index + 1}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-mystic-600 via-purple-600 to-mystic-800 p-12 text-center sm:p-20"
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-24 -right-24 h-96 w-96 rounded-full border border-white/10"
              />
              <motion.div
                animate={{
                  rotate: [0, -360],
                }}
                transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full border border-white/10"
              />
            </div>

            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="mb-6 text-4xl font-bold text-white sm:text-5xl"
              >
                {t('home.cta.title')}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mx-auto mb-10 max-w-xl text-lg text-mystic-100"
              >
                {t('home.cta.subtitle')}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={`/${locale}/fortune`}>
                  <Button
                    size="lg"
                    className="bg-white text-mystic-600 hover:bg-mystic-50 text-lg px-10 py-8"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    {t('home.cta.button')}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
}
