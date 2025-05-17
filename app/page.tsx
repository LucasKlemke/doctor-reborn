'use client'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="container mx-auto flex flex-1 flex-col items-center justify-between gap-12 px-4 py-12 md:flex-row">
        <div className="max-w-xl flex-1 space-y-6">
          <h2 className="text-4xl leading-tight font-bold text-blue-900 md:text-5xl">
            Diagnóstico infantil rápido e preciso com IA
          </h2>

          <p className="text-lg text-gray-700">
            Doctor Reborn utiliza inteligência artificial avançada para analisar fotos e descrições
            de sintomas, oferecendo diagnósticos preliminares para doenças infantis em segundos.
          </p>

          <div className="pt-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-blue-600 px-8 py-6 text-lg hover:bg-blue-700">
                Começar
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-1 justify-center">
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
    </div>
  )
}
