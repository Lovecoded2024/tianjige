'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Send, Sparkles, User, Bot, Plus, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function MasterPage() {
  const t = useTranslations()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          history: messages.map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '施主，贫僧正在闭关修炼，稍后为您解惑。',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const welcomeMessage: Message = {
    id: 'welcome',
    role: 'assistant',
    content: '施主，贫僧在此恭候多时。\n\n天机阁汇聚五千年智慧，能为您推演命理、答疑解惑。\n\n有何困惑，尽管道来。',
    timestamp: new Date(),
  }

  const messageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
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
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-mystic-500/20 bg-gradient-to-r from-card to-mystic-500/5 p-6"
      >
        <div className="container mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <div className="relative">
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(139, 92, 246, 0.3)',
                    '0 0 40px rgba(139, 92, 246, 0.5)',
                    '0 0 20px rgba(139, 92, 246, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-mystic-500/20 to-gold-500/20"
              >
                <Sparkles className="h-7 w-7 text-mystic-400" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 ring-2 ring-background"
              />
            </div>
            <div>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-semibold"
              >
                天机阁大师
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-xs text-muted-foreground"
              >
                AI智能 · 随时在线 · 精通易经
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMessages([welcomeMessage])}
              className="border-mystic-500/30"
            >
              <Plus className="mr-2 h-4 w-4" />
              {t('master.newChat')}
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="container mx-auto max-w-3xl space-y-6">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mx-auto mb-6 rounded-full bg-gradient-to-br from-mystic-500/20 to-gold-500/20 p-8"
              >
                <MessageCircle className="h-16 w-16 text-mystic-400" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-3 text-2xl font-bold gradient-text"
              >
                {t('master.title')}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="max-w-md text-muted-foreground"
              >
                {t('master.subtitle')}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex flex-wrap justify-center gap-3"
              >
                {[
                  '我的财运如何？',
                  '今年运势怎么样？',
                  '适合做什么工作？',
                  '如何提升桃花运？',
                ].map((question, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setInput(question)}
                    className="rounded-full border border-mystic-500/30 bg-mystic-500/10 px-4 py-2 text-sm text-mystic-400 transition-colors hover:bg-mystic-500/20"
                  >
                    {question}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}

          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
                className={cn(
                  'flex space-x-4',
                  message.role === 'user' && 'flex-row-reverse'
                )}
              >
                {/* Avatar */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.1 }}
                  className={cn(
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-full',
                    message.role === 'assistant'
                      ? 'bg-gradient-to-br from-mystic-500/30 to-purple-600/30'
                      : 'bg-gradient-to-br from-gray-500/30 to-gray-600/30'
                  )}
                >
                  {message.role === 'assistant' ? (
                    <Sparkles className="h-6 w-6 text-mystic-400" />
                  ) : (
                    <User className="h-6 w-6 text-gray-400" />
                  )}
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: message.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className={cn(
                    'max-w-[80%] rounded-2xl px-6 py-4',
                    message.role === 'assistant'
                      ? 'rounded-tl-sm bg-gradient-to-br from-card to-mystic-500/5 border border-mystic-500/20'
                      : 'rounded-tr-sm bg-gradient-to-br from-mystic-600 to-purple-600 text-white'
                  )}
                >
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {message.content.split('\n').map((line, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className={cn(
                      'mt-3 text-xs',
                      message.role === 'user' ? 'text-white/60' : 'text-muted-foreground'
                    )}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex space-x-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-mystic-500/30 to-purple-600/30">
                <Sparkles className="h-6 w-6 text-mystic-400" />
              </div>
              <div className="flex items-center space-x-2 rounded-xl border border-mystic-500/20 bg-card/50 px-6 py-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="h-3 w-3 rounded-full bg-mystic-400"
                  />
                ))}
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-t border-mystic-500/20 bg-gradient-to-r from-card to-mystic-500/5 p-6"
      >
        <div className="container mx-auto max-w-3xl">
          <div className="relative flex items-end space-x-4">
            <motion.div
              whileFocus={{ scale: 1.01 }}
              className="flex-1"
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('master.placeholder')}
                rows={1}
                className="w-full resize-none rounded-2xl border border-mystic-500/30 bg-background/80 px-6 py-4 pr-14 text-foreground placeholder:text-muted-foreground focus:border-mystic-500 focus:outline-none focus:ring-2 focus:ring-mystic-500/20 transition-all"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                variant="mystic"
                size="icon"
                className="h-12 w-12 rounded-full"
              >
                <Send className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-center text-xs text-muted-foreground"
          >
            基于 MiniMax AI 模型 · 仅供娱乐参考
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}
