import type { RequestHandler } from 'express'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createUser: RequestHandler = async (req, res) => {
  const schemaCreateUser = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string()
  })

  const validation = schemaCreateUser.safeParse(req.body)

  if (!validation.success) {
    return res.json({ error: 'Dados inválidos' })
  }

  const createdUser = await prisma.user.create({
    "data": {
      username: validation.data.username,
      email: validation.data.email,
      password: validation.data.password
    }
  })

  if (createdUser) {
    return res.json({ createdUser })
  }

  return res.json({ error: 'Ocorreu um erro' })
}

export const retrieveUser: RequestHandler = async (req, res) => {
  const schemaValidation = z.object({
    id: z.string()
  })

  const validation = schemaValidation.safeParse(req.params)

  if (!validation.success) {
    return res.json({ error: 'Dados inválidos' })
  }

  const retrievedUser = await prisma.user.findFirst({
    where: {
      id: parseInt(validation.data.id),
    },
  })

  if (retrievedUser) {
    return res.json({ retrievedUser })
  }

  return res.json({ error: 'Ocorreu um erro' })
}
