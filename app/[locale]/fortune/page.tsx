'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Sparkles, ArrowRight, MessageCircle, Calendar, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useRouter, usePathname } from '@/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { calculateBazi, calculateWuxing, determineGod, formatBazi, getRecommendedMaterials, TIANGAN, DIZHI, WUXING, YINYANG, SHENGXIAO, type Wuxing } from '@/lib/bazi'

const fortuneSchema = z.object({
  name: z.string().min(1, 'nameRequired'),
  year: z.number().min(1900).max(2100),
  month: z.number().min(1).max(12),
  day: z.number().min(1).max(31),
  hour: z.number().min(0).max(23),
  gender: z.enum(['male', 'female']).optional(),
})

type FortuneForm = z.infer<typeof fortuneSchema>

export default function FortunePage() {
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()
  const locale = (pathname?.split('/')[1] as string) || 'zh'
  const [isCalculating, setIsCalculating] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [fortuneData, setFortuneData] = useState<{
    bazi: any
    wuxing: Record<Wuxing, number>
    god: {
      strongElement: Wuxing
      weakElement: Wuxing
      usefulGod: Wuxing
      outputGod: Wuxing
    }
    materials: readonly any[]
  } | null>(null)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FortuneForm>({
    resolver: zodResolver(fortuneSchema),
    defaultValues: {
      name: '',
      year: 1990,
      month: 1,
      day: 1,
      hour: 12,
      gender: undefined,
    },
  })

  const onSubmit = async (data: FortuneForm) => {
    setIsCalculating(true)

    // 计算动画
    await new Promise(resolve => setTimeout(resolve, 2000))

    const bazi = calculateBazi(data.year, data.month, data.day, data.hour)
    const wuxing = calculateWuxing(bazi)
    const god = determineGod(wuxing)
    const materials = getRecommendedMaterials(god.usefulGod)

    setFortuneData({ bazi, wuxing, god, materials })
    setIsCalculating(false)
    
    // 延迟显示结果以播放动画
    setTimeout(() => setShowResult(true), 500)
  }

  const wuxingColors: Record<Wuxing, string> = {
    木: 'text-green-400',
    火: 'text-red-400',
    土: 'text-yellow-400',
    金: 'text-gray-300',
    水: 'text-blue-400',
  }

  const wuxingBarColors: Record<Wuxing, string> = {
    木: 'bg-gradient-to-r from-green-500 to-emerald-400',
    火: 'bg-gradient-to-r from-red-500 to-orange-400',
    土: 'bg-gradient-to-r from-yellow-500 to-amber-400',
    金: 'bg-gradient-to-r from-gray-400 to-slate-300',
    水: 'bg-gradient-to-r from-blue-500 to-cyan-400',
  }

  const pillarLabels = [
    { key: 'yearPillar', label: t('fortune.report.bazi.year') },
    { key: 'monthPillar', label: t('fortune.report.bazi.month') },
    { key: 'dayPillar', label: t('fortune.report.bazi.day') },
    { key: 'timePillar', label: t('fortune.report.bazi.time') },
  ]

  if (showResult && fortuneData) {
    return (
      <div className="min-h-screen gradient-bg py-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={() => setShowResult(false)}
              className="text-primary hover:text-primary/80"
            >
              ← {t('nav.fortune')}
            </Button>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-24 h-24 mx-auto mb-6 rounded-full glass-card flex items-center justify-center"
            >
              <Sparkles className="w-12 h-12 text-primary animate-glow" />
            </motion.div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-gradient">{t('fortune.report.title')}</span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-muted-foreground"
            >
              {formatBazi(fortuneData.bazi)}
            </motion.p>
          </motion.div>

          {/* Bazi Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12"
          >
            {pillarLabels.map((pillar, index) => {
              const pillarData = fortuneData.bazi[pillar.key as keyof typeof fortuneData.bazi]
              return (
                <motion.div
                  key={pillar.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card card-hover p-6 text-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 transition-opacity" />
                  <p className="relative mb-4 text-sm text-muted-foreground">{pillar.label}</p>
                  <div className="relative space-y-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1, type: 'spring' }}
                      className="text-5xl font-bold text-primary"
                    >
                      {pillarData.tiangan}
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1, type: 'spring' }}
                      className="text-4xl"
                    >
                      {pillarData.dizhi}
                      <span className="ml-2 text-base text-muted-foreground">
                        ({SHENGXIAO[pillarData.dizhi as keyof typeof SHENGXIAO]})
                      </span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="text-sm text-muted-foreground"
                    >
                      {WUXING[pillarData.tiangan as keyof typeof WUXING]}{WUXING[pillarData.dizhi as keyof typeof WUXING]}
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Wuxing Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid gap-8 lg:grid-cols-2 mb-12"
          >
            {/* Element Distribution */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="glass-card p-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <h2 className="relative mb-8 text-2xl font-bold">{t('fortune.report.wuxing.title')}</h2>
              <div className="relative space-y-6">
                {Object.entries(fortuneData.wuxing).map(([element, count], index) => (
                  <motion.div
                    key={element}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between text-sm">
                      <span className={cn('font-medium', wuxingColors[element as Wuxing])}>
                        {t(`fortune.report.wuxing.${element.toLowerCase()}`)}
                      </span>
                      <span className="text-muted-foreground">{count as number}</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((count as number) / 8) * 100}%` }}
                        transition={{ duration: 1, delay: 1.2 + index * 0.1 }}
                        className={cn(
                          'h-full rounded-full',
                          wuxingBarColors[element as Wuxing]
                        )}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* God Analysis */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="glass-card p-6 relative overflow-hidden"
              >
                <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-green-500/10 blur-3xl" />
                <p className="relative mb-2 text-sm text-muted-foreground">喜用神</p>
                <p className="relative text-4xl font-bold text-green-400">
                  {fortuneData.god.usefulGod}（{WUXING[fortuneData.god.usefulGod[0] as keyof typeof WUXING]}）
                </p>
                <p className="relative mt-3 text-sm text-muted-foreground">
                  您的八字中{fortuneData.god.weakElement}较弱，{fortuneData.god.usefulGod}能补充您的能量
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="glass-card p-6 relative overflow-hidden"
              >
                <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-red-500/10 blur-3xl" />
                <p className="relative mb-2 text-sm text-muted-foreground">忌神</p>
                <p className="relative text-4xl font-bold text-red-400">
                  {fortuneData.god.outputGod}（{WUXING[fortuneData.god.outputGod[0] as keyof typeof WUXING]}）
                </p>
                <p className="relative mt-3 text-sm text-muted-foreground">
                  建议避免过多接触{fortuneData.god.outputGod}属性的物品
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href={`/${locale}/artifacts?god=${fortuneData.god.usefulGod}`}>
                <Button size="lg" className="w-full btn-primary">
                  <Sparkles className="w-5 h-5 mr-2" />
                  {t('fortune.artifacts.view')}
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href={`/${locale}/master`}>
                <Button size="lg" variant="outline" className="w-full btn-secondary">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t('fortune.master.button')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg py-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-2xl"
        >
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              className="w-24 h-24 mx-auto mb-6 rounded-full glass-card flex items-center justify-center"
            >
              <Sparkles className="w-12 h-12 text-primary animate-pulse" />
            </motion.div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-gradient">{t('fortune.title')}</span>
            </h1>
            <p className="text-lg text-muted-foreground">{t('fortune.subtitle')}</p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8"
          >
            {/* Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <label className="flex items-center text-sm font-medium">
                <User className="w-4 h-4 mr-2 text-primary" />
                {t('fortune.form.name')}
              </label>
              <input
                {...register('name')}
                placeholder={t('fortune.form.namePlaceholder')}
                className="input-field"
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-400"
                >
                  {errors.name.message}
                </motion.p>
              )}
            </motion.div>

            {/* Birth Date */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="grid gap-4 sm:grid-cols-3"
            >
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium">
                  <Calendar className="w-4 h-4 mr-2 text-primary" />
                  {t('fortune.form.birthDate')}
                </label>
                <select
                  {...register('year', { valueAsNumber: true })}
                  className="select-field"
                >
                  {Array.from({ length: 124 }, (_, i) => 1900 + i).map((year) => (
                    <option key={year} value={year} className="bg-card">
                      {year}年
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">&nbsp;</label>
                <select
                  {...register('month', { valueAsNumber: true })}
                  className="select-field"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month} className="bg-card">
                      {month}月
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">&nbsp;</label>
                <select
                  {...register('day', { valueAsNumber: true })}
                  className="select-field"
                >
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <option key={day} value={day} className="bg-card">
                      {day}日
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>

            {/* Birth Time */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <label className="flex items-center text-sm font-medium">
                <Clock className="w-4 h-4 mr-2 text-primary" />
                {t('fortune.form.birthTime')}
              </label>
              <select
                {...register('hour', { valueAsNumber: true })}
                className="select-field"
              >
                {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                  <option key={hour} value={hour} className="bg-card">
                    {hour.toString().padStart(2, '0')}:00
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Gender */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-2"
            >
              <label className="text-sm font-medium">{t('fortune.form.gender')}</label>
              <div className="flex space-x-6">
                <label className="flex cursor-pointer items-center space-x-2">
                  <input
                    type="radio"
                    {...register('gender')}
                    value="male"
                    className="w-4 h-4 text-primary"
                  />
                  <span className="flex items-center">
                    <span className="mr-1">♂</span> {t('fortune.form.male')}
                  </span>
                </label>
                <label className="flex cursor-pointer items-center space-x-2">
                  <input
                    type="radio"
                    {...register('gender')}
                    value="female"
                    className="w-4 h-4 text-primary"
                  />
                  <span className="flex items-center">
                    <span className="mr-1">♀</span> {t('fortune.form.female')}
                  </span>
                </label>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                size="lg"
                disabled={isCalculating}
                className="w-full btn-primary text-lg"
              >
                {isCalculating ? (
                  <div className="flex items-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white mr-2"
                    />
                    {t('fortune.form.calculating')}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    {t('fortune.form.calculate')}
                  </div>
                )}
              </Button>
            </motion.div>
          </motion.form>

          {/* Calculating Animation */}
          <AnimatePresence>
            {isCalculating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 1, repeat: Infinity },
                    }}
                    className="w-24 h-24 mx-auto mb-6 rounded-full glass-card flex items-center justify-center"
                  >
                    <Sparkles className="w-12 h-12 text-primary" />
                  </motion.div>
                  <p className="text-xl font-medium text-primary mb-2">
                    {t('fortune.form.calculating')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    大师正在推演您的命理...
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
