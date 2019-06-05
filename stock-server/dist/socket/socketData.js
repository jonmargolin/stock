"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const stockeModel_1 = require("../model/stockeModel");
let data = [];
class SocketData {
    initSocket(http) {
        this.stockList = stockeModel_1.StockList.getInstance();
        let data = this.stockList;
        this.io = socket_io_1.default(http);
        this.io.on("connection", function (socket) {
            console.log("Client connected!");
            const i = data.getStockData();
            socket.emit("message", JSON.stringify({ tables: i }));
            socket.on("message", function (msg) {
                console.log(data);
            });
        });
    }
    static getInstance() {
        if (!SocketData.instance) {
            SocketData.instance = new SocketData();
        }
        return SocketData.instance;
    }
    static getSocket() {
        return SocketData.instance;
    }
    constructor() {
        this.initSocket(this.http);
    }
    emitData(data, type) {
        if (type === 'error') {
            this.io.sockets.emit('error', data);
        }
        else {
            if (this.io.sockets.emit('message', data)) {
                console.log("1");
            }
            else {
                console.log(2);
            }
        }
    }
}
exports.SocketData = SocketData;
//# sourceMappingURL=socketData.js.map