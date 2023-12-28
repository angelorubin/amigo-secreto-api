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
exports.destroyEvent = exports.updateEvent = exports.createEvent = exports.retrieveEvent = exports.retrieveEvents = void 0;
const events = __importStar(require("../services/events"));
const people = __importStar(require("../services/people"));
const zod_1 = require("zod");
const retrieveEvents = async (req, res) => {
    const items = await events.retrieveEvents();
    if (items) {
        return res.json({ events: items });
    }
    res.json({ error: "Ocorreu um erro" });
};
exports.retrieveEvents = retrieveEvents;
const retrieveEvent = async (req, res) => {
    const { id } = req.params;
    const event = await events.retrieveEvent(parseInt(id));
    if (event) {
        return res.json({ event });
    }
    res.json({ error: "Ocorreu um erro" });
};
exports.retrieveEvent = retrieveEvent;
const createEvent = async (req, res) => {
    const schemaCreateEvent = zod_1.z.object({
        title: zod_1.z.string(),
        description: zod_1.z.string(),
        status: zod_1.z.boolean(),
        grouped: zod_1.z.boolean(),
    });
    const validation = schemaCreateEvent.safeParse(req.body);
    if (!validation.success) {
        return res.json({ error: "Dados inválidos" });
    }
    const newEvent = await events.create(validation.data);
    if (newEvent) {
        return res.status(201).json({ eventAdded: newEvent });
    }
    res.json({ error: "Ocorreu um erro" });
};
exports.createEvent = createEvent;
const updateEvent = async (req, res) => {
    const { id } = req.params;
    const schemaUpdate = zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        status: zod_1.z.boolean().optional(),
        grouped: zod_1.z.boolean().optional(),
    });
    const validation = schemaUpdate.safeParse(req.body);
    if (!validation.success) {
        return res.json({ error: "Dados inválidos" });
    }
    const updatedEvent = await events.update(parseInt(id), validation.data);
    if (updatedEvent) {
        if (updatedEvent.status) {
            const result = await events.doMatches(parseInt(id));
            if (result) {
                return res.json({ error: "Grupos impossíveis de sortear" });
            }
            else {
                return res.json({ groups: result });
            }
        }
        else {
            await people.updatePerson({ id_event: parseInt(id) }, { matched: "" });
        }
        return res.status(201).json({ updatedEvent });
    }
    res.json({ error: "Ocorreu um erro" });
};
exports.updateEvent = updateEvent;
const destroyEvent = async (req, res) => {
    const { id } = req.params;
    const destroyedEvent = await events.destroy(parseInt(id));
    if (destroyedEvent) {
        return res.status(200).json({ destroyedEvent });
    }
    res.json({ error: "Ocorreu um erro" });
};
exports.destroyEvent = destroyEvent;
