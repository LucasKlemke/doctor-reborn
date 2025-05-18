'use client'

import type React from 'react'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FileImage, Paperclip, Send, X } from 'lucide-react'
import { ChatRequestOptions } from 'ai'

const MultiModalInput = ({
  input,
  isLoading,
  onChange,
  onSubmit,
}: {
  input: string
  isLoading: boolean
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void
  onSubmit: (
    event?: {
      preventDefault?: () => void
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void
}) => {
  const [files, setFiles] = useState<FileList | undefined>(undefined)

  // Lidar com seleção de arquvios
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files)
    }
  }

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Limpar arquivos selecionados
  const clearFiles = () => {
    setFiles(undefined)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Pegar o nome dos arquivos para exibir na tela
  const fileNames = files ? Array.from(files).map((file) => file.name) : []
  return (
    <div className="fixed right-0 bottom-0 left-0 border-t border-gray-200 bg-white p-4">
      <div className="container mx-auto max-w-4xl">
        {fileNames.length > 0 && (
          <div className="mb-2 rounded-lg bg-blue-50 p-2">
            <div className="flex items-center justify-between">
              <div className="text-primary flex items-center text-sm">
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
            onSubmit(event, { experimental_attachments: files })
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
              onChange={onChange}
            />
          </div>

          <Button
            type="submit"
            className="flex-shrink-0 rounded-full"
            disabled={isLoading || (!input.trim() && !files)}
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Enviar</span>
          </Button>
        </form>

        <p className="mt-2 text-center text-xs text-gray-500">
          Toda consulta é única e efêmera. Não guardamos registros. Nem mesmo o seu bebê.
        </p>
      </div>
    </div>
  )
}

export default MultiModalInput

// URSO FELIZ DANÇANDO
// ░░░░░░░░░░░░░░░░░░░░░░
// ░░░░░▄▄░░░░░░▄▄▄▄░░░░░
// ░░░▐▀▀▄█▀▀▀▀▀▒▄▒▀▌░░░░
// ░░░▐▒█▀▒▒▒▒▒▒▒▒▀█░░░░░
// ░░░░█▒▒▒▒▒▒▒▒▒▒▒▀▌░░░░
// ░░░░▌▒██▒▒▒▒██▒▒▒▐░░░░
// ░░░░▌▒▒▄▒██▒▄▄▒▒▒▐░░░░
// ░░░▐▒▒▒▀▄█▀█▄▀▒▒▒▒█▄░░
// ░░░▀█▄▒▒▐▐▄▌▌▒▒▄▐▄▐░░░
// ░░▄▀▒▒▄▒▒▀▀▀▒▒▒▒▀▒▀▄░░
// ░░█▒▀█▀▌▒▒▒▒▒▄▄▄▐▒▒▐░░
// ░░░▀▄▄▌▌▒▒▒▒▐▒▒▒▀▒▒▐░░
// ░░░░░░░▐▌▒▒▒▒▀▄▄▄▄▄▀░░
// ░░░░░░░░▐▄▒▒▒▒▒▒▒▒▐░░░
// ░░░░░░░░▌▒▒▒▒▄▄▒▒▒▐░░░
