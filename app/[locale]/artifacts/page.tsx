'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Sparkles, Circle, Gem, ArrowRight, Sparkle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

// 材质数据
const materialsData = {
  '木': {
    bracelet: [
      { name: '绿幽灵', nameEn: 'Green Phantom', type: '水晶', benefit: '招财进宝，事业攀升', color: 'from-green-500 to-emerald-400' },
      { name: '青金石', nameEn: 'Lapis Lazuli', type: '水晶', benefit: '增强直觉，提升贵人运', color: 'from-blue-500 to-cyan-400' },
      { name: '橄榄石', nameEn: 'Peridot', type: '水晶', benefit: '带来希望，好运连连', color: 'from-green-400 to-lime-300' },
    ],
    pendant: [
      { name: '翡翠', nameEn: 'Jade', type: '玉石', benefit: '辟邪挡灾，平安吉祥', color: 'from-green-600 to-emerald-500' },
      { name: '绿发晶', nameEn: 'Green Rutilated', type: '水晶', benefit: '财富能量，事业发展', color: 'from-green-500 to-teal-400' },
    ],
  },
  '火': {
    bracelet: [
      { name: '南红玛瑙', nameEn: 'Red Agate', type: '玛瑙', benefit: '鸿运当头，财运旺盛', color: 'from-red-500 to-orange-400' },
      { name: '红珊瑚', nameEn: 'Red Coral', type: '有机宝石', benefit: '热情活力，人缘极佳', color: 'from-red-400 to-pink-400' },
      { name: '朱砂', nameEn: 'Cinnabar', type: '矿物', benefit: '辟邪化煞，护身保平安', color: 'from-red-600 to-rose-500' },
    ],
    pendant: [
      { name: '红宝石', nameEn: 'Ruby', type: '宝石', benefit: '热情自信，魅力四射', color: 'from-red-500 to-crimson' },
      { name: '石榴石', nameEn: 'Garnet', type: '宝石', benefit: '爱情运势，美丽动人', color: 'from-red-400 to-grape' },
    ],
  },
  '土': {
    bracelet: [
      { name: '蜜蜡', nameEn: 'Amber', type: '有机宝石', benefit: '温润养生，提升整体运势', color: 'from-yellow-500 to-amber-400' },
      { name: '黄玉', nameEn: 'Topaz', type: '宝石', benefit: '增强自信，吸引财富', color: 'from-yellow-400 to-orange-300' },
      { name: '翡翠', nameEn: 'Jade', type: '玉石', benefit: '辟邪挡灾，平安吉祥', color: 'from-green-600 to-emerald-500' },
    ],
    pendant: [
      { name: '琥珀', nameEn: 'Amber', type: '有机宝石', benefit: '温润养生，吸引正能量', color: 'from-yellow-500 to-gold-400' },
      { name: '黄水晶', nameEn: 'Citrine', type: '水晶', benefit: '财富之石，招财进宝', color: 'from-yellow-400 to-amber-500' },
    ],
  },
  '金': {
    bracelet: [
      { name: '白水晶', nameEn: 'Clear Quartz', type: '水晶', benefit: '净化磁场，提升专注力', color: 'from-gray-200 to-white' },
      { name: '月光石', nameEn: 'Moonstone', type: '宝石', benefit: '柔化磁场，提升魅力', color: 'from-blue-200 to-indigo-200' },
      { name: '黑曜石', nameEn: 'Obsidian', type: '火山玻璃', benefit: '辟邪化煞，挡小人', color: 'from-gray-800 to-slate-700' },
    ],
    pendant: [
      { name: '银饰', nameEn: 'Silver', type: '金属', benefit: '净化能量，平衡阴阳', color: 'from-gray-300 to-gray-100' },
      { name: '白幽灵', nameEn: 'White Phantom', type: '水晶', benefit: '净化身心，提升灵性', color: 'from-white to-gray-100' },
    ],
  },
  '水': {
    bracelet: [
      { name: '海蓝宝', nameEn: 'Aquamarine', type: '宝石', benefit: '智慧之源，提升表达能力', color: 'from-blue-400 to-cyan-400' },
      { name: '托帕石', nameEn: 'Topaz', type: '宝石', benefit: '增强自信，吸引正桃花', color: 'from-blue-300 to-sky-300' },
      { name: '天河石', nameEn: 'Amazonite', type: '矿石', benefit: '消除压力，带来平静', color: 'from-teal-400 to-cyan-300' },
    ],
    pendant: [
      { name: '蓝宝石', nameEn: 'Sapphire', type: '宝石', benefit: '智慧沉稳，提升直觉', color: 'from-blue-500 to-indigo-500' },
      { name: '青金石', nameEn: 'Lapis Lazuli', type: '水晶', benefit: '提升洞察力，贵人相助', color: 'from-blue-600 to-violet-500' },
    ],
  },
}

