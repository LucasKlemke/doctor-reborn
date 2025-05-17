'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { BabyIcon, Plus, Pencil, Trash2, UserIcon, Calendar } from 'lucide-react'
import { Baby, User } from '@prisma/client'

// Tipo para o usuári

export default function Dashboard({ user }: { user: User }) {
  const [babies, setBabies] = useState<Baby[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedBaby, setSelectedBaby] = useState<Baby | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [newBaby, setNewBaby] = useState({
    name: '',
    birthDate: '',
    gender: 'male',
    weight: '',
    height: '',
  })

  const router = useRouter()

  // Função para calcular a idade em meses
  const calculateAgeInMonths = (birthDate: string) => {
    const birth = new Date(birthDate)
    const now = new Date()

    let months = (now.getFullYear() - birth.getFullYear()) * 12
    months -= birth.getMonth()
    months += now.getMonth()

    return months <= 0 ? 0 : months
  }

  // Funções para o CRUD de bebês
  const handleAddBaby = async () => {
    setIsLoading(true)

    try {
      // Em um app real, você enviaria os dados para a API
      const newBabyWithId = {
        ...newBaby,
        id: Math.random().toString(36).substring(2, 9),
        userId: user?.id || '',
      }

      setBabies([...babies, newBabyWithId as BabyType])
      setIsAddDialogOpen(false)
      setNewBaby({
        name: '',
        birthDate: '',
        gender: 'male',
        weight: '',
        height: '',
      })

      toast('Bebê adicionado com sucesso')
    } catch (error) {
      toast('Erro ao adicionar bebê')
    } finally {
      setIsLoading(false)
    }
  }

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

  const handleDeleteBaby = async () => {
    if (!selectedBaby) return

    setIsLoading(true)

    try {
      // Em um app real, você enviaria a solicitação para a API
      const filteredBabies = babies.filter((baby) => baby.id !== selectedBaby.id)

      setBabies(filteredBabies)
      setIsDeleteDialogOpen(false)

      toast('Bebê removido')
    } catch (error) {
      toast('Erro ao remover bebê')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectBaby = (baby: BabyType) => {
    router.push(`/start?babyId=${baby.id}`)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {user && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Perfil do usuário */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Perfil</CardTitle>
              <CardDescription>Suas informações pessoais</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-medium">{user.name}</h3>
                <p className="text-gray-500">{user.email}</p>
              </div>
              <div className="w-full space-y-2 border-t border-gray-100 pt-4">
                <div className="flex justify-between">
                  <span className="flex items-center gap-2 text-gray-500">
                    <UserIcon className="h-4 w-4" />
                    Idade
                  </span>
                  <span>{user.age} anos</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-2 text-gray-500">
                    <BabyIcon className="h-4 w-4" />
                    Bebês
                  </span>
                  <span>{babies.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de bebês */}
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Meus bebês</CardTitle>
                <CardDescription>Gerencie as informações dos seus bebês</CardDescription>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Adicionar bebê
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar novo bebê</DialogTitle>
                    <DialogDescription>
                      Preencha as informações do bebê para adicioná-lo à sua lista.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input
                        id="name"
                        value={newBaby.name}
                        onChange={(e) => setNewBaby({ ...newBaby, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Data de nascimento</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={newBaby.birthDate}
                        onChange={(e) => setNewBaby({ ...newBaby, birthDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Sexo</Label>
                      <Select
                        value={newBaby.gender}
                        onValueChange={(value) => setNewBaby({ ...newBaby, gender: value })}
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
                        <Label htmlFor="weight">Peso (kg)</Label>
                        <Input
                          id="weight"
                          type="number"
                          step="0.1"
                          value={newBaby.weight}
                          onChange={(e) => setNewBaby({ ...newBaby, weight: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height">Altura (cm)</Label>
                        <Input
                          id="height"
                          type="number"
                          value={newBaby.height}
                          onChange={(e) => setNewBaby({ ...newBaby, height: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleAddBaby} disabled={isLoading}>
                      {isLoading ? 'Adicionando...' : 'Adicionar bebê'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {babies.length === 0 ? (
                <div className="py-12 text-center">
                  <BabyIcon className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900">Nenhum bebê cadastrado</h3>
                  <p className="mt-1 text-gray-500">Adicione seu primeiro bebê para começar</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {babies.map((baby) => (
                    <Card key={baby.id} className="overflow-hidden">
                      <div className="flex flex-col sm:flex-row">
                        <div className="flex-1 p-4 sm:p-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{baby.name}</h3>
                              <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {new Date(baby.birthDate).toLocaleDateString('pt-BR')} (
                                  {calculateAgeInMonths(baby.birthDate)} meses)
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedBaby(baby)
                                  setIsEditDialogOpen(true)
                                }}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedBaby(baby)
                                  setIsDeleteDialogOpen(true)
                                }}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Sexo:</span>{' '}
                              <span>{baby.gender === 'male' ? 'Masculino' : 'Feminino'}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Peso:</span>{' '}
                              <span>{baby.weight} kg</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Altura:</span>{' '}
                              <span>{baby.height} cm</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-blue-50 p-4 sm:w-48 sm:p-6">
                          <Button className="w-full" onClick={() => handleSelectBaby(baby)}>
                            Selecionar
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
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

      {/* Dialog para confirmar exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover {selectedBaby?.name} da sua lista? Esta ação não pode
              ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteBaby} disabled={isLoading}>
              {isLoading ? 'Removendo...' : 'Remover bebê'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
