'use client'

import type React from 'react'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
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
import {  Loader2, ArrowRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

// Desculpa por ter deixado meio grande aqui, mas é que a IA que fez, fiz o melhor que eu pude.

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const router = useRouter()

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido'
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        toast('Email ou senha incorretos. Tente novamente.')
      } else {
        toast('Redirecionando para a página inicial...')
        router.push('/dashboard')
      }
    } catch (error) {
      toast('Ocorreu um erro inesperado. Tente novamente mais tarde.')
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="p-3">
            <img src="/logo_header.svg" alt="Doctor Reborn Logo" className="w-60" />
          </div>
        </div>

        <Card className="border-blue-100 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-chart-1 text-2xl font-bold">Entrar</CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar o Doctor Reborn
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? 'border-red-500' : ''}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  <>
                    Entrar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 border-t pt-4">
            <div className="text-center text-sm">
              <span className="text-gray-500">Não tem uma conta? </span>
              <Link href="/register" className="text-primary font-medium hover:underline">
                Cadastre-se
              </Link>
            </div>
            <Link
              href="/"
              className="text-primary mb-2 inline-flex items-center text-sm transition-colors"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              <span>Voltar para página inicial</span>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
