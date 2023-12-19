import { Router } from "express";
import * as auth from "../controllers/auth";
import * as events from "../controllers/events";
import * as groups from "../controllers/groups";
import * as people from "../controllers/people";

const router = Router();

// admin/login
router.post("/login", auth.login);
router.post("/ping", (req, res) => {
  return res.json({ pong: true, admin: true });
});

// admin/events
router.get("/events", auth.validate, events.retrieveEvents);
router.get("/events/:id", auth.validate, events.retrieveEvent);
router.post("/events", auth.validate, events.createEvent);
router.put("/events/:id", auth.validate, events.updateEvent);
router.delete("/events/:id", auth.validate, events.destroyEvent);

// admin/events/groups
router.get("/events/:id_event/groups", auth.validate, groups.getGroups);
router.get("/events/:id_event/groups/:id", auth.validate, groups.getGroup);
router.post("/events/:id_event/groups", auth.validate, groups.createGroup);
router.put("/events/:id_event/groups/:id", auth.validate, groups.updateGroup);
router.delete(
  "/events/:id_event/groups/:id",
  auth.validate,
  groups.destroyGroup,
);

// admin/events/groups/people
router.get(
  "/events/:id_event/groups/:id_group/people",
  auth.validate,
  people.retrieveAll,
);
router.get(
  "/events/:id_event/groups/:id_group/people/:id",
  auth.validate,
  people.retrievePerson,
);
router.post(
  "/events/:id_event/groups/:id_group/people",
  auth.validate,
  people.createPerson,
);
router.put(
  "/events/:id_event/groups/:id_group/people/:id",
  auth.validate,
  people.updatePerson,
);
router.delete(
  "/events/:id_event/groups/:id_group/people/:id",
  auth.validate,
  people.destroyPerson,
);

export default router;
