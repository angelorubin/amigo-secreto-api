import { RequestHandler } from "express";
import * as events from "../services/events";
import { z } from "zod";

export const getAll: RequestHandler = async (req, res) => {
  const items = await events.getAll();

  if (items) {
    return res.json({ events: items });
  }

  res.json({ error: "Ocorreu um erro" });
};

export const getEventById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const event = await events.getEventById(parseInt(id));

  if (event) {
    return res.json({ event });
  }

  res.json({ error: "Ocorreu um erro" });
};

export const addEvent: RequestHandler = async (req, res) => {
  const schemaAddEvent = z.object({
    title: z.string(),
    description: z.string(),
    status: z.boolean(),
    grouped: z.boolean(),
  });

  const validation = schemaAddEvent.safeParse(req.body);

  if (!validation.success) {
    return res.json({ error: "Dados inválidos" });
  }

  const newEvent = await events.add(validation.data);

  if (newEvent) {
    return res.status(201).json({ eventAdded: newEvent });
  }

  res.json({ error: "Ocorreu um erro" });
};
