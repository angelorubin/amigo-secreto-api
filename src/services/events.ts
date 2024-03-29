import type { Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import * as people from './people'
import * as groups from './groups'
import { encryptMatch } from '../utils/match'

const prisma = new PrismaClient()

export const retrieveEvents = async (): Promise<any> => {
  try {
    return await prisma.event.findMany()
  } catch (error) {
    return false
  }
}

export const retrieveEvent = async (id: number): Promise<any> => {
  try {
    return await prisma.event.findFirst({
      where: { id },
    })
  } catch (error) {
    return false
  }
}

type EventCreate = Prisma.Args<typeof prisma.event, 'create'>['data']

export const create = async (data: EventCreate): Promise<any> => {
  try {
    return await prisma.event.create({
      data,
    })
  } catch (error) {
    return error
  }
}

type EventUpdate = Prisma.Args<typeof prisma.event, 'update'>['data']

export const update = async (
  id: number,
  data: EventUpdate,
): Promise<EventUpdate | boolean> => {
  try {
    return await prisma.event.update({
      where: { id },
      data
    })
  } catch (error) {
    return false
  }
}

export const destroy = async (id: number) => {
  try {
    return await prisma.event.delete({
      where: { id },
    })
  } catch (error) {
    return false
  }
}

export const doMatches = async (id: number): Promise<any> => {
  /**
   * Grupo A (ID:1)
   * - Angelo
   * - Marcio
   * - Pedro
   *
   * Grupo B (ID: 2)
   * - João
   * - Inácio
   *
   * Grupo C (ID: 3)
   * - Janaína
   * - Amanda
   */

  const eventItem = await prisma.event.findFirst({
    where: { id },
    select: { grouped: true }
  })

  if (eventItem !== null) {
    const peopleList = await people.retrievePeople({
      id_event: id
    })

    if (peopleList) {
      let sortedList: Array<{ id: number, match: number }> = []

      let sortable: number[] = []

      // A, B, C, D
      /**
       * A => B
       * B => C
       * C => A
       * D => ...
       */

      let attempts = 0
      const maxAttempts = peopleList.length
      let keepTrying = true

      while (keepTrying && attempts < maxAttempts) {
        keepTrying = false
        attempts++
        sortedList = []
        sortable = peopleList.map((item) => item.id)

        for (const person of peopleList) {
          let sortableFiltered = [...sortable]

          if (eventItem.grouped) {
            sortableFiltered = sortable.filter((sortableItem) => {
              const sortablePerson = peopleList.find(
                (item) => item.id === sortableItem
              )

              return person.id_group !== sortablePerson?.id_group
            })
          }

          if (
            sortableFiltered.length === 0 ||
            (sortableFiltered.length === 1 &&
              person.id === sortableFiltered[0]
            )
          ) {
            keepTrying = true
          } else {
            let sortedIndex = Math.floor(Math.random() * sortableFiltered.length)

            while (sortableFiltered[sortedIndex] === person.id) {
              sortedIndex = Math.floor(Math.random() * sortableFiltered.length)
            }

            sortedList.push({
              id: person.id,
              match: sortableFiltered[sortedIndex]
            })

            sortable = sortable.filter(
              (item) => item !== sortableFiltered[sortedIndex]
            )
          }
        }
      }

      console.log(`ATTEMPTS: ${attempts}`)
      console.log(`MAX ATTEMPTS: ${maxAttempts}`)
      console.info(JSON.stringify(sortedList, null, 2))

      if (attempts < maxAttempts) {
        for (let i in sortedList) {
          await people.updatePerson(
            {
              id: sortedList[i].id,
              id_event: id,
            },
            { matched: encryptMatch(sortedList[i].match) },
          )
        }
      }
    }

    return true
  }
}
