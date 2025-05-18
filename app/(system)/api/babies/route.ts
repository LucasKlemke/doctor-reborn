import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { createBaby, getBabiesByUserId } from '@/prisma/queries'
import { User } from '@prisma/client'
import { authOptions } from '@/app/(auth)/api/auth/[...nextauth]/route'

// GET /api/babies - Obter todos os bebês do usuário logado
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    const user = session?.user as User

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Aqui você buscaria os bebês do banco de dados
    // const babies = await db.query...

    // Simulando dados para exemplo
    const babies = await getBabiesByUserId(user.id)

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

    const user = session?.user as User
    const data = await request.json()
    console.log('Dados recebidos:', data)

    data.userId = user.id // Adiciona o ID do usuário ao objeto de dados
    data.weight = parseFloat(data.weight) // Converte o peso para float
    data.height = parseFloat(data.height) // Converte a altura para float

    // Validação básica
    if (!data.name || !data.birthDate) {
      return NextResponse.json(
        { error: 'Nome e data de nascimento são obrigatórios' },
        { status: 400 }
      )
    }

    // Converte birthDate para Date se for string
    if (typeof data.birthDate === 'string') {
      data.birthDate = new Date(data.birthDate)
    }

    const newBaby = await createBaby(data)

    return NextResponse.json(newBaby, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar bebê:', error)
    return NextResponse.json({ error: 'Erro ao criar bebê' }, { status: 500 })
  }
}

// CAVALO
// _,,)\.~,,._
// (( `  ``)\))),,_
//  |      \ ''((\)))),,_
//  | ●    |   ''((\())) "-._______________-__.-"    `-.-,
//  |     .'\    ''))))'                                                 \)))
//  |     |   `.     ''                                                    ((((
//  \, _)     \/                                                       |))))
//   `'        |                                                         (((((
//             \                       |                                 ))))))
//              `|    |                ,\                               ((((((
//               |   / `-.__________________.<  \   |  )))))
//               |   |  /                                     `. \  \  ((((
//               |  / \ |                                       `.\  | (((
//               \  | | |                                           | |  ))
//                | | | |                                           || | ((
// 	       | | | |                                           || |
// 	       | | | |                                           || |
// 	       | | | |                                           || |
// 	       | | | |                                           || |
// 	    /_____|                                     /____|
