import { Button } from "@/components/ui/button"
import { Stethoscope } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Stethoscope className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-blue-900">Doctor Reborn</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-6 max-w-xl">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight">
            Diagnóstico infantil rápido e preciso com IA
          </h2>

          <p className="text-lg text-gray-700">
            Doctor Reborn utiliza inteligência artificial avançada para analisar fotos e descrições de sintomas,
            oferecendo diagnósticos preliminares para doenças infantis em segundos.
          </p>

          <div className="pt-4">
            <Link href="/start">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                Começar
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Não substitui a consulta médica. Sempre consulte um pediatra para diagnósticos oficiais.
          </p>
        </div>

        <div className="flex-1 flex justify-center">
          <Image
            src="/doctor-baby-illustration.png"
            width={400}
            height={400}
            alt="Ilustração de diagnóstico infantil"
            className="rounded-lg shadow-lg"
            priority
          />
        </div>
      </main>

      <footer className="container mx-auto py-4 text-center text-sm text-gray-500 border-t border-gray-100">
        © {new Date().getFullYear()} Doctor Reborn • Tecnologia a serviço da saúde infantil
      </footer>
    </div>
  )
}
