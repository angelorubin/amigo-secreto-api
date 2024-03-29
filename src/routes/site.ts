import { Router } from 'express'
import * as events from '../controllers/events'
import * as people from '../controllers/people'

const router = Router()

// events routes
router.get('/events', events.retrieveEvents)
router.get('/events/:id', events.retrieveEvent)
router.get('/events/:id_event/search', people.searchPerson)

export default router
