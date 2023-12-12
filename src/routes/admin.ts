import { Router } from "express";
import * as auth from "../controllers/auth";
import * as events from "../controllers/events";

const router = Router();

// admin/login routes
router.post("/login", auth.login);
router.post("/ping", (req, res) => {
  return res.json({ pong: true, admin: true });
});

// admin/events routes
router.get("/events", auth.validate, events.getEvents);
router.get("/events/:id", auth.validate, events.getEventById);
router.post("/events", auth.validate, events.createEvent);
router.put("/events/:id", auth.validate, events.updateEvent)
router.delete("/events/:id", auth.validate, events.destroyEvent)

export default router;
