'use client'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="container mx-auto flex flex-1 flex-col items-center justify-between gap-12 px-4 py-12 md:flex-row">
        <motion.div
          className="max-w-xl flex-1 space-y-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2 className="text-chart-1 text-4xl leading-tight font-bold md:text-5xl">
            Diagnóstico Reborn Preciso e rápido
          </h2>

          <p className="text-chart-1 text-lg">
            Realize o atendimento do seu bebê em poucos minutos e fuja dos postos de saúde
            exclusivos.
          </p>

          <div className="pt-4">
            <Link href="/dashboard">
              <Button size="lg">Começar</Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="invisible flex flex-1 justify-center md:visible"
        >
          <Image
            src="/doctor_initial.png"
            width={400}
            height={400}
            alt="Ilustração de diagnóstico infantil"
            className="rounded-lg shadow-lg"
            priority
          />
        </motion.div>
      </main>
    </div>
  )
}
