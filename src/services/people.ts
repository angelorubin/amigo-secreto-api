import { PrismaClient } from '@prisma/client'
import type { Prisma } from '@prisma/client'
import * as groups from './groups'

const prisma = new PrismaClient()

interface RetrievePeopleFilters { id_event: number, id_group?: number }

export const retrievePeople = async (filters: RetrievePeopleFilters) => {
  try {
    return await prisma.eventPeople.findMany({ where: filters })
  } catch (error) {
    return false
  }
}

interface RetrievePersonFilters {
  id_event: number
  id_group?: number
  id?: number
  cpf?: string
}

export const retrievePerson = async (filters: RetrievePersonFilters) => {
  console.log(filters)
  try {
    if (!filters.id_event && filters.cpf) {
      return false
    }
    return await prisma.eventPeople.findFirst({ where: filters })
  } catch (error) {
    return false
  }
}

type CreatePerson = Prisma.Args<typeof prisma.eventPeople, 'create'>['data']

export const createPerson = async (data: CreatePerson) => {
  try {
    if (!data.id_group) {
      return false
    }

    const group = await groups.retrieveGroup({
      id: data.id_group,
      id_event: data.id_event,
    })

    if (!group) {
      return false
    }

    return await prisma.eventPeople.create({ data })
  } catch (error) {
    return false
  }
}

type UpdatePerson = Prisma.Args<typeof prisma.eventPeople, 'update'>['data']
type UpdateFilters = { id?: number, id_event: number, id_group?: number }

export const updatePerson = async (
  filters: UpdateFilters,
  data: UpdatePerson,
) => {
  try {
    return await prisma.eventPeople.updateMany({ where: filters, data })
  } catch (error) {
    return false
  }
}

interface DestroyFilters {
  id: number
  id_event?: number
  id_group?: number
}

export const destroyPerson = async (filters: DestroyFilters) => {
  try {
    return await prisma.eventPeople.delete({ where: filters })
  } catch (error) {
    return false
  }
}
