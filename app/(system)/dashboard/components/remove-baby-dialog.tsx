import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useBabiesActions } from '@/stores/baby'
import { Baby } from '@prisma/client'
import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

const RemoveBabyDialog = ({ selectedBaby }: { selectedBaby: Baby }) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { removeBaby } = useBabiesActions()

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await removeBaby(selectedBaby.id)

      toast.success('Bebê removido com sucesso!')
      setOpen(false)
    } catch (error) {
      toast('Erro ao remover bebê. Tente novamente mais tarde.')
      console.error('Error removing baby:', error)
    }
    setIsLoading(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)} asChild>
        <Button size={'icon'} variant={'destructive'} className="gap-2">
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar exclusão</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja remover {selectedBaby?.name} da sua lista? Esta ação não pode ser
            desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Removendo...' : 'Remover bebê'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RemoveBabyDialog
