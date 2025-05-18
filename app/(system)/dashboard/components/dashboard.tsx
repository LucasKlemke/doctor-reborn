'use client'

import { useEffect, useState } from 'react'
import { User } from '@prisma/client'
import { useBabiesActions } from '@/stores/baby'
import UserInforCard from './user-info-card'
import BabyList from './baby-list'
import { Loader2 } from 'lucide-react'

export default function Dashboard({ user }: { user: User }) {
  const [isLoading, setIsLoading] = useState(false)
  const { setBabies } = useBabiesActions()

  useEffect(() => {
    const fetchBabies = async () => {
      setIsLoading(true)
      const response = await fetch('/api/babies')
      const data = await response.json()
      setBabies(data)
      setIsLoading(false)
    }

    fetchBabies()
  }, [])

  if (isLoading)
    return (
      <div className="col-span-2 mt-20 flex items-center justify-center">
        <Loader2 className="text-primary animate-spin" />
      </div>
    )

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Perfil do usuário */}
        <UserInforCard user={user} />
        {/* Lista de bebês */}
        <BabyList />
      </div>
    </main>
  )
}
