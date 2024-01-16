import type { RequestHandler } from 'express'
import * as people from '../services/people'
import { z } from 'zod'
import { decryptMatch } from '../utils/match'

export const retrievePeople: RequestHandler = async (req, res) => {
  const { id_event, id_group } = req.params

  const items = await people.retrievePeople({
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
  })

  if (items) {
    return res.json({ people: items })
  }

  return res.json({ error: 'Ocorreu um erro' })
}

export const retrievePerson: RequestHandler = async (req, res) => {
  const { id_event, id_group, id } = req.params
  const { cpf } = req.body

  const person = await people.retrievePerson({
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
    id: parseInt(id),
    cpf,
  })

  if (person) {
    return res.json({ person })
  }

  return res.json({ error: 'Ocorreu um erro' })
}

export const createPerson: RequestHandler = async (req, res) => {
  const { id_event, id_group } = req.params

  const schemaValidation = z.object({
    name: z.string(),
    cpf: z.string().transform((val) => val.replace(/\.|-/gm, '')),
  })

  const validatedPerson = schemaValidation.safeParse(req.body)

  if (!validatedPerson.success) {
    return res.json({ error: 'Dados inválidos' })
  }

  const createdPerson = await people.createPerson({
    ...validatedPerson.data,
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
  })

  if (createdPerson) {
    return res.json({ createdPerson })
  }

  return res.json({ error: 'Ocorreu um erro' })
}

export const updatePerson: RequestHandler = async (req, res) => {
  const { id, id_event, id_group } = req.params

  const schemaUpdate = z.object({
    name: z.string().optional(),
    cpf: z
      .string()
      .transform((val) => val.replace(/\.|-/gm, ''))
      .optional(),
    matched: z.string().optional(),
  })

  const validation = schemaUpdate.safeParse(req.body)

  if (!validation.success) {
    return res.json({ error: 'Dados inválidos' })
  }

  const updatedPerson = await people.updatePerson(
    {
      id: parseInt(id),
      id_event: parseInt(id_event),
      id_group: parseInt(id_group),
    },
    validation.data,
  )

  if (updatedPerson) {
    const filters = {
      id: parseInt(id),
      id_event: parseInt(id_event),
      id_group: parseInt(id_group),
    }

    const person = await people.retrievePerson(filters)

    return res.json({ updatedPerson: person })
  }

  return res.json({ error: 'Ocorreu um erro' })
}

export const destroyPerson: RequestHandler = async (req, res) => {
  const { id, id_event, id_group } = req.params

  const filters = {
    id: parseInt(id),
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
  }

  const personData = await people.retrievePerson(filters)

  const destroyedPerson = await people.destroyPerson({
    id: parseInt(id),
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
  })

  if (destroyedPerson) {
    return res.json({ destroyedPerson: personData })
  }

  return res.json({ error: 'Ocorreu um erro' })
}

interface PersonItem {
  id: number
  id_event: number
  id_group: number
  name: string
  cpf: string
  matched: string
}

/**
export const searchPerson: RequestHandler = async (req, res) => {
  const { id_event } = req.params

  const searchPersonSchema = z.object({
    cpf: z.string().transform((val) => val.replace(/\.|-/gm, ''))
  })

  const query = searchPersonSchema.safeParse(req.query)

  if (!query.success) {
    return res.json({ errror: 'Dados inválidos.' })
  }

  const personItem: PersonItem | boolean | null = await people.retrievePerson({
    id_event: parseInt(id_event),
    cpf: query.data.cpf
  })

  // console.log(personItem)

  if (personItem !== null &&
    typeof personItem === 'object' &&
    personItem.matched !== undefined) {
    const matchId = decryptMatch(personItem.matched)

    const personMatched: PersonItem | null | boolean = await people.retrievePerson({
      id_event: parseInt(id_event),
      id: matchId
    })

    if (typeof personMatched === 'boolean' && typeof personMatched === 'object' && 'id' in personMatched) {
      return res.json({
        person: {
          id: personItem.id,
          name: personItem.name
        },
        personMatched: {
          id: personMatched.id,
          name: personMatched.name
        },
      })
    }
  }

  return res.status(400).json({ errror: 'Dados inválidos' })
}
*/
