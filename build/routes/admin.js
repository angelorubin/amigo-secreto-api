"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth = __importStar(require("../controllers/auth"));
const events = __importStar(require("../controllers/events"));
const groups = __importStar(require("../controllers/groups"));
const people = __importStar(require("../controllers/people"));
const router = (0, express_1.Router)();
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
router.get("/events/:id_event/groups", auth.validate, groups.retrieveGroups);
router.get("/events/:id_event/groups/:id", auth.validate, groups.retrieveGroup);
router.post("/events/:id_event/groups", auth.validate, groups.createGroup);
router.put("/events/:id_event/groups/:id", auth.validate, groups.updateGroup);
router.delete("/events/:id_event/groups/:id", auth.validate, groups.destroyGroup);
// admin/events/groups/people
router.get("/events/:id_event/groups/:id_group/people", auth.validate, people.retrievePeople);
router.get("/events/:id_event/groups/:id_group/people/:id", auth.validate, people.retrievePerson);
router.post("/events/:id_event/groups/:id_group/people", auth.validate, people.createPerson);
router.put("/events/:id_event/groups/:id_group/people/:id", auth.validate, people.updatePerson);
router.delete("/events/:id_event/groups/:id_group/people/:id", auth.validate, people.destroyPerson);
exports.default = router;
