import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { codigo } = await request.json();

    if (!codigo) {
      return NextResponse.json({ error: 'Nenhum código foi fornecido.' }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Modelo super rápido e inteligente
      messages: [
        {
          role: 'system',
          content: 'Você é um revisor de código experiente, focado e muito didático. Analise o código enviado pelo usuário, diga se há erros, pontos de melhoria, problemas de segurança e dê uma nota de 0 a 10. Responda em português de forma clara e amigável usando markdown.',
        },
        {
          role: 'user',
          content: `Analise este código:\n\n\`\`\`\n${codigo}\n\`\`\``,
        },
      ],
    });

    const resultadoAI = response.choices[0].message.content;
    return NextResponse.json({ resultado: resultadoAI });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao conversar com a IA.' }, { status: 500 });
  }
}