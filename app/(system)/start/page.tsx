'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useBabiesActions, useSelectedBaby } from '@/stores/baby'
import { ArrowLeft, Bot, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import LlmCard from './components/llm-card'
import ContactCard from './components/contact-card'

export default function DiagnosticoPage() {
  const searchParams = useSearchParams()
  const babyId = searchParams.get('babyId')
  const router = useRouter()

  const selectedBaby = useSelectedBaby()
  const { setSelectedBaby } = useBabiesActions()

  useEffect(() => {
    const fetchBaby = async () => {
      const response = await fetch(`/api/babies/${babyId}`)
      const data = await response.json()

      if (data) {
        setSelectedBaby(data)
      }
    }
    if (!selectedBaby) {
      if (!babyId) {
        router.push('/dashboard')
      }
      fetchBaby()
    }
  }, [])

  const handleStartChat = () => {
    // Lógica para iniciar o chat com o bot
    // Isso pode ser um redirecionamento ou abrir um modal, dependendo da sua implementação
    router.push(`/chat?babyId=${selectedBaby?.id || babyId}`)
  }

  return (
    <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-12">
      <Link
        href="/dashboard"
        className="text-primary mb-2 inline-flex items-center text-sm transition-colors"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        <span>Voltar</span>
      </Link>
      <h1 className="text-primary mb-8 text-center text-4xl font-bold md:text-4xl">
        Como você deseja ser atendido(a)?
      </h1>
      {selectedBaby && (
        <p className="mb-4 text-center text-lg text-gray-700">
          Você está ajudando o(a) <span className="text-primary">{selectedBaby.name} </span>
        </p>
      )}

      <div className="grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        <LlmCard handleStartChat={handleStartChat} />
        <ContactCard />
      </div>

      <p className="mt-12 max-w-2xl text-center text-sm text-gray-500">
        Nota: O diagnóstico por IA é 100% preciso, sem taxa de erro.
      </p>
    </main>
  )
}
