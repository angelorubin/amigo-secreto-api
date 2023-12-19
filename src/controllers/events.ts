import { RequestHandler } from "express";
import * as events from "../services/events";
import * as people from "../services/people"
import { z } from "zod";

export const retrieveEvents: RequestHandler = async (req, res) => {
  const items = await events.getEvents();

  if (items) {
    return res.json({ events: items });
  }

  res.json({ error: "Ocorreu um erro" });
};

export const retrieveEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const event = await events.getEventById(parseInt(id));

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

export const updateEvent: RequestHandler = async (req, res) => {

  const { id } = req.params

  const schemaUpdateEvent = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    status: z.boolean().optional(),
    grouped: z.boolean().optional(),
  });

  const validation = schemaUpdateEvent.safeParse(req.body);

  if (!validation.success) {
    return res.json({ error: "Dados inválidos" });
  }

  const updatedEvent = await events.update(parseInt(id), validation.data);

  if (updatedEvent) {
    if (updatedEvent.status) {
      // TODO: fazer o sorteio
      const result = await events.doMatches(parseInt(id))

      if (result) {
        return res.json({ error: "Grupos impossíveis de sortear" })
      } else {
        return res.json({ groups: result })
      }
    }
    else {
      await people.updatePerson({ id_event: parseInt(id) }, { matched: "" })
    }
    return res.status(201).json({ updatedEvent });
  }

  res.json({ error: "Ocorreu um erro" });
};

export const destroyEvent: RequestHandler = async (req, res) => {

  const { id } = req.params

  const destroyedEvent = await events.destroy(parseInt(id));

  if (destroyedEvent) {
    return res.status(200).json({ destroyedEvent });
  }

  res.json({ error: "Ocorreu um erro" });
};
