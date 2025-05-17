import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const publicRoutes = ['/signin', '/register', '/']

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  const isPublic = publicRoutes.includes(req.nextUrl.pathname)

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/signin', req.url))
  }

  return NextResponse.next()
}
