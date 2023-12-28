"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptMatch = exports.encryptMatch = void 0;
const token = process.env.DEFAULT_TOKEN;
const encryptMatch = (id) => {
    return `${token}${id}${token}`;
};
exports.encryptMatch = encryptMatch;
const decryptMatch = (match) => {
    let idString = match
        .replace(`${token}`, '')
        .replace(`${token}`, '');
    return parseInt(idString);
};
exports.decryptMatch = decryptMatch;
