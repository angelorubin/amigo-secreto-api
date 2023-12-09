import { RequestHandler } from "express";
import { z, SafeParseReturnType } from "zod"
import * as auth from "../services/auth"

interface IData {
  email: string
  password: string
}

interface ILogin {
  success: boolean
  data: IData
}

export const login: RequestHandler = (req, res) => {
  const loginSchema = z.object({
    email: z.string(),
    password: z.string()
  })

  const validation = loginSchema.parse(req.body);

  /*
  // Tipagem da requisição usando a interface iLogin
  const validation: ILogin = loginSchema.parse(req.body);

  if (!validation.success) {
    res.json({ error: "Login com dados inválidos." })
  }

  if (!auth.validatePassword(req.body.password)) {
    return res.status(403).json({ error: "Acesso negado." })
  }

  res.json({ token: auth.createToken() })
  */

  res.json({ ok: 'ok' })
}

export const validate: RequestHandler = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'acesso negado' })
  }

  const token = req.headers.authorization.split(' ')[1]

  if (!auth.validateToken(token)) {
    return res.status(403).json({ error: 'acesso negado' })
  }

  console.log(token)
  next()
}
