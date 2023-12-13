import { RequestHandler } from "express";
import * as groups from "../services/groups";
import { z } from "zod";

export const getGroups: RequestHandler = async (req, res) => {
  const { id_event } = req.params

  const item = await groups.getGroups(Number(id_event));

  if (item) {
    return res.json({ groups: item });
  }

  res.json({ error: "Ocorreu um erro" });
};

export const getGroupById: RequestHandler = async (req, res) => {
  const { id, id_event } = req.params

  const schemaGroup = z.object({
    id: z.string(),
    id_event: z.string()
  })

  const filters = schemaGroup.safeParse({ id, id_event })

  if (filters.success) {
    const group = await groups.getGroupById({
      id: +filters.data.id,
      id_event: +filters.data.id_event
    });
    return res.json({ group });
  }

  res.json({ error: "Ocorreu um erro" });
}
