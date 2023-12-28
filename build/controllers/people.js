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
exports.searchPerson = exports.destroyPerson = exports.updatePerson = exports.createPerson = exports.retrievePerson = exports.retrievePeople = void 0;
const people = __importStar(require("../services/people"));
const zod_1 = require("zod");
const match_1 = require("../utils/match");
const retrievePeople = async (req, res) => {
    const { id_event, id_group } = req.params;
    const items = await people.retrievePeople({
        id_event: parseInt(id_event),
        id_group: parseInt(id_group),
    });
    if (items) {
        return res.json({ people: items });
    }
    return res.json({ error: "Ocorreu um erro" });
};
exports.retrievePeople = retrievePeople;
const retrievePerson = async (req, res) => {
    const { id_event, id_group, id } = req.params;
    const { cpf } = req.body;
    const person = await people.retrievePerson({
        id_event: parseInt(id_event),
        id_group: parseInt(id_group),
        id: parseInt(id),
        cpf,
    });
    if (person) {
        return res.json({ person });
    }
    return res.json({ error: "Ocorreu um erro" });
};
exports.retrievePerson = retrievePerson;
const createPerson = async (req, res) => {
    const { id_event, id_group } = req.params;
    const schemaValidation = zod_1.z.object({
        name: zod_1.z.string(),
        cpf: zod_1.z.string().transform((val) => val.replace(/\.|-/gm, "")),
    });
    const validatedPerson = schemaValidation.safeParse(req.body);
    if (!validatedPerson.success) {
        return res.json({ error: "Dados inválidos" });
    }
    const createdPerson = await people.createPerson({
        ...validatedPerson.data,
        id_event: parseInt(id_event),
        id_group: parseInt(id_group),
    });
    if (createdPerson) {
        return res.json({ createdPerson });
    }
    return res.json({ error: "Ocorreu um erro" });
};
exports.createPerson = createPerson;
const updatePerson = async (req, res) => {
    const { id, id_event, id_group } = req.params;
    const schemaUpdate = zod_1.z.object({
        name: zod_1.z.string().optional(),
        cpf: zod_1.z
            .string()
            .transform((val) => val.replace(/\.|-/gm, ""))
            .optional(),
        matched: zod_1.z.string().optional(),
    });
    const validation = schemaUpdate.safeParse(req.body);
    if (!validation.success) {
        return res.json({ error: "Dados inválidos" });
    }
    const updatedPerson = await people.updatePerson({
        id: parseInt(id),
        id_event: parseInt(id_event),
        id_group: parseInt(id_group),
    }, validation.data);
    if (updatedPerson) {
        const filters = {
            id: parseInt(id),
            id_event: parseInt(id_event),
            id_group: parseInt(id_group),
        };
        const person = await people.retrievePerson(filters);
        return res.json({ updatedPerson: person });
    }
    return res.json({ error: "Ocorreu um erro" });
};
exports.updatePerson = updatePerson;
const destroyPerson = async (req, res) => {
    const { id, id_event, id_group } = req.params;
    const filters = {
        id: parseInt(id),
        id_event: parseInt(id_event),
        id_group: parseInt(id_group),
    };
    const personData = await people.retrievePerson(filters);
    const destroyedPerson = await people.destroyPerson({
        id: parseInt(id),
        id_event: parseInt(id_event),
        id_group: parseInt(id_group),
    });
    if (destroyedPerson) {
        return res.json({ destroyedPerson: personData });
    }
    return res.json({ error: "Ocorreu um erro" });
};
exports.destroyPerson = destroyPerson;
const searchPerson = async (req, res) => {
    const { id_event } = req.params;
    console.log(req.query.cpf, id_event);
    const searchPersonSchema = zod_1.z.object({
        cpf: zod_1.z.string().transform(val => val.replace(/\.|-/gm, ''))
    });
    const query = searchPersonSchema.safeParse(req.query);
    // console.log(query)
    if (!query.success) {
        return res.json({ errror: 'Dados inválidos' });
    }
    const personItem = await people.retrievePerson({
        id_event: parseInt(id_event),
        cpf: query.data.cpf
    });
    console.log(personItem);
    if (personItem && personItem.matched) {
        const matchId = (0, match_1.decryptMatch)(personItem.matched);
        const personMatched = await people.retrievePerson({
            id_event: parseInt(id_event),
            id: matchId
        });
        if (personMatched) {
            return res.json({
                person: {
                    id: personItem.id, name: personItem.name
                },
                personMatched: {
                    id: personMatched.id,
                    name: personMatched.name
                }
            });
        }
    }
    return res.json({ errror: 'Dados inválidos' });
};
exports.searchPerson = searchPerson;
