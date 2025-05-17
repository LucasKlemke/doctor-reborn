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
  const babies = useBabies()
  const { setBabies } = useBabiesActions()

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const [selectedBaby, setSelectedBaby] = useState<Baby | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchBabies = async () => {
      // Simulação de chamada à API para buscar os bebês do usuário
      const response = await fetch('/api/babies') // Substitua pela sua API real
      const data = await response.json()
      setBabies(data)
    }

    fetchBabies()
  }, [])

  const handleEditBaby = async () => {
    if (!selectedBaby) return

    setIsLoading(true)

    try {
      // Em um app real, você enviaria os dados para a API
      const updatedBabies = babies.map((baby) =>
        baby.id === selectedBaby.id ? selectedBaby : baby
      )

      setBabies(updatedBabies)
      setIsEditDialogOpen(false)

      toast('Bebê atualizado com sucesso')
    } catch (error) {
      toast('Erro ao atualizar bebê')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Perfil do usuário */}
        <UserInforCard user={user} />

        {/* Lista de bebês */}
        <BabyList />
      </div>
      {/* Dialog para editar bebê */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar informações</DialogTitle>
            <DialogDescription>Atualize as informações do bebê.</DialogDescription>
          </DialogHeader>
          {selectedBaby && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nome completo</Label>
                <Input
                  id="edit-name"
                  value={selectedBaby.name}
                  onChange={(e) => setSelectedBaby({ ...selectedBaby, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-birthDate">Data de nascimento</Label>
                <Input
                  id="edit-birthDate"
                  type="date"
                  value={selectedBaby.birthDate}
                  onChange={(e) => setSelectedBaby({ ...selectedBaby, birthDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-gender">Sexo</Label>
                <Select
                  value={selectedBaby.gender}
                  onValueChange={(value) => setSelectedBaby({ ...selectedBaby, gender: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Masculino</SelectItem>
                    <SelectItem value="female">Feminino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-weight">Peso (kg)</Label>
                  <Input
                    id="edit-weight"
                    type="number"
                    step="0.1"
                    value={selectedBaby.weight}
                    onChange={(e) => setSelectedBaby({ ...selectedBaby, weight: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-height">Altura (cm)</Label>
                  <Input
                    id="edit-height"
                    type="number"
                    value={selectedBaby.height}
                    onChange={(e) => setSelectedBaby({ ...selectedBaby, height: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditBaby} disabled={isLoading}>
              {isLoading ? 'Salvando...' : 'Salvar alterações'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
