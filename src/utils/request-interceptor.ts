import { RequestHandler } from "express";

export const requestInterceptor: RequestHandler = (req, res, next) => {
  next();
};
