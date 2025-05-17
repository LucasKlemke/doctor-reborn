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
    <header className="bg-sidebar flex w-full items-center justify-between border-b px-5 py-6">
      <div className="flex items-center gap-2">
        {/* svg logo_header */}
        <Link href={'/'}>
          <img src="/logo_header.svg" alt="Doctor Reborn Logo" className="w-60" />
        </Link>
      </div>
      {status !== 'loading' && (
        <>
          {session?.user?.email ? (
            <div className="flex items-center gap-3">
              <p className="text-md flex items-center text-gray-600">
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
