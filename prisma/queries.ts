import { PrismaClient, User, Baby } from '@prisma/client'

const prisma = new PrismaClient()

// Bom, só para contexto, eu ( Lucas ) acabei não usando tudo o que ta aqui,
// mas deixei com a justificativa que se eu for escalar, ja tem coisa pronta aqui.

// Jaja vou dormir, espero que tenha alguém lendo aqui, se tiver, um beijo e um abraço.


// --- Baby CRUD ---
export const createBaby = (data: Omit<Baby, 'id' | 'createdAt' | 'updatedAt'>) =>
  prisma.baby.create({ data })

export const getBaby = (id: string) => prisma.baby.findUnique({ where: { id } })

export const getBabiesByUserId = (userId: string) => prisma.baby.findMany({ where: { userId } })

export const getBabyById = (id: string) => prisma.baby.findUnique({ where: { id } })

export const updateBaby = (
  id: string,
  data: Partial<Omit<Baby, 'id' | 'createdAt' | 'updatedAt'>>
) => prisma.baby.update({ where: { id }, data })

export const deleteBaby = (id: string) => prisma.baby.delete({ where: { id } })

export const listBabies = () => prisma.baby.findMany()

// --- User CRUD ---
export const createUser = (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) =>
  prisma.user.create({ data })

export const getUser = (id: string) => prisma.user.findUnique({ where: { id } })

export const updateUser = (
  id: string,
  data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>
) => prisma.user.update({ where: { id }, data })

export const deleteUser = (id: string) => prisma.user.delete({ where: { id } })

export const listUsers = () => prisma.user.findMany()