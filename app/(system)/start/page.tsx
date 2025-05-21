'use client'

import { useBabiesActions, useSelectedBaby } from '@/stores/baby'
import { ArrowLeft } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import LlmCard from './components/llm-card'
import ContactCard from './components/contact-card'

export default function DiagnosticoPage() {
  const searchParams = useSearchParams()
  const babyId = searchParams.get('babyId')
  const router = useRouter()

  const selectedBaby = useSelectedBaby()
  const { setSelectedBaby } = useBabiesActions()
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false)

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

  const handleStartChat = async (testeId: string) => {
    try {
      setIsCreatingCheckout(true)
      const checkoutResponse = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ testeId, babyId }),
      })

      const stripeClient = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY as string)

      if (!stripeClient) throw new Error('Stripe failed to initialize.')

      const { sessionId } = await checkoutResponse.json()
      await stripeClient.redirectToCheckout({ sessionId })
    } catch (error) {
      console.error(error)
    } finally {
      setIsCreatingCheckout(false)
    }
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
        Nota: Para proteger a privacidade da sua prole plastificada, não armazenamos nenhuma
        informação médica.
      </p>
    </main>
  )
}
