"use client"

import type React from "react"

import { useChat } from "@ai-sdk/react"
import { useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Bot, FileImage, Paperclip, Send, User, X } from "lucide-react"
import Link from "next/link"
import { Markdown } from "@/components/ui/markdown"

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const [files, setFiles] = useState<FileList | undefined>(undefined)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
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
      fileInputRef.current.value = ""
    }
  }

  // Get file names for display
  const fileNames = files ? Array.from(files).map((file) => file.name) : []

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto py-4 px-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <Link
            href="/start"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Voltar</span>
          </Link>
          <h1 className="text-xl font-bold text-blue-900">Doctor Reborn AI</h1>
          <div className="w-20"></div> {/* Spacer for alignment */}
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-4 flex flex-col">
        <Card className="flex-1 p-4 mb-20 overflow-y-auto max-h-[calc(100vh-220px)] bg-white/80">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 text-gray-500">
              <Bot className="h-16 w-16 text-blue-300 mb-4" />
              <h2 className="text-xl font-medium text-blue-900 mb-2">Bem-vindo ao Doctor Reborn AI</h2>
              <p className="max-w-md">
                Descreva os sintomas do bebê e envie fotos relevantes para obter um diagnóstico preliminar. Lembre-se
                que este é apenas um auxílio e não substitui a consulta médica.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`
                      max-w-[80%] rounded-2xl p-4 
                      ${
                        m.role === "user"
                          ? "bg-blue-600 text-white rounded-tr-none"
                          : "bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200"
                      }
                    `}
                  >
                    <div className="flex items-center mb-2">
                      {m.role === "user" ? (
                        <>
                          <span className="font-medium">Você</span>
                          <User className="h-4 w-4 ml-2" />
                        </>
                      ) : (
                        <>
                          <Bot className="h-4 w-4 mr-2 text-blue-600" />
                          <span className="font-medium">Doctor Reborn AI</span>
                        </>
                      )}
                    </div>

                    <Markdown >{m.content}</Markdown>

                    <div className="mt-3 space-y-2">
                        {m?.experimental_attachments
              ?.filter(
                attachment =>
                  attachment?.contentType?.startsWith('image/') ||
                  attachment?.contentType?.startsWith('application/pdf'),
              )
              .map((attachment, index) =>
                attachment.contentType?.startsWith('image/') ? (
                              <div
                                key={`${m.id}-${index}`}
                                 className="rounded-lg overflow-hidden border border-gray-200 inline-block"
                              >
                                <Image
                                  src={attachment.url || "/placeholder.svg"}
                                  width={100}
                                  height={100}
                                  className="max-w-[300px] max-h-[300px] w-auto h-auto object-contain"
                                  style={{ aspectRatio: "auto" }}
                                  alt={attachment.name ?? `attachment-${index}`}
                                />
                              </div>
                            ) : attachment.contentType?.startsWith("application/pdf") ? (
                              <div
                                key={`${m.id}-${index}`}
                                className="rounded-lg overflow-hidden border border-gray-200"
                              >
                                <iframe
                                  src={attachment.url}
                                  width="100%"
                                  height={400}
                                  title={attachment.name ?? `attachment-${index}`}
                                  className="w-full"
                                />
                              </div>
                            ) : null,
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

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="container mx-auto max-w-4xl">
          {fileNames.length > 0 && (
            <div className="mb-2 p-2 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-blue-700">
                  <FileImage className="h-4 w-4 mr-2" />
                  <span>{fileNames.length} arquivo(s) selecionado(s)</span>
                </div>
                <Button variant="ghost" size="sm" onClick={clearFiles} className="h-6 w-6 p-0 rounded-full">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-1 text-xs text-gray-500 truncate">{fileNames.join(", ")}</div>
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
              className="rounded-full flex-shrink-0"
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
                className="w-full p-3 pr-12 rounded-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={input}
                placeholder="Descreva os sintomas ou faça uma pergunta..."
                onChange={handleInputChange}
              />
            </div>

            <Button
              type="submit"
              className="rounded-full bg-blue-600 hover:bg-blue-700 flex-shrink-0"
              disabled={isLoading || (!input.trim() && !files)}
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">Enviar</span>
            </Button>
          </form>

          <p className="text-xs text-gray-500 mt-2 text-center">
            Este diagnóstico é preliminar. Consulte sempre um médico para avaliação profissional.
          </p>
        </div>
      </div>
    </div>
  )
}
