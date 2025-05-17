import { getServerSession } from 'next-auth'
import Dashboard from './components/dashboard'
import { authOptions } from '@/app/(auth)/api/auth/[...nextauth]/route'
import { User } from '@prisma/client'

export default async function Page() {
  const session = await getServerSession(authOptions)
  console.log('session', session)

  if (session) {
    return <Dashboard user={session?.user as User} />
  }
}