export default function ArtifactsPage({ searchParams }: { searchParams: { god?: string; locale?: string } }) {
  const t = useTranslations()
  const god = searchParams?.god || '木'
  const locale = searchParams?.locale || 'zh'

  const materials = materialsData[god as keyof typeof materialsData] || materialsData['木']

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold-500/20 to-mystic-500/20"
          >
            <Sparkles className="h-10 w-10 text-gold-400" />
          </motion.div>
          <h1 className="mb-4 text-4xl font-bold gradient-text">
            {t('artifacts.title')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('artifacts.subtitle')} - <span className="text-gold-400">{god}属性</span>
          </p>
        </motion.div>

        {/* Bracelets */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="mb-8 flex items-center space-x-4">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-mystic-500/20 to-purple-600/20"
            >
              <Circle className="h-7 w-7 text-mystic-400" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold">{t('artifacts.bracelet.title')}</h2>
              <p className="text-muted-foreground">{t('artifacts.bracelet.desc')}</p>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {materials.bracelet.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-mystic-500/20 bg-gradient-to-br from-card to-mystic-500/5 p-6 transition-all hover:border-mystic-500/40 hover:shadow-2xl hover:shadow-mystic-500/10"
              >
                {/* Background Glow */}
                <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${item.color} opacity-10 blur-3xl transition-opacity group-hover:opacity-20`} />

                <div className="relative mb-4 flex items-start justify-between">
                  <div>
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xl font-semibold"
                    >
                      {item.name}
                    </motion.h3>
                    <p className="text-sm text-muted-foreground">{item.nameEn}</p>
                  </div>
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className={`rounded-full bg-gradient-to-r ${item.color} px-4 py-1 text-xs font-medium text-white shadow-lg`}
                  >
                    {item.type}
                  </motion.span>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="relative mb-4 text-muted-foreground"
                >
                  {item.benefit}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative flex items-center text-sm text-gold-400"
                >
                  <Sparkle className="mr-1 h-4 w-4" />
                  适合{god}属性人群
                </motion.div>

                {/* Hover Effect Line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-mystic-500 to-gold-500"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Pendants */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="mb-8 flex items-center space-x-4">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-gold-500/20 to-yellow-600/20"
            >
              <Gem className="h-7 w-7 text-gold-400" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold">{t('artifacts.pendant.title')}</h2>
              <p className="text-muted-foreground">{t('artifacts.pendant.desc')}</p>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {materials.pendant.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-gold-500/20 bg-gradient-to-br from-card to-gold-500/5 p-6 transition-all hover:border-gold-500/40 hover:shadow-2xl hover:shadow-gold-500/10"
              >
                {/* Background Glow */}
                <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${item.color} opacity-10 blur-3xl transition-opacity group-hover:opacity-20`} />

                <div className="relative mb-4 flex items-start justify-between">
                  <div>
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xl font-semibold"
                    >
                      {item.name}
                    </motion.h3>
                    <p className="text-sm text-muted-foreground">{item.nameEn}</p>
                  </div>
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className={`rounded-full bg-gradient-to-r ${item.color} px-4 py-1 text-xs font-medium text-white shadow-lg`}
                  >
                    {item.type}
                  </motion.span>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="relative mb-4 text-muted-foreground"
                >
                  {item.benefit}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative flex items-center text-sm text-gold-400"
                >
                  <Sparkle className="mr-1 h-4 w-4" />
                  适合{god}属性人群
                </motion.div>

                {/* Hover Effect Line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-500 to-mystic-500"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href={`/${locale}/fortune`}>
              <Button size="lg" variant="outline" className="border-mystic-500/30 px-8 py-6 text-lg">
                <ArrowRight className="mr-2 h-5 w-5" />
                {t('nav.fortune')}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
