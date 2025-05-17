// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

import bcrypt from 'bcrypt'
import type { JWT } from 'next-auth/jwt'
import type { Session } from 'next-auth'
import { User } from '@prisma/client'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt' as const,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email || '' },
        })

        console.log('user', user)

        if (!user || !user.password) return null

        const isValid = await bcrypt.compare(credentials?.password || '', user.password)
        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          password: user.password,
          name: user.name,
          age: user.age,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.age = user.age
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        // @ts-expect-error
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        // @ts-expect-error
        session.user.age = token.age
        // @ts-expect-error
        session.user.role = token.role
      }
      return session
    },
  },
}

// @ts-ignore
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
