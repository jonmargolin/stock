import bodyParser from "body-parser";
import express from "express";
import { Routes } from "./routes/stockRoutes";
import { createServer } from "http";
import {SocketData} from "./socket/socketData";
import cors from "cors";



class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();
    public  http: any;
    public socket: SocketData
    constructor() {
        this.app = express();
        this.config();
        this.socket = SocketData.getInstance();
        this.socket.initSocket(this.http);
        this.routePrv.routes(this.app);
    }
    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors({}))
        this.http = createServer(this.app);

    }
}
export default new App().http;
