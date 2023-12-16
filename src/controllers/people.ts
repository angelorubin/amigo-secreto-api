import { RequestHandler } from "express";
import * as people from "../services/people";
import { z } from "zod";

export const retrieveAll: RequestHandler = async (req, res) => {
  const { id_event, id_group } = req.params;

  const items = await people.retrieveAll({
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
  });

  if (items) {
    return res.json({ items });
  }

  return res.json({ error: "Ocorreu um erro" });
};

export const retrievePerson: RequestHandler = async (req, res) => {
  const { id_event, id_group, id } = req.params;
  const { cpf } = req.body;

  const person = await people.retrievePerson({
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
    id: parseInt(id),
    cpf,
  });

  if (person) {
    return res.json({ person });
  }

  return res.json({ error: "Ocorreu um erro" });
};

export const createPerson: RequestHandler = async (req, res) => {
  const { id_event, id_group } = req.params;

  const schemaValidation = z.object({
    name: z.string(),
    cpf: z.string(),
    matched: z.string()
  })

  const validatePerson = schemaValidation.safeParse(req.body)

  if (!validatePerson.success) {
    return res.json({ error: "Ocorreu um erro" });
  }

  const createdPerson = await people.createPerson(
    validatePerson, { id_event, id_group }
  )

  res.json({ createdPerson })

  /**
  const person = await people.retrievePerson({
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
    id: parseInt(id),
    cpf,
  });

  if (person) {
    return res.json({ person });
  }
  */
};
