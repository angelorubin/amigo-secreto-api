import { RequestHandler } from "express";

export const requestInterceptor: RequestHandler = (req, res, next) => {
  console.group(req.method, req.originalUrl)
  next();
};
