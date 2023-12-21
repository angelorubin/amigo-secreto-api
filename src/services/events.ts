import { PrismaClient, Prisma } from "@prisma/client";
import { z } from "zod";
import * as people from "./people"
import * as groups from "./groups"

const prisma = new PrismaClient();

export const retrieveEvents = async () => {
  try {
    return await prisma.event.findMany();
  } catch (error) {
    return false;
  }
};

export const retrieveEvent = async (id: number) => {
  try {
    return await prisma.event.findFirst({
      where: {
        id,
      },
    })
  } catch (error) {
    return false;
  }
};

type EventCreate = Prisma.Args<typeof prisma.event, 'create'>['data']

export const create = async (data: EventCreate) => {
  try {
    return await prisma.event.create({
      data,
    });
  } catch (error) {
    return error;
  }
};

type EventUpdate = Prisma.Args<typeof prisma.event, 'update'>['data']

export const update = async (id: number, data: EventUpdate) => {
  try {
    return await prisma.event.update({
      where: { id }, data
    });
  } catch (error) {
    return false
  }
};

export const destroy = async (id: number) => {
  try {
    return await prisma.event.delete({
      where: { id }
    });
  } catch (error) {
    return false
  }
};

export const doMatches = async (id: number): Promise<boolean> => {
  /**
   * Grupo A (ID:1)
   * - Angelo
   * - Marcio
   * - Pedro
   *
   * Grupo B (ID: 2)
   * - João
   * - Inacio
   *
   * Grupo C (ID: 3)
   * - Janaina
   */

  const eventItem = await prisma.event.findFirst({
    where: { id }, select: { grouped: true }
  })

  if (eventItem) {
    const peopleList = await people.retrievePeople({ id_event: id })
  }

  return false
}
