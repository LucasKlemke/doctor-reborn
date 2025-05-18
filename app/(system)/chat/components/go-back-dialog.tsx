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
import { ArrowLeft, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

const GoBackDialog = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  // Função para encerrar a consulta ( ativada pela modal de confirmação ao clicar em "Voltar")
  const handleGoBack = () => {
    toast('A consulta foi encerrada.')
    router.push('/dashboard')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)} asChild>
        <span className="text-primary inline-flex cursor-pointer items-center transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Voltar</span>
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja encerrar a consulta ?</DialogTitle>
          <DialogDescription>
            Em conformidade com a Lei da Rebornologia Ética, não armazenamos diagnósticos ou
            históricos de atendimento, ou seja, não será possível retomar a consulta.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleGoBack}>
            <LogOut /> {'Encerrar consulta'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default GoBackDialog
