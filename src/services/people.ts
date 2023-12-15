import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient()

type RetrieveAllFilters = { id_event: number; id_group: number; }
export const retrieveAll = async (filters: RetrieveAllFilters) => {
  try {
    return await prisma.eventPeople.findMany({ where: filters })
  } catch (error) {

  }
}
