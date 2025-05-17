'use client'
import React from 'react'
import SignOutButton from './signout-button'
import { Stethoscope, User } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const Header = () => {
  const { data: session, status } = useSession()
  console.log(session?.user?.name)

  return (
    <header className="container mx-auto flex items-center justify-between py-6">
      <div className="flex items-center gap-2">
        <Stethoscope className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-blue-900">Doctor Reborn</h1>
      </div>
      {status !== 'loading' && (
        <>
          {session?.user?.email ? (
            <div className="flex items-center gap-3">
              <p className="flex items-center text-md text-gray-600">
                <User className="h-4 w-4" />
                Olá, <strong className="ml-1">{session?.user?.name}</strong>
              </p>
              <SignOutButton />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/signin">
                <Button>Entrar</Button>
              </Link>
              <Link href="/regiser">
                <Button variant="outline">Criar conta</Button>
              </Link>
            </div>
          )}{' '}
        </>
      )}
    </header>
  )
}

export default Header
