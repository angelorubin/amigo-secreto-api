import { Router } from "express";
import * as auth from "../controllers/auth";
import * as events from "../controllers/events";
import * as groups from "../controllers/groups"

const router = Router();

// admin/login
router.post("/login", auth.login);
router.post("/ping", (req, res) => {
  return res.json({ pong: true, admin: true });
});

// admin/events
router.get("/events", auth.validate, events.getEvents);
router.get("/events/:id", auth.validate, events.getEventById);
router.post("/events", auth.validate, events.createEvent);
router.put("/events/:id", auth.validate, events.updateEvent)
router.delete("/events/:id", auth.validate, events.destroyEvent)

// admin/events/groups
router.get("/events/:id_event/groups", auth.validate, groups.getGroups)
router.get("/events/:id_event/groups/:id", auth.validate, groups.getGroupById)

export default router;
