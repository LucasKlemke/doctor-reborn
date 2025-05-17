'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Baby, User } from '@prisma/client'
import { useBabies, useBabiesActions } from '@/stores/baby'
import UserInforCard from './user-info-card'
import BabyList from './baby-list'

// Tipo para o usuári

export default function Dashboard({ user }: { user: User }) {
  const { setBabies } = useBabiesActions()

  useEffect(() => {
    const fetchBabies = async () => {
      // Simulação de chamada à API para buscar os bebês do usuário
      const response = await fetch('/api/babies') // Substitua pela sua API real
      const data = await response.json()
      setBabies(data)
    }

    fetchBabies()
  }, [])

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Perfil do usuário */}
        <UserInforCard user={user} />

        {/* Lista de bebês */}
        <BabyList />
      </div>
    </main>
  )
}
