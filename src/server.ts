import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import https from "https";
import siteRoutes from "./routes/site";
import adminRoutes from "./routes/admin";
import { requestInterceptor } from "./utils/request-interceptor";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("*", requestInterceptor);
app.use("/admin", adminRoutes);
app.use("/site", siteRoutes);

const runServer = (port: number, server: http.Server) => {
  server.listen(port, () => {
    console.log(`Running at PORT ${port}`);
  });
};
const regularServer = http.createServer(app);

if (process.env.NODE_ENV === "production") {
  // configurar SSL
  // rodar server na porta 80 e na 443
} else {
  const serverPort: number = process.env.PORT
    ? parseInt(process.env.PORT)
    : 3000;
  runServer(serverPort, regularServer);
}
