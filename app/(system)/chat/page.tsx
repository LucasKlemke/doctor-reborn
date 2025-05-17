'use client'

import type React from 'react'

import { useChat } from '@ai-sdk/react'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Bot, FileImage, Paperclip, Send, User, X } from 'lucide-react'
import Link from 'next/link'
import { Markdown } from '@/components/ui/markdown'
import AuthGuard from '@/components/auth-guard'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const [files, setFiles] = useState<FileList | undefined>(undefined)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Effect to scroll to bottom when messages change
  useState(() => {
    scrollToBottom()
  })

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files)
    }
  }

  // Clear selected files
  const clearFiles = () => {
    setFiles(undefined)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Get file names for display
  const fileNames = files ? Array.from(files).map((file) => file.name) : []

  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white">
        <header className="container mx-auto border-b border-gray-100 px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/start"
              className="inline-flex items-center text-blue-600 transition-colors hover:text-blue-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Voltar</span>
            </Link>
            <h1 className="text-xl font-bold text-blue-900">Doctor Reborn AI</h1>
            <div className="w-20"></div> {/* Spacer for alignment */}
          </div>
        </header>

        <main className="container mx-auto flex flex-1 flex-col px-4 py-4">
          <Card className="mb-20 max-h-[calc(100vh-220px)] flex-1 overflow-y-auto bg-white/80 p-4">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center p-6 text-center text-gray-500">
                <Bot className="mb-4 h-16 w-16 text-blue-300" />
                <h2 className="mb-2 text-xl font-medium text-blue-900">
                  Bem-vindo ao Doctor Reborn AI
                </h2>
                <p className="max-w-md">
                  Descreva os sintomas do bebê e envie fotos relevantes para obter um diagnóstico
                  preliminar.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        m.role === 'user'
                          ? 'rounded-tr-none bg-blue-600 text-white'
                          : 'rounded-tl-none border border-gray-200 bg-gray-100 text-gray-800'
                      } `}
                    >
                      <div className="mb-2 flex items-center">
                        {m.role === 'user' ? (
                          <>
                            <span className="font-medium">Você</span>
                            <User className="ml-2 h-4 w-4" />
                          </>
                        ) : (
                          <>
                            <Bot className="mr-2 h-4 w-4 text-blue-600" />
                            <span className="font-medium">Doctor Reborn AI</span>
                          </>
                        )}
                      </div>

                      <Markdown>{m.content}</Markdown>

                      <div className="mt-3 space-y-2">
                        {m?.experimental_attachments
                          ?.filter(
                            (attachment) =>
                              attachment?.contentType?.startsWith('image/') ||
                              attachment?.contentType?.startsWith('application/pdf')
                          )
                          .map((attachment, index) =>
                            attachment.contentType?.startsWith('image/') ? (
                              <div
                                key={`${m.id}-${index}`}
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
                                key={`${m.id}-${index}`}
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
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </Card>
        </main>

        <div className="fixed right-0 bottom-0 left-0 border-t border-gray-200 bg-white p-4">
          <div className="container mx-auto max-w-4xl">
            {fileNames.length > 0 && (
              <div className="mb-2 rounded-lg bg-blue-50 p-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-blue-700">
                    <FileImage className="mr-2 h-4 w-4" />
                    <span>{fileNames.length} arquivo(s) selecionado(s)</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFiles}
                    className="h-6 w-6 rounded-full p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-1 truncate text-xs text-gray-500">{fileNames.join(', ')}</div>
              </div>
            )}

            <form
              className="flex items-center gap-2"
              onSubmit={(event) => {
                handleSubmit(event, {
                  experimental_attachments: files,
                })
                clearFiles()
              }}
            >
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="flex-shrink-0 rounded-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="h-5 w-5 text-gray-500" />
                <span className="sr-only">Anexar arquivos</span>
              </Button>

              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                multiple
                ref={fileInputRef}
                accept="image/*,application/pdf"
              />

              <div className="relative flex-1">
                <input
                  className="focus:ring-opacity-50 w-full rounded-full border border-gray-300 p-3 pr-12 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  value={input}
                  placeholder="Descreva os sintomas ou faça uma pergunta..."
                  onChange={handleInputChange}
                />
              </div>

              <Button
                type="submit"
                className="flex-shrink-0 rounded-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading || (!input.trim() && !files)}
              >
                <Send className="h-5 w-5" />
                <span className="sr-only">Enviar</span>
              </Button>
            </form>

            <p className="mt-2 text-center text-xs text-gray-500">
              Este diagnóstico é preliminar. Consulte sempre um médico para avaliação profissional.
            </p>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
