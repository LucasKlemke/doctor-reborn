import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Bot, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function DiagnosticoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto py-6">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Voltar para página inicial</span>
        </Link>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 text-center">
          Como você prefere receber ajuda?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          <Card className="border-2 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer">
            <Link href="/chat">
              <CardHeader className="text-center">
                <Bot className="w-16 h-16 mx-auto text-blue-600" />
                <CardTitle className="text-2xl mt-4">Inteligência Artificial</CardTitle>
                <CardDescription>Diagnóstico rápido por LLM</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">
                  Receba um diagnóstico preliminar instantâneo baseado em nossa tecnologia de IA avançada.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Iniciar diagnóstico por IA</Button>
              </CardFooter>
            </Link>
          </Card>

          <Card className="border-2 hover:border-green-400 hover:shadow-lg transition-all cursor-pointer">
            <a href="https://wa.me/+5500000000000" target="_blank" rel="noopener noreferrer">
              <CardHeader className="text-center">
                <MessageSquare className="w-16 h-16 mx-auto text-green-600" />
                <CardTitle className="text-2xl mt-4">Inteligência Humana</CardTitle>
                <CardDescription>Consulta com especialista via WhatsApp</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">
                  Converse diretamente com um de nossos especialistas em pediatria através do WhatsApp.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-green-600 hover:bg-green-700">Falar com especialista</Button>
              </CardFooter>
            </a>
          </Card>
        </div>

        <p className="text-sm text-gray-500 mt-12 text-center max-w-2xl">
          Nota: O diagnóstico por IA é preliminar e não substitui a consulta médica profissional. Para casos urgentes,
          procure atendimento médico imediatamente.
        </p>
      </main>

      <footer className="container mx-auto py-4 text-center text-sm text-gray-500 border-t border-gray-100">
        © {new Date().getFullYear()} Doctor Reborn • Tecnologia a serviço da saúde infantil
      </footer>
    </div>
  )
}
