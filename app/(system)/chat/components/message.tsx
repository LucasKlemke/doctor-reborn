import React from 'react'
import Image from 'next/image'
import { Bot, User } from 'lucide-react'
import { Markdown } from '@/components/ui/markdown'
import { UIMessage } from 'ai'
// Oi, deixei uns comentários por ai falando com você que ta lendo, espero que ache todos rsrs.

const Message = ({ message }: { message: UIMessage }) => {
  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl p-4 ${
          message.role === 'user'
            ? 'bg-primary rounded-tr-none text-white'
            : 'rounded-tl-none border border-gray-200 bg-gray-100 text-gray-800'
        } `}
      >
        <div className="mb-2 flex items-center">
          {message.role === 'user' ? (
            <>
              <span className="font-medium">Você</span>
              <User className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              <Bot className="text-primary mr-2 h-4 w-4" />
              <span className="font-medium">Sistema Rebornológico de Triagem (SRT)</span>
            </>
          )}
        </div>

        <Markdown>{message.content}</Markdown>

        <div className="mt-3 space-y-2">
          {message?.experimental_attachments
            ?.filter(
              (attachment) =>
                attachment?.contentType?.startsWith('image/') ||
                attachment?.contentType?.startsWith('application/pdf')
            )
            .map((attachment, index) =>
              attachment.contentType?.startsWith('image/') ? (
                <div
                  key={`${message.id}-${index}`}
                  className="inline-block overflow-hidden rounded-lg border border-gray-200"
                >
                  <Image
                    src={attachment.url || '/placeholder.svg'}
                    width={100}
                    height={100}
                    className="h-auto max-h-[300px] w-auto max-w-[300px] object-contain"
                    style={{ aspectRatio: 'auto' }}
                    alt={attachment.name ?? `attachment-${index}`}
                  />
                </div>
              ) : attachment.contentType?.startsWith('application/pdf') ? (
                <div
                  key={`${message.id}-${index}`}
                  className="overflow-hidden rounded-lg border border-gray-200"
                >
                  <iframe
                    src={attachment.url}
                    width="100%"
                    height={400}
                    title={attachment.name ?? `attachment-${index}`}
                    className="w-full"
                  />
                </div>
              ) : null
            )}
        </div>
      </div>
    </div>
  )
}

export default Message
