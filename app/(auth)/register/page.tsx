'use client'

import type React from 'react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Stethoscope, Loader2, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

type FormData = {
  name: string
  email: string
  age: string
  role: string
  password: string
  confirmPassword: string
}

type FormErrors = {
  name?: string
  email?: string
  age?: string
  role?: string
  password?: string
  confirmPassword?: string
}

export default function RegisterPage() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    age: '',
    role: 'PARENT',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = () => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!form.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
    }

    // Email validation
    if (!form.email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email inválido'
    }

    // Age validation
    if (!form.age) {
      newErrors.age = 'Idade é obrigatória'
    } else {
      const ageNum = Number(form.age)
      if (isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
        newErrors.age = 'Idade inválida'
      }
    }

    // Role validation
    if (!form.role) {
      newErrors.role = 'Selecione uma opção'
    }

    // Password validation
    if (!form.password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (form.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
    }

    // Confirm password validation
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Confirme sua senha'
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, age: Number(form.age) }),
      })

      if (res.ok) {
        toast('Você já pode fazer login com suas credenciais.')
        router.push('/signin')
      } else {
        const data = await res.json().catch(() => ({ error: 'Erro desconhecido' }))
        toast('Não foi possível completar o cadastro. Tente novamente.')
      }
    } catch (error) {
      toast('Ocorreu um erro inesperado. Tente novamente mais tarde.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-blue-600 p-3">
            <Stethoscope className="h-8 w-8 text-white" />
          </div>
        </div>

        <Card className="border-blue-100 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-blue-900">Criar conta</CardTitle>
            <CardDescription>
              Preencha os dados abaixo para se cadastrar no Doctor Reborn
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Digite seu nome completo"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="seu@email.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Idade</Label>
                  <Input
                    id="age"
                    type="number"
                    value={form.age}
                    onChange={(e) => handleChange('age', e.target.value)}
                    placeholder="Sua idade"
                    min="1"
                    max="120"
                    className={errors.age ? 'border-red-500' : ''}
                  />
                  {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Você é</Label>
                  <Select value={form.role} onValueChange={(value) => handleChange('role', value)}>
                    <SelectTrigger id="role" className={errors.role ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PARENT">Pai</SelectItem>
                      <SelectItem value="MOTHER">Mãe</SelectItem>
                      <SelectItem value="OTHER">Outro responsável</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="••••••••"
                  className={errors.password ? 'border-red-500' : ''}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="••••••••"
                  className={errors.confirmPassword ? 'border-red-500' : ''}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cadastrando...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Criar conta
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 border-t pt-4">
            <div className="text-center text-sm">
              <span className="text-gray-500">Já tem uma conta? </span>
              <Link href="/signin" className="font-medium text-blue-600 hover:underline">
                Faça login
              </Link>
            </div>

            <div className="text-center">
              <Link href="/" className="text-sm text-gray-500 hover:text-blue-600">
                Voltar para página inicial
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
