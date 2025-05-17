import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  const { email, password, confirmPassword, name, age, role } = await req.json()

  if (password !== confirmPassword)
    return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 })

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return NextResponse.json({ error: 'Email already registered' }, { status: 400 })

  const hashed = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { email, password: hashed, name, age: Number(age), role },
  })

  return NextResponse.json({ success: true, userId: user.id })
}
