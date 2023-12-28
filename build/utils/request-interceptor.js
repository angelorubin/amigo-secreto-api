"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestInterceptor = void 0;
const requestInterceptor = (req, res, next) => {
    console.group(req.method, req.originalUrl);
    next();
};
exports.requestInterceptor = requestInterceptor;
