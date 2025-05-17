'use client'

import { useEffect } from 'react'
import { User } from '@prisma/client'
import { useBabiesActions } from '@/stores/baby'
import UserInforCard from './user-info-card'
import BabyList from './baby-list'

// Tipo para o usuári

export default function Dashboard({ user }: { user: User }) {
  const { setBabies } = useBabiesActions()

  useEffect(() => {
    const fetchBabies = async () => {
      const response = await fetch('/api/babies')
      const data = await response.json()
      setBabies(data)
    }

    fetchBabies()
  }, [])

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
