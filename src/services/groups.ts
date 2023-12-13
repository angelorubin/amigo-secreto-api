import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getGroups = async (id_event: number) => {
  try {
    return await prisma.eventGroup.findFirst({ where: { id_event } });
  } catch (error) {
    return false;
  }
};

type getGroupByIdFilters = {
  id: number
  id_event?: number
}

export const getGroupById = async (filters: getGroupByIdFilters) => {
  try {
    return await prisma.eventGroup.findFirst({
      where: {
        id: filters.id,
        id_event: filters.id_event
      }
    });
  } catch (error) {
    return false;
  }
};
