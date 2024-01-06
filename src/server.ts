import 'dotenv/config'
import fs from 'fs'
import morgan from 'morgan'
import express from 'express'
import cors from 'cors'
import http from 'http'
import https from 'https'
import siteRoutes from './routes/site'
import adminRoutes from './routes/admin'

const app = express()

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/site', siteRoutes)
app.use('/admin', adminRoutes)

const runServer = (port: number, server: http.Server): undefined => {
  server.listen(port, () => {
    console.log(`Running at PORT ${port}`)
  })
  return undefined
}

const regularServer = http.createServer(app)

if (process.env.NODE_ENV === 'production') {
  // configurar SSL
  // rodar server na porta 80 e na 443
  const options = {
    key: fs.readFileSync(process.env.SSL_KEY as string),
    cert: fs.readFileSync(process.env.SSL_CERT as string)
  }

  const secureServer = https.createServer(options, app)
  runServer(80, regularServer)
  runServer(443, secureServer)
} else {
  const serverPort: number = process.env.PORT
    ? parseInt(process.env.PORT)
    : 3000
  runServer(serverPort, regularServer)
}
