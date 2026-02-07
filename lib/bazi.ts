// 天机阁 - 八字计算核心模块

// 十天干
export const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const

// 十二地支
export const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const

// 五行属性
export const WUXING = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水',
  '子': '水', '丑': '土', '寅': '木', '卯': '木',
  '辰': '土', '巳': '火', '午': '火', '未': '土',
  '申': '金', '酉': '金', '戌': '土', '亥': '水',
} as const

// 阴阳属性
export const YINYANG = {
  '甲': '阳', '乙': '阴',
  '丙': '阳', '丁': '阴',
  '戊': '阳', '己': '阴',
  '庚': '阳', '辛': '阴',
  '壬': '阳', '癸': '阴',
  '子': '阳', '丑': '阴', '寅': '阳', '卯': '阴',
  '辰': '阳', '巳': '阴', '午': '阳', '未': '阴',
  '申': '阳', '酉': '阴', '戌': '阳', '亥': '阴',
} as const

// 生肖
export const SHENGXIAO = {
  '子': '鼠', '丑': '牛', '寅': '虎', '卯': '兔',
  '辰': '龙', '巳': '蛇', '午': '马', '未': '羊',
  '申': '猴', '酉': '鸡', '戌': '狗', '亥': '猪',
} as const

// 五行相生
export const WUXING_SHENG = {
  '木': '火',
  '火': '土',
  '土': '金',
  '金': '水',
  '水': '木',
} as const

// 五行相克
export const WUXING_KE = {
  '木': '土',
  '土': '水',
  '水': '火',
  '火': '金',
  '金': '木',
} as const

export type Tiangan = typeof TIANGAN[number]
export type Dizhi = typeof DIZHI[number]
export type Wuxing = '木' | '火' | '土' | '金' | '水'

// 计算天干地支索引
function getTianganIndex(year: number): number {
  return (year - 4) % 10
}

function getDizhiIndex(year: number): number {
  return (year - 4) % 12
}

