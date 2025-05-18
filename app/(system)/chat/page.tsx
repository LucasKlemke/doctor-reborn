'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import Chat from './components/chat'
import { useBabiesActions, useSelectedBaby } from '@/stores/baby'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export default function Page() {
  const router = useRouter()

  // Pega o id do bebê da URL
  const searchParams = useSearchParams()
  const babyId = searchParams.get('babyId')

  // Pega o bebê selecionado do estado global pelo Zustand
  const selectedBaby = useSelectedBaby()
  const { setSelectedBaby } = useBabiesActions()

  // UseEffect para pegar os dados do bebê pela URL
  useEffect(() => {
    const fetchBaby = async () => {
      const response = await fetch(`/api/babies/${babyId}`)
      const data = await response.json()

      if (data) {
        setSelectedBaby(data)
      }
    }

    // Caso não encontre o bebê selecionado pelo estado global,
    // pega o id do bebê pela URL e faz uma requisição para pegar os dados do bebê
    if (!selectedBaby) {
      if (!babyId) {
        // Se não houver id do bebê na URL, redireciona para o dashboard para selecionar um bebê
        // assim impedindo que o usuário inicie uma consulta sem ter um bebê selecionado
        toast('Selecione um bebê para iniciar a consulta.')
        router.push('/dashboard')
      }
      fetchBaby()
    }
  }, [])

  return (
    <>
      {selectedBaby ? (
        <Chat selectedBaby={selectedBaby} />
      ) : (
        <Loader2 className="text-primary mx-auto mt-20 animate-spin" />
      )}
    </>
  )
}
