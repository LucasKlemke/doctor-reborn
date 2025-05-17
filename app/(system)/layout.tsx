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
    </AuthGuard>
  )
}
