import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { deleteBaby, getBabyById, updateBaby } from '@/prisma/queries'

// GET /api/babies/[id] - Obter um bebê específico
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession()

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }
    const { id } = params
    const baby = await getBabyById(id)

    return NextResponse.json(baby)
  } catch (error) {
    console.error(`Erro ao buscar bebê ${params.id}:`, error)
    return NextResponse.json({ error: 'Erro ao buscar bebê' }, { status: 500 })
  }
}

// PUT /api/babies/[id] - Atualizar um bebê
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession()
    const { id } = await params

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const data = await request.json()
    data.weight = parseFloat(data.weight) // Converte o peso para float
    data.height = parseFloat(data.height) // Converte a altura para float
    if (typeof data.birthDate === 'string') {
      data.birthDate = new Date(data.birthDate)
    }
    // Validação básica
    if (!data.name || !data.birthDate) {
      return NextResponse.json(
        { error: 'Nome e data de nascimento são obrigatórios' },
        { status: 400 }
      )
    }

    const updatedBaby = await updateBaby(id, data)

    return NextResponse.json(updatedBaby)
  } catch (error) {
    console.error(`Erro ao atualizar bebê ${params.id}:`, error)
    return NextResponse.json({ error: 'Erro ao atualizar bebê' }, { status: 500 })
  }
}

// DELETE /api/babies/[id] - Excluir um bebê
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession()
    const { id } = await params

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    await deleteBaby(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Erro ao excluir bebê :`, error)
    return NextResponse.json({ error: 'Erro ao excluir bebê' }, { status: 500 })
  }
}
