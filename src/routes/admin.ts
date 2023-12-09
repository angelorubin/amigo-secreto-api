import { Router } from "express"
import * as auth from '../controllers/auth'
import * as events from '../controllers/events'

const router = Router()

router.post("/ping", auth.validate, (req, res) => {
  return res.json({ pong: true, admin: true })
})

router.get('/events', auth.validate, events.getAll)

router.post("/login", auth.login)

export default router
