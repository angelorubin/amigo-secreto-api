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
    cpf: parseInt(cpf),
  });

  if (person) {
    return res.json({ person });
  }

  return res.json({ error: "Ocorreu um erro" });
};
