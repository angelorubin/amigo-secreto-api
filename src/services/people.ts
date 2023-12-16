import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

type RetrieveAllFilters = { id_event: number; id_group: number };
export const retrieveAll = async (filters: RetrieveAllFilters) => {
  try {
    return await prisma.eventPeople.findMany({ where: filters });
  } catch (error) {
    return false;
  }
};

type RetrievePersonFilters = {
  id_event: number;
  id_group: number;
  id?: number;
  cpf?: string;
};
export const retrievePerson = async (filters: RetrievePersonFilters) => {
  try {
    if (!filters.id && filters.cpf) {
      return false
    }
    return await prisma.eventPeople.findFirst({ where: filters })
  } catch (error) {
    return false;
  }
};

type CreatePersonFilters = {}
export const createPerson = async (data: object, filters: CreatePersonFilters) => {
  try {
    return { filters, data }
  } catch (error) {
    return false
  }
}
