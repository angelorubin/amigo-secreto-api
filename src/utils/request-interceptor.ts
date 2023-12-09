import { RequestHandler } from "express"

export const requestInterceptor: RequestHandler = (req, res, next) => {
  console.log({ "HTTP_STATUS": req })
  next()
}
