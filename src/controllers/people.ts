import { RequestHandler } from "express";
import * as people from "../services/people";
import { z } from "zod";

export const retrieveAll: RequestHandler = async (req, res) => {
  const { id_event, id_group } = req.params

  const items = await people.retrieveAll({
    id_event: parseInt(id_event)
  })

  res.json({ error: "Ocorreu um erro" });
};
