import { RequestHandler } from "express";
import * as people from "../services/people";
import * as groups from "../services/groups";
import { z } from "zod";

export const retrieveAll: RequestHandler = async (req, res) => {
  const { id_event, id_group } = req.params;

  const items = await people.retrieveAll({
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
  });

  if (items) {
    return res.json({ people: items });
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
    cpf: z.string().transform((val) => val.replace(/\.|-/gm, "")),
  });

  const validatedPerson = schemaValidation.safeParse(req.body);

  if (!validatedPerson.success) {
    return res.json({ error: "Dados inválidos" });
  }

  const createdPerson = await people.createPerson({
    ...validatedPerson.data,
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
  });

  if (createdPerson) {
    return res.json({ createdPerson });
  }

  return res.json({ error: "Ocorreu um erro" });
};

export const updatePerson: RequestHandler = async (req, res) => {
  const { id, id_event, id_group } = req.params;

  const schemaUpdate = z.object({
    name: z.string().optional(),
    cpf: z
      .string()
      .transform((val) => val.replace(/\.|-/gm, ""))
      .optional(),
    matched: z.string().optional(),
  });

  const validation = schemaUpdate.safeParse(req.body);

  if (!validation.success) {
    return res.json({ error: "Dados inválidos" });
  }

  const updatedPerson = await people.updatePerson(
    {
      id: parseInt(id),
      id_event: parseInt(id_event),
      id_group: parseInt(id_group),
    },
    validation.data,
  );

  if (updatedPerson) {
    const filters = {
      id: parseInt(id),
      id_event: parseInt(id_event),
      id_group: parseInt(id_group),
    };

    const person = await people.retrievePerson(filters);

    return res.json({ updatedPerson: person });
  }

  return res.json({ error: "Ocorreu um erro" });
};

export const destroyPerson: RequestHandler = async (req, res) => {
  const { id, id_event, id_group } = req.params;

  const filters = {
    id: parseInt(id),
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
  };

  const personData = await people.retrievePerson(filters);

  const destroyedPerson = await people.destroyPerson({
    id: parseInt(id),
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
  });

  if (destroyedPerson) {
    return res.json({ destroyedPerson: personData });
  }

  return res.json({ error: "Ocorreu um erro" });
};
