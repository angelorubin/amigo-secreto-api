"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const site_1 = __importDefault(require("./routes/site"));
const admin_1 = __importDefault(require("./routes/admin"));
const request_interceptor_1 = require("./utils/request-interceptor");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.all("*", request_interceptor_1.requestInterceptor);
app.use("/admin", admin_1.default);
app.use("/site", site_1.default);
const runServer = (port, server) => {
    server.listen(port, () => {
        console.log(`Running at PORT ${port}`);
    });
};
const regularServer = http_1.default.createServer(app);
if (process.env.NODE_ENV === "production") {
    // configurar SSL
    // rodar server na porta 80 e na 443
    const options = {
        key: fs_1.default.readFileSync(process.env.SSL_KEY),
        cert: fs_1.default.readFileSync(process.env.SSL_CERT)
    };
    const secureServer = https_1.default.createServer(options, app);
    runServer(80, regularServer);
    runServer(443, secureServer);
}
else {
    const serverPort = process.env.PORT
        ? parseInt(process.env.PORT)
        : 3000;
    runServer(serverPort, regularServer);
}
