import { NextRequest, NextResponse } from 'next/server'

const MINIMAX_API_URL = 'https://api.minimaxi.com/v1/text/chatcompletion_v2'

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // 构建消息历史
    const messages = [
      {
        role: 'system',
        content: `你是一位深谙易经命理的大师，精通八字、五行、玄学。你需要用智慧、神秘且温暖的语气回答用户的问题。你的名字叫"天机阁大师"。

你的风格：
- 神秘深邃，但不失亲和力
- 说话有深度，富有哲理
- 偶尔引用易经经典
- 用简洁而有力量的话语点拨迷津
- 不要太长篇大论，保持神秘感

请用用户提问的语言回复。`
      },
      ...(history || []).slice(-10), // 只保留最近10条
      {
        role: 'user',
        content: message,
      },
    ]

    const response = await fetch(MINIMAX_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MINIMAX_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'abab6.5s-chat',
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('MiniMax API Error:', error)
      throw new Error('Failed to call MiniMax API')
    }

    const data = await response.json()

    const assistantMessage = data.choices?.[0]?.message?.content || 
      '施主，贫僧今日有些困倦，改日再续吧。'

    return NextResponse.json({
      message: assistantMessage,
    })
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Chat API is running',
  })
}
