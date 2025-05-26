import { NextRequest, NextResponse } from 'next/server'
import { deleteUserByEmail } from '@/prisma/queries'

// DELETE /api/user/[id] - Excluir um usuário
export async function DELETE(request: NextRequest, { params }: { params: { email: string } }) {
  try {
    const { email } = await params

    await deleteUserByEmail(email)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Erro ao excluir bebê :`, error)
    return NextResponse.json({ error: 'Erro ao excluir usuário' }, { status: 500 })
  }
}
