'use client'

import Link from 'next/link'
import { Sparkles, Globe, Zap, Shield, ArrowRight, Award, Users, TrendingUp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
}

export default function HomePage() {
  const t = useTranslations()
  const params = useParams()
  const locale = (params?.locale as string) || 'zh'

  const featureIcons: Record<string, React.ElementType> = {
    sparkles: Sparkles,
    globe: Globe,
    zap: Zap,
    shield: Shield,
  }

  const stepIcons: Record<string, React.ElementType> = {
    user: Users,
    sparkles: Sparkles,
    star: TrendingUp,
  }

  return (
    <div className="bg-elegant">
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/4 -left-40 w-80 h-80 decoration decoration-circle opacity-20 animate-pulse-ring" />
          <div className="absolute bottom-1/4 -right-40 w-96 h-96 decoration decoration-circle opacity-15" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] decoration decoration-circle opacity-[0.03]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full glass-subtle mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary animate-bounce-subtle" />
            <span className="text-sm text-muted-foreground">{t('home.hero.badge')}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeOutExpo }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]"
          >
            <span className="text-foreground">{t('home.hero.title')}</span>
            <br />
            <span className="text-gradient">{t('home.hero.subtitle')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {t('home.hero.desc')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: easeOutExpo }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href={`/${locale}/fortune`}>
              <Button className="btn-elegant text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 min-h-[48px]">
                <Sparkles className="w-5 h-5 mr-2" />
                {t('home.hero.cta')}
              </Button>
            </Link>
            <Link href={`/${locale}/master`}>
              <Button variant="outline" className="btn-outline-elegant text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 min-h-[48px]">
                <ArrowRight className="w-5 h-5 mr-2" />
                {t('home.cta.button')}
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto"
          >
            {[
              { icon: Award, value: '5000+', label: t('home.hero.stats.years') },
              { icon: Users, value: '100K+', label: t('home.hero.stats.users') },
              { icon: TrendingUp, value: '99.9%', label: t('home.hero.stats.accuracy') },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl glass-subtle mb-3 sm:mb-4">
                  <stat.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                </div>
                <div className="stat-number mb-1.5">{stat.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-7 h-11 rounded-full border-2 border-foreground/15 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 sm:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="text-center mb-14 sm:mb-16"
          >
            <span className="text-xs sm:text-sm font-medium text-primary uppercase tracking-[0.2em]">
              {t('home.features.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-5">
              {t('home.features.title')}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('home.features.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
          >
            {t.raw('home.features.items').map((feature: any, index: number) => {
              const IconComp = featureIcons[feature.icon] || Sparkles
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="card-elegant p-7 sm:p-8 group cursor-pointer"
                >
                  <div className="mb-5">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-gold/10 flex items-center justify-center group-hover:from-primary/25 group-hover:to-gold/20 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/10">
                      <IconComp className="w-7 h-7 sm:w-8 sm:h-8 text-primary transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2.5 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="text-center mb-14 sm:mb-16"
          >
            <span className="text-xs sm:text-sm font-medium text-gold-500 uppercase tracking-[0.2em]">
              {t('home.howItWorks.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-5">
              {t('home.howItWorks.title')}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('home.howItWorks.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid sm:grid-cols-3 gap-8 sm:gap-10 max-w-5xl mx-auto"
          >
            {t.raw('home.howItWorks.steps').map((step: any, index: number) => {
              const StepIcon = stepIcons[step.icon] || Sparkles
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative text-center"
                >
                  {index < 2 && (
                    <div className="hidden sm:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" aria-hidden="true" />
                  )}

                  <div className="relative mb-6 inline-block">
                    <motion.div
                      whileHover={{ scale: 1.06 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="w-24 h-24 mx-auto rounded-full glass-card flex items-center justify-center relative z-10"
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/15 to-gold/10" />
                      <StepIcon className={`w-10 h-10 relative z-10 ${step.icon === 'star' ? 'text-gold-500' : 'text-primary'}`} />
                    </motion.div>
                    <div className="absolute -top-1.5 -right-1.5 w-9 h-9 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/30 z-20">
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold mb-2.5">{step.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{step.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
            className="relative overflow-hidden rounded-3xl glass p-10 sm:p-14 lg:p-16 text-center"
          >
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
              <div className="absolute -top-32 -right-32 w-64 h-64 decoration decoration-circle opacity-[0.08]" />
              <div className="absolute -bottom-32 -left-32 w-80 h-80 decoration decoration-circle opacity-[0.06]" />
            </div>

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: easeOutExpo }}
                className="mb-7"
              >
                <Sparkles className="w-14 h-14 sm:w-16 sm:h-16 mx-auto text-primary animate-glow" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: easeOutExpo }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5"
              >
                {t('home.cta.title')}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
                className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed"
              >
                {t('home.cta.subtitle')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25, ease: easeOutExpo }}
              >
                <Link href={`/${locale}/fortune`}>
                  <Button className="btn-elegant text-base sm:text-lg px-10 sm:px-12 py-4 sm:py-5 min-h-[48px]">
                    <Sparkles className="w-5 h-5 mr-2" />
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
