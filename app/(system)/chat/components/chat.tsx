'use client'

import { useChat } from '@ai-sdk/react'
import { useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import Message from './message'
import GoBackDialog from './go-back-dialog'
import MultiModalInput from './multimodal-input'
import EmptyChatMessage from './empty-chat-message'
import { Baby } from '@prisma/client'

export default function Chat({ selectedBaby }: { selectedBaby: Baby }) {
  // useStates para lidar com lógica de chat
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    body: {
      baby: selectedBaby,
    },
  })

  // UseEffect para lidar com o scroll quando o array de mensagens mudar
  const messagesEndRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    scrollToBottom()
  }, [messages, isLoading])

  return (
    <div className="flex flex-col overflow-scroll bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto border-b border-gray-100 px-4 py-4">
        <div className="flex items-center justify-between">
          <GoBackDialog />
          <div className="flex items-center gap-2">
            <span className="text-chart-1 font-bold">Paciente:</span>
            <span className="text-primary">{selectedBaby?.name}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto flex flex-1 flex-col px-4 py-4">
        <Card className="mb-20 h-[800px] overflow-y-auto bg-white/80 p-4">
          {messages.length === 0 ? (
            <EmptyChatMessage
              title={` O que está acontecendo com ${selectedBaby?.name}?`}
              description="Descreva os sintomas do bebê e envie fotos relevantes para obter um diagnóstico
                preliminar."
            />
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <Message key={`message-${message.id}`} message={message} />
              ))}
              {isLoading && (
                <div className="text-primary my-4 flex justify-center">
                  <Loader2 className="animate-spin" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </Card>
      </main>

      <MultiModalInput
        isLoading={isLoading}
        input={input}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