// 获取农历月份地支（简化版，实际需要考虑节气）
function getMonthDizhi(month: number): Dizhi {
  const monthDizhi = [0, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const
  return DIZHI[monthDizhi[month]]
}

// 获取时辰地支
function getTimeDizhi(hour: number): Dizhi {
  const timeIndex = Math.floor(hour / 2) % 12
  return DIZHI[timeIndex]
}

// 计算八字
export function calculateBazi(
  year: number,
  month: number,
  day: number,
  hour: number
): {
  yearPillar: { tiangan: Tiangan; dizhi: Dizhi }
  monthPillar: { tiangan: Tiangan; dizhi: Dizhi }
  dayPillar: { tiangan: Tiangan; dizhi: Dizhi }
  timePillar: { tiangan: Tiangan; dizhi: Dizhi }
} {
  // 年柱
  const yearTiangan = TIANGAN[getTianganIndex(year)]
  const yearDizhi = DIZHI[getDizhiIndex(year)]

  // 月柱（简化计算，实际需要考虑节气）
  const monthDizhi = getMonthDizhi(month)
  const monthTianganIndex = (getTianganIndex(year) * 2 + (month - 1)) % 10
  const monthTiangan = TIANGAN[monthTianganIndex]

  // 日柱（使用已知日期验证：2024-01-01 = 癸卯日）
  // 这里使用简化算法，实际需要精确的农历转换
  const baseDate = new Date(2024, 0, 1)
  const targetDate = new Date(year, month - 1, day)
  const daysDiff = Math.floor(
    (targetDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24)
  )
  const dayTianganIndex = (60 + daysDiff) % 10 // 60是癸卯日在60甲子的位置
  const dayDizhiIndex = (60 + daysDiff) % 12
  const dayTiangan = TIANGAN[dayTianganIndex]
  const dayDizhi = DIZHI[dayDizhiIndex]

  // 时柱
  const timeDizhi = getTimeDizhi(hour)
  const timeTianganIndex = (getTianganIndex(year) * 2 + Math.floor(hour / 2)) % 10
  const timeTiangan = TIANGAN[timeTianganIndex]

  return {
    yearPillar: { tiangan: yearTiangan, dizhi: yearDizhi },
    monthPillar: { tiangan: monthTiangan, dizhi: monthDizhi },
    dayPillar: { tiangan: dayTiangan, dizhi: dayDizhi },
    timePillar: { tiangan: timeTiangan, dizhi: timeDizhi },
  }
}

// 计算五行分布
export function calculateWuxing(bazi: {
  yearPillar: { tiangan: Tiangan; dizhi: Dizhi }
  monthPillar: { tiangan: Tiangan; dizhi: Dizhi }
  dayPillar: { tiangan: Tiangan; dizhi: Dizhi }
  timePillar: { tiangan: Tiangan; dizhi: Dizhi }
}): Record<Wuxing, number> {
  const elements: Record<Wuxing, number> = {
    '木': 0,
    '火': 0,
    '土': 0,
    '金': 0,
    '水': 0,
  }

  const pillars = [
    bazi.yearPillar,
    bazi.monthPillar,
    bazi.dayPillar,
    bazi.timePillar,
  ]

  for (const pillar of pillars) {
    elements[WUXING[pillar.tiangan] as Wuxing]++
    elements[WUXING[pillar.dizhi] as Wuxing]++
  }

  return elements
}

// 判断喜用神
export function determineGod(
  elements: Record<Wuxing, number>
): {
  strongElement: Wuxing
  weakElement: Wuxing
  usefulGod: Wuxing
  outputGod: Wuxing
} {
  const sorted = Object.entries(elements)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .map(([key, value]) => ({ element: key as Wuxing, count: value }))

  const strongElement = sorted[0].element
  const weakElement = sorted[sorted.length - 1].element

  // 喜用神：缺什么补什么（简化逻辑）
  const usefulGod = weakElement
  // 忌神：被克制的强项
  const outputGod = WUXING_KE[strongElement] as Wuxing

  return { strongElement, weakElement, usefulGod, outputGod }
}

// 获取五行对应的颜色
export function getWuxingColor(element: Wuxing): string {
  const colors: Record<Wuxing, string> = {
    '木': '#22c55e', // 绿色
    '火': '#ef4444', // 红色
    '土': '#f59e0b', // 黄色
    '金': '#94a3b8', // 白色/银色
    '水': '#3b82f6', // 蓝色
  }
  return colors[element]
}

// 获取五行对应的材质推荐
export function getRecommendedMaterials(usefulGod: Wuxing) {
  const materials = {
    '木': [
      { name: '绿幽灵', nameEn: 'Green Phantom', type: '水晶', benefit: '招财进宝，事业攀升' },
      { name: '青金石', nameEn: 'Lapis Lazuli', type: '水晶', benefit: '增强直觉，提升贵人运' },
      { name: '橄榄石', nameEn: 'Peridot', type: '水晶', benefit: '带来希望，好运连连' },
    ],
    '火': [
      { name: '南红玛瑙', nameEn: 'Red Agate', type: '玛瑙', benefit: '鸿运当头，财运旺盛' },
      { name: '红珊瑚', nameEn: 'Red Coral', type: '有机宝石', benefit: '热情活力，人缘极佳' },
      { name: '朱砂', nameEn: 'Cinnabar', type: '矿物', benefit: '辟邪化煞，护身保平安' },
    ],
    '土': [
      { name: '蜜蜡', nameEn: 'Amber', type: '有机宝石', benefit: '温润养生，提升整体运势' },
      { name: '黄玉', nameEn: 'Topaz', type: '宝石', benefit: '增强自信，吸引财富' },
      { name: '翡翠', nameEn: 'Jade', type: '玉石', benefit: '辟邪挡灾，平安吉祥' },
    ],
    '金': [
      { name: '白水晶', nameEn: 'Clear Quartz', type: '水晶', benefit: '净化磁场，提升专注力' },
      { name: '月光石', nameEn: 'Moonstone', type: '宝石', benefit: '柔化磁场，提升魅力' },
      { name: '黑曜石', nameEn: 'Obsidian', type: '火山玻璃', benefit: '辟邪化煞，挡小人' },
    ],
    '水': [
      { name: '海蓝宝', nameEn: 'Aquamarine', type: '宝石', benefit: '智慧之源，提升表达能力' },
      { name: '托帕石', nameEn: 'Topaz', type: '宝石', benefit: '增强自信，吸引正桃花' },
      { name: '天河石', nameEn: 'Amazonite', type: '矿石', benefit: '消除压力，带来平静' },
    ],
  } as const

  return materials[usefulGod]
}

// 格式化八字显示
export function formatBazi(bazi: {
  yearPillar: { tiangan: Tiangan; dizhi: Dizhi }
  monthPillar: { tiangan: Tiangan; dizhi: Dizhi }
  dayPillar: { tiangan: Tiangan; dizhi: Dizhi }
  timePillar: { tiangan: Tiangan; dizhi: Dizhi }
}): string {
  return `${bazi.yearPillar.tiangan}${bazi.yearPillar.dizhi}年 ${bazi.monthPillar.tiangan}${bazi.monthPillar.dizhi}月 ${bazi.dayPillar.tiangan}${bazi.dayPillar.dizhi}日 ${bazi.timePillar.tiangan}${bazi.timePillar.dizhi}时`
}
