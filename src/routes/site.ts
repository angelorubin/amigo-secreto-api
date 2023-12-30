import { Router } from "express"
import * as auth from "../controllers/auth"
import * as events from '../controllers/events'
import * as people from '../controllers/people'
import { retrieveEvents } from "../services/events"

const router = Router()

// events routes
router.get('/', (req, res) => res.json({ test: 'OK' }))
router.get('/events', retrieveEvents)
router.get('/events/:id', events.retrieveEvent)
router.get('/events/:id_event/search', people.searchPerson)

export default router
