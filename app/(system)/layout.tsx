import AuthGuard from '@/components/auth-guard'
import Header from '@/components/header'

// export const metadata: Metadata = {
//   title: 'Doctor Reborn',
//   description: 'Uma IA especializada em cuidados, dicas e informações para bebês reborn.',
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white">
        <Header />
        {children}
      </div>
      <footer className="container mx-auto border-t border-gray-100 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Doctor Reborn • Tecnologia a serviço da saúde infantil
      </footer>
    </AuthGuard>
  )
}
