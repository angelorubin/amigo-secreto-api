import { Prisma, PrismaClient } from "@prisma/client";
import * as events from "../services/events";

const prisma = new PrismaClient();

export const getGroups = async (id_event: number) => {
  try {
    return await prisma.eventGroup.findMany({ where: { id_event } });
  } catch (error) {
    return false;
  }
};

type GetGroupFilters = {
  id: number;
  id_event?: number;
};
export const getGroup = async (filters: GetGroupFilters) => {
  try {
    return await prisma.eventGroup.findFirst({
      where: {
        id: filters.id,
        id_event: filters.id_event,
      },
    });
  } catch (error) {
    return false;
  }
};

type CreateGroupData = Prisma.Args<typeof prisma.eventGroup, "create">["data"];
export const createGroup = async (data: CreateGroupData) => {
  try {
    if (!data.id_event) {
      return false;
    }

    const eventItem = await events.getEventById(data.id_event);
    if (!eventItem) return false;

    return await prisma.eventGroup.create({ data });
  } catch (error) {
    return false;
  }
};

type UpdateFilters = { id: number; id_event: number };
type UpdateData = Prisma.Args<typeof prisma.eventGroup, "update">["data"];
export const updateEventGroup = async (
  filters: UpdateFilters,
  data: UpdateData,
) => {
  try {
    return await prisma.eventGroup.update({
      where: filters,
      data,
    });
  } catch (error) {
    return false;
  }
};

type DestroyFilters = {
  id: number;
  id_event: number;
};
export const destroyEventGroup = async (filters: DestroyFilters) => {
  try {
    return await prisma.eventGroup.delete({
      where: filters,
    });
  } catch (error) {
    return false;
  }
};
