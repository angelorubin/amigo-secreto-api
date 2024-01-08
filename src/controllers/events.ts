import type { RequestHandler } from "express";
import * as events from "../services/events";
import * as people from "../services/people";
import { boolean, z } from "zod";

export const retrieveEvents: RequestHandler = async (req, res) => {
  const items = await events.retrieveEvents();

  if (Array.isArray(items) && items.length > 0) {
    return res.json({ events: items });
  }

  return res.json({ error: "Ocorreu um erro" });
};

export const retrieveEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const event = await events.retrieveEvent(parseInt(id));

  if (event) {
    return res.json({ event });
  }

  res.json({ error: "Ocorreu um erro" });
};

export const createEvent: RequestHandler = async (req, res) => {
  const schemaCreateEvent = z.object({
    title: z.string(),
    description: z.string(),
    status: z.boolean(),
    grouped: z.boolean(),
  });

  const validation = schemaCreateEvent.safeParse(req.body);

  if (!validation.success) {
    return res.json({ error: "Dados inválidos" });
  }

  const newEvent = await events.create(validation.data);

  if (newEvent) {
    return res.status(201).json({ eventAdded: newEvent });
  }

  res.json({ error: "Ocorreu um erro" });
};

interface Event {
  status?: boolean;
  title: string;
  description: string;
  grouped: boolean;
}

export const updateEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const updateEventSchema = z.object({
    status: z.boolean().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    grouped: z.boolean().optional(),
  });

  const validation = updateEventSchema.safeParse(req.body);

  if (!validation.success) {
    return res.json({ error: "Dados inválidos" });
  }

  const updatedEvent = await events.update(parseInt(id), validation.data);

  if (updatedEvent) {
    if (updatedEvent?.status) {
      res.json({ OK: "OK" });
      // const result = await events.doMatches(parseInt(id));
      // return res.json({ error: "Grupos impossíveis de sortear" });
    } else {
      const updatedPerson = await people.updatePerson(
        { id_event: parseInt(id) },
        { matched: "" },
      );
      return res.status(201).json({ updatedPerson });
    }
    return res.json({ event: updatedEvent });
  }

  return res.json({ error: "Ocorreu um erro" });
};

export const destroyEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const destroyedEvent = await events.destroy(parseInt(id));

  if (destroyedEvent) {
    return res.status(200).json({ destroyedEvent });
  }

  res.json({ error: "Ocorreu um erro" });
};
