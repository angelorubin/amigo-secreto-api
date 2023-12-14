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

export const getGroupByIdEvent: RequestHandler = async (req, res) => {
  const { id, id_event } = req.params

  const groupItem = await groups.getGroupById({
    id: parseInt(id),
    id_event: parseInt(id_event)
  })

  if (groupItem) {
    return res.json({ groupItem })
  }

  res.json({ error: "Ocorreu um erro" })
}

export const createGroup: RequestHandler = async (req, res) => {
  const { id_event } = req.params
  const { name } = await req.body

  const createGroupSchema = z.object({
    name: z.string()
  })

  const validation = createGroupSchema.safeParse(req.body)

  if (!validation.success) {
    res.json({ error: "Dados inválidos" })
  }

  const createdGroup = await groups.createGroup({
    id_event: parseInt(id_event),
    name
  })

  if (createdGroup) return res.status(201).json({ createdGroup })

  return res.json({ error: 'Ocorreu um erro' })
}

export const updateGroup: RequestHandler = async (req, res) => {
  const { id, id_event } = req.params

  const schemaValidation = z.object({
    name: z.string().optional()
  })

  const resultValidation = schemaValidation.safeParse(req.body)

  if (!resultValidation.success) {
    return res.json({ error: 'Dados inválidos' })
  }

  const updatedGroup = await groups.updateGroup(
    {
      id: parseInt(id),
      id_event: parseInt(id_event)
    },
    resultValidation.data
  )

  if (!updatedGroup) {
    res.json({ error: 'Ocorreu um erro' })
  }

  return res.json({ updateGroup })
}
