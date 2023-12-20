import { RequestHandler } from "express";
import * as groups from "../services/groups";
import { z } from "zod";

export const retrieveGroups: RequestHandler = async (req, res) => {
  const { id_event } = req.params;

  const item = await groups.retrieveGroups(Number(id_event));

  if (item) {
    return res.json({ groups: item });
  }

  res.json({ error: "Ocorreu um erro" });
};

export const retrieveGroup: RequestHandler = async (req, res) => {
  const { id, id_event } = req.params;

  const groupItem = await groups.retrieveGroup({
    id: parseInt(id),
    id_event: parseInt(id_event),
  });

  if (groupItem) {
    return res.json({ groupItem });
  }

  res.json({ error: "Ocorreu um erro" });
};

export const createGroup: RequestHandler = async (req, res) => {
  const { id_event } = req.params;
  const { name } = await req.body;

  const createGroupSchema = z.object({
    name: z.string(),
  });

  const validation = createGroupSchema.safeParse(req.body);

  if (!validation.success) {
    res.json({ error: "Dados inválidos" });
  }

  const createdGroup = await groups.createGroup({
    id_event: parseInt(id_event),
    name,
  });

  if (createdGroup) return res.status(201).json({ createdGroup });

  return res.json({ error: "Ocorreu um erro" });
};

export const updateGroup: RequestHandler = async (req, res) => {
  const { id, id_event } = req.params;

  const schemaValidation = z.object({
    name: z.string().optional(),
  });

  const resultValidation = schemaValidation.safeParse(req.body);

  if (!resultValidation.success) {
    return res.json({ error: "Dados inválidos" });
  }

  const updatedGroup = await groups.updateEventGroup(
    {
      id: parseInt(id),
      id_event: parseInt(id_event),
    },
    resultValidation.data,
  );

  if (!updatedGroup) {
    res.json({ error: "Ocorreu um erro" });
  }

  return res.json({ updatedGroup });
};

export const destroyGroup: RequestHandler = async (req, res) => {
  const { id, id_event } = req.params;

  const deletedGroup = await groups.destroyEventGroup({
    id: parseInt(id),
    id_event: parseInt(id_event),
  });

  if (deletedGroup) {
    return res.json({
      deletedGroup,
    });
  }
  return res.json({ error: "Ocorreu um erro" });
};
