"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const stockRoutes_1 = require("./routes/stockRoutes");
const http_1 = require("http");
const socketData_1 = require("./socket/socketData");
const cors_1 = __importDefault(require("cors"));
class App {
    constructor() {
        this.routePrv = new stockRoutes_1.Routes();
        this.app = express_1.default();
        this.config();
        this.socket = socketData_1.SocketData.getInstance();
        this.socket.initSocket(this.http);
        this.routePrv.routes(this.app);
    }
    config() {
        // support application/json type post data
        this.app.use(body_parser_1.default.json());
        // support application/x-www-form-urlencoded post data
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(cors_1.default({}));
        this.http = http_1.createServer(this.app);
    }
}
exports.default = new App().http;
//# sourceMappingURL=index.js.map