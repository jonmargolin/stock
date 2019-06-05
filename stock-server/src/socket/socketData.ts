
import socketio from "socket.io";
import Socket from "socket.io";
import {StockList} from "../model/stockeModel";

let  data: any =[];
export  class SocketData {
    private static instance: SocketData;
    public stockList: StockList;
    public  io : any
    public  http:any
    public initSocket(http: any){
        this.stockList = StockList.getInstance();
        let data = this.stockList;
        this.io = socketio(http)
        this.io.on("connection", function(socket: any) {
            console.log("Client connected!")
            const i = data.getStockData();
            socket.emit("message",JSON.stringify({tables: i}));
            socket.on("message", function(msg: any) {
                console.log(data)
            })
        })


    }


    static getInstance() {

        if (!SocketData.instance) {
            SocketData.instance = new SocketData();
        }
        return SocketData.instance;
    }
    static getSocket(){
        return SocketData.instance;
    }
    constructor() {
        this.initSocket(this.http)
    }
    public emitData(data: any, type: string) {
        if (type === 'error') {
            this.io.sockets.emit('error', data)
        } else {
            if (this.io.sockets.emit('message', data)) {
                console.log("1")
            } else {
                console.log(2)
            }
        }
    }



}
