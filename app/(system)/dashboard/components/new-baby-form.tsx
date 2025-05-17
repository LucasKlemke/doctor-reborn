import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBabiesActions } from '@/stores/baby'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { toast } from 'sonner'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

export const formSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres.' }),
  birthDate: z.string().min(1, { message: 'Data de nascimento é obrigatória.' }),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER'], { required_error: 'Sexo é obrigatório.' }),
  brand: z.string().optional(),
  weight: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Peso deve ser um número positivo.',
  }),
  height: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Altura deve ser um número positivo.',
  }),
  notes: z.string().optional(),
})

const NewBabyFormButton = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      birthDate: '',
      gender: undefined,
      brand: '',
      weight: '',
      height: '',
      notes: '',
    },
  })
  const { addBaby } = useBabiesActions()
  const [isLoading, setIsLoading] = useState(false)

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      await addBaby(values)
      setOpen(false)
      toast('Novo bebê adicionado com sucesso!')
    } catch (e) {
      toast('Erro ao adicionar bebê')
      console.error(e)
    }
    setIsLoading(false)
  }

  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)} asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Adicionar bebê
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar novo dependente</DialogTitle>
          <DialogDescription>
            Preencha as informações do bebê para adicioná-lo à sua lista.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do bebê" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de nascimento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sexo</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Masculino</SelectItem>
                        <SelectItem value="FEMALE">Feminino</SelectItem>
                        <SelectItem value="OTHER">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <FormControl>
                    <Input placeholder="Marca (opcional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" placeholder="Peso" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Altura (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" placeholder="Altura" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Observações (opcional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit">
              {isLoading ? 'Adicionando...' : 'Adicionar bebê'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default NewBabyFormButton
