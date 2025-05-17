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
        className="mb-2 inline-flex items-center text-sm text-blue-600 transition-colors hover:text-blue-800"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        <span>Voltar</span>
      </Link>
      <h1 className="mb-8 text-center text-3xl font-bold text-blue-900 md:text-4xl">
        Como você prefere receber ajuda?
      </h1>
      {selectedBaby && (
        <p className="mb-4 text-center text-lg text-gray-700">
          Você está ajudando o(a) {selectedBaby.name}{' '}
        </p>
      )}

      <div className="grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        <Card
          onClick={handleStartChat}
          className="cursor-pointer border-2 transition-all hover:border-blue-400 hover:shadow-lg"
        >
          <CardHeader className="text-center">
            <Bot className="mx-auto h-16 w-16 text-blue-600" />
            <CardTitle className="mt-4 text-2xl">Inteligência Artificial</CardTitle>
            <CardDescription>Diagnóstico rápido por LLM</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">
              Receba um diagnóstico preliminar instantâneo baseado em nossa tecnologia de IA
              avançada.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Iniciar diagnóstico por IA
            </Button>
          </CardFooter>
        </Card>

        <Card className="cursor-pointer border-2 transition-all hover:border-green-400 hover:shadow-lg">
          <a
            href={`https://wa.me/+554796589979?text=${encodeURIComponent('Olá, doutor(a)!\nPreciso de ajuda com meu filho(a). Você poderia me orientar, por favor?\nAgradeço desde já pela atenção.')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CardHeader className="text-center">
              <MessageSquare className="mx-auto h-16 w-16 text-green-600" />
              <CardTitle className="mt-4 text-2xl">Inteligência Humana</CardTitle>
              <CardDescription>Consulta com especialista via WhatsApp</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600">
                Converse diretamente com um de nossos especialistas em pediatria através do
                WhatsApp.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Falar com especialista
              </Button>
            </CardFooter>
          </a>
        </Card>
      </div>

      <p className="mt-12 max-w-2xl text-center text-sm text-gray-500">
        Nota: O diagnóstico por IA é 100% preciso, sem taxa de erro.
      </p>
    </main>
  )
}
