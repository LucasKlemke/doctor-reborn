import type { Metadata } from 'next'
import AuthGuard from '@/components/auth-guard'
import { Stethoscope } from 'lucide-react'
import SignOutButton from '@/components/signout-button'

export const metadata: Metadata = {
  title: 'Doctor Reborn',
  description: 'Uma IA especializada em cuidados, dicas e informações para bebês reborn.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white">
        <header className="container mx-auto flex items-center justify-between py-6">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-900">Doctor Reborn</h1>
          </div>
          <SignOutButton />
        </header>
        {children}
      </div>
      <footer className="container mx-auto border-t border-gray-100 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Doctor Reborn • Tecnologia a serviço da saúde infantil
      </footer>
    </AuthGuard>
  )
}
