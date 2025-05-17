import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowLeft, Bot, MessageSquare } from 'lucide-react'
import Link from 'next/link'

export default function DiagnosticoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto py-6">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 transition-colors hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Voltar para página inicial</span>
        </Link>
      </header>

      <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-12">
        <h1 className="mb-8 text-center text-3xl font-bold text-blue-900 md:text-4xl">
          Como você prefere receber ajuda?
        </h1>

        <div className="grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="cursor-pointer border-2 transition-all hover:border-blue-400 hover:shadow-lg">
            <Link href="/chat">
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
            </Link>
          </Card>

          <Card className="cursor-pointer border-2 transition-all hover:border-green-400 hover:shadow-lg">
            <a href="https://wa.me/+5500000000000" target="_blank" rel="noopener noreferrer">
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
          Nota: O diagnóstico por IA é preliminar e não substitui a consulta médica profissional.
          Para casos urgentes, procure atendimento médico imediatamente.
        </p>
      </main>

      <footer className="container mx-auto border-t border-gray-100 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Doctor Reborn • Tecnologia a serviço da saúde infantil
      </footer>
    </div>
  )
}
