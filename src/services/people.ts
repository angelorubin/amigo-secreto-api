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
  id_group?: number;
  id?: number;
  cpf?: number;
};
export const retrievePerson = async (filters: RetrievePersonFilters) => {
  try {
  } catch (error) {
    return false;
  }
};
