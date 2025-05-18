import { openai } from '@ai-sdk/openai'
import { Baby } from '@prisma/client'
import { streamText, Message } from 'ai'
import { system_prompt } from '@/lib/ai/prompt'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, baby }: { messages: Message[]; baby: Baby } = await req.json()

  // Calcula idade em anos e meses
  const birthDate = new Date(baby.birthDate)
  const now = new Date()
  let years = now.getFullYear() - birthDate.getFullYear()
  let months = now.getMonth() - birthDate.getMonth()
  if (months < 0) {
    years--
    months += 12
  }

  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages,
    system:
      system_prompt +
      `
  Informações do paciente:
  - Nome: ${baby.name}
  - Idade: ${years > 0 ? `${years} ano${years > 1 ? 's' : ''}` : ''}${years > 0 && months > 0 ? ' e ' : ''}${months > 0 ? `${months} mês${months > 1 ? 'es' : ''}` : ''}
  - Altura: ${baby.height} cm
  - Peso: ${baby.weight} kg
  - Marca: ${baby.brand}
  - Notas: ${baby.notes}
  - Gênero: ${baby.gender}
  `,
  })

  return result.toDataStreamResponse()
}
