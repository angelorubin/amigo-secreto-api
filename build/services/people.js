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
exports.destroyPerson = exports.updatePerson = exports.createPerson = exports.retrievePerson = exports.retrievePeople = void 0;
const client_1 = require("@prisma/client");
const groups = __importStar(require("./groups"));
const prisma = new client_1.PrismaClient();
const retrievePeople = async (filters) => {
    try {
        return await prisma.eventPeople.findMany({ where: filters });
    }
    catch (error) {
        return false;
    }
};
exports.retrievePeople = retrievePeople;
const retrievePerson = async (filters) => {
    try {
        if (!filters.id_event && filters.cpf) {
            return false;
        }
        return await prisma.eventPeople.findFirst({ where: filters });
    }
    catch (error) {
        return false;
    }
};
exports.retrievePerson = retrievePerson;
const createPerson = async (data) => {
    try {
        if (!data.id_group) {
            return false;
        }
        const group = await groups.retrieveGroup({
            id: data.id_group,
            id_event: data.id_event,
        });
        if (!group) {
            return false;
        }
        return await prisma.eventPeople.create({ data });
    }
    catch (error) {
        return false;
    }
};
exports.createPerson = createPerson;
const updatePerson = async (filters, data) => {
    try {
        return await prisma.eventPeople.updateMany({ where: filters, data });
    }
    catch (error) {
        return false;
    }
};
exports.updatePerson = updatePerson;
const destroyPerson = async (filters) => {
    try {
        return await prisma.eventPeople.delete({ where: filters });
    }
    catch (error) {
        return false;
    }
};
exports.destroyPerson = destroyPerson;
