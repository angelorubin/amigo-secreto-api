import type { RequestHandler } from 'express'

export const requestInterceptor: RequestHandler = (req, res, next) => {
  console.log(req.method, req.statusCode, req.originalUrl, req.params)
  next()
}
