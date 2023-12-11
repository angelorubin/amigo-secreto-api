import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getAll = async () => {
  try {
    return await prisma.event.findMany();
  } catch (error) {
    return false;
  }
};

export const getEventById = async (id: number) => {
  try {
    const event = await prisma.event.findFirst({
      where: {
        id,
      },
    });

    if (event) {
      return event;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

interface IAddEvent {
  title: string;
  description: string;
  grouped?: boolean;
}

export const add = async (data: IAddEvent) => {
  try {
    return await prisma.event.create({
      data,
    });
  } catch (error) {
    return error;
  }
};
