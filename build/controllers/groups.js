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
exports.destroyGroup = exports.updateGroup = exports.createGroup = exports.retrieveGroup = exports.retrieveGroups = void 0;
const groups = __importStar(require("../services/groups"));
const zod_1 = require("zod");
const retrieveGroups = async (req, res) => {
    const { id_event } = req.params;
    const item = await groups.retrieveGroups(Number(id_event));
    if (item) {
        return res.json({ groups: item });
    }
    res.json({ error: "Ocorreu um erro" });
};
exports.retrieveGroups = retrieveGroups;
const retrieveGroup = async (req, res) => {
    const { id, id_event } = req.params;
    const groupItem = await groups.retrieveGroup({
        id: parseInt(id),
        id_event: parseInt(id_event),
    });
    if (groupItem) {
        return res.json({ groupItem });
    }
    res.json({ error: "Ocorreu um erro" });
};
exports.retrieveGroup = retrieveGroup;
const createGroup = async (req, res) => {
    const { id_event } = req.params;
    const { name } = await req.body;
    const createGroupSchema = zod_1.z.object({
        name: zod_1.z.string(),
    });
    const validation = createGroupSchema.safeParse(req.body);
    if (!validation.success) {
        res.json({ error: "Dados inválidos" });
    }
    const createdGroup = await groups.createGroup({
        id_event: parseInt(id_event),
        name,
    });
    if (createdGroup)
        return res.status(201).json({ createdGroup });
    return res.json({ error: "Ocorreu um erro" });
};
exports.createGroup = createGroup;
const updateGroup = async (req, res) => {
    const { id, id_event } = req.params;
    const schemaValidation = zod_1.z.object({
        name: zod_1.z.string().optional(),
    });
    const resultValidation = schemaValidation.safeParse(req.body);
    if (!resultValidation.success) {
        return res.json({ error: "Dados inválidos" });
    }
    const updatedGroup = await groups.updateEventGroup({
        id: parseInt(id),
        id_event: parseInt(id_event),
    }, resultValidation.data);
    if (!updatedGroup) {
        res.json({ error: "Ocorreu um erro" });
    }
    return res.json({ updatedGroup });
};
exports.updateGroup = updateGroup;
const destroyGroup = async (req, res) => {
    const { id, id_event } = req.params;
    const deletedGroup = await groups.destroyEventGroup({
        id: parseInt(id),
        id_event: parseInt(id_event),
    });
    if (deletedGroup) {
        return res.json({
            deletedGroup,
        });
    }
    return res.json({ error: "Ocorreu um erro" });
};
exports.destroyGroup = destroyGroup;
