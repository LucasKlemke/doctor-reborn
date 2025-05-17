import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { getBabiesByUserId } from '@/prisma/queries'

// Nota: Este é um arquivo de exemplo para a API de bebês
// Em um aplicativo real, você usaria o Prisma/Drizzle para interagir com o banco de dados

// GET /api/babies - Obter todos os bebês do usuário logado
export async function GET() {
  try {
    const session = await getServerSession()
    console.log('Session:', session)

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Aqui você buscaria os bebês do banco de dados
    // const babies = await db.query...

    // Simulando dados para exemplo
    const babies = await getBabiesByUserId(session.user.id)

    return NextResponse.json(babies)
  } catch (error) {
    console.error('Erro ao buscar bebês:', error)
    return NextResponse.json({ error: 'Erro ao buscar bebês' }, { status: 500 })
  }
}

// POST /api/babies - Criar um novo bebê
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const data = await request.json()

    // Validação básica
    if (!data.name || !data.birthDate) {
      return NextResponse.json(
        { error: 'Nome e data de nascimento são obrigatórios' },
        { status: 400 }
      )
    }

    // Aqui você salvaria o bebê no banco de dados
    // const baby = await db.insert...

    // Simulando resposta para exemplo
    const baby = {
      id: Math.random().toString(36).substring(2, 9),
      ...data,
      userId: session.user.id,
    }

    return NextResponse.json(baby, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar bebê:', error)
    return NextResponse.json({ error: 'Erro ao criar bebê' }, { status: 500 })
  }
}
