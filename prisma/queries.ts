import { PrismaClient, User, Baby, Chat, Message } from '@prisma/client'

const prisma = new PrismaClient()

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

// --- Baby CRUD ---
export const createBaby = (data: Omit<Baby, 'id' | 'createdAt' | 'updatedAt'>) =>
  prisma.baby.create({ data })

export const getBaby = (id: string) => prisma.baby.findUnique({ where: { id } })

export const getBabiesByUserId = (userId: string) => prisma.baby.findMany({ where: { userId } })

export const updateBaby = (
  id: string,
  data: Partial<Omit<Baby, 'id' | 'createdAt' | 'updatedAt'>>
) => prisma.baby.update({ where: { id }, data })

export const deleteBaby = (id: string) => prisma.baby.delete({ where: { id } })

export const listBabies = () => prisma.baby.findMany()

// --- Chat CRUD ---
export const createChat = (data: Omit<Chat, 'id' | 'createdAt'>) => prisma.chat.create({ data })

export const getChat = (id: string) => prisma.chat.findUnique({ where: { id } })

export const updateChat = (id: string, data: Partial<Omit<Chat, 'id' | 'createdAt'>>) =>
  prisma.chat.update({ where: { id }, data })

export const deleteChat = (id: string) => prisma.chat.delete({ where: { id } })

export const listChats = () => prisma.chat.findMany()

// --- Message CRUD ---
export const createMessage = (data: Omit<Message, 'id' | 'createdAt'>) =>
  prisma.message.create({ data })

export const getMessage = (id: string) => prisma.message.findUnique({ where: { id } })

export const updateMessage = (id: string, data: Partial<Omit<Message, 'id' | 'createdAt'>>) =>
  prisma.message.update({ where: { id }, data })

export const deleteMessage = (id: string) => prisma.message.delete({ where: { id } })

export const listMessages = () => prisma.message.findMany()
