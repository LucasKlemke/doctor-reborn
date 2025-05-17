import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

// GET /api/babies/[id] - Obter um bebê específico
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession()

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const id = params.id

    // Aqui você buscaria o bebê do banco de dados
    // const baby = await db.query...

    // Simulando dados para exemplo
    const baby = {
      id,
      name: 'João Silva',
      birthDate: '2023-05-10',
      gender: 'male',
      weight: '3.8',
      height: '52',
      userId: session.user.id,
    }

    // Verificar se o bebê pertence ao usuário logado
    if (baby.userId !== session.user.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
    }

    return NextResponse.json(baby)
  } catch (error) {
    console.error(`Erro ao buscar bebê ${params.id}:`, error)
    return NextResponse.json({ error: 'Erro ao buscar bebê' }, { status: 500 })
  }
}

// PUT /api/babies/[id] - Atualizar um bebê
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession()

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const id = params.id
    const data = await request.json()

    // Validação básica
    if (!data.name || !data.birthDate) {
      return NextResponse.json(
        { error: 'Nome e data de nascimento são obrigatórios' },
        { status: 400 }
      )
    }

    // Aqui você verificaria se o bebê existe e pertence ao usuário
    // const existingBaby = await db.query...

    // Simulando verificação
    const existingBaby = {
      id,
      userId: session.user.id,
    }

    if (existingBaby.userId !== session.user.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
    }

    // Aqui você atualizaria o bebê no banco de dados
    // const updatedBaby = await db.update...

    // Simulando resposta
    const updatedBaby = {
      id,
      ...data,
      userId: session.user.id,
    }

    return NextResponse.json(updatedBaby)
  } catch (error) {
    console.error(`Erro ao atualizar bebê ${params.id}:`, error)
    return NextResponse.json({ error: 'Erro ao atualizar bebê' }, { status: 500 })
  }
}

// DELETE /api/babies/[id] - Excluir um bebê
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const id = params.id

    // Aqui você verificaria se o bebê existe e pertence ao usuário
    // const existingBaby = await db.query...

    // Simulando verificação
    const existingBaby = {
      id,
      userId: session.user.id,
    }

    if (existingBaby.userId !== session.user.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
    }

    // Aqui você excluiria o bebê do banco de dados
    // await db.delete...

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Erro ao excluir bebê ${params.id}:`, error)
    return NextResponse.json({ error: 'Erro ao excluir bebê' }, { status: 500 })
  }
}
