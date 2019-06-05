import * as https from "https";
import {SocketData} from "../socket/socketData"
import dotenv from "dotenv";
dotenv.config();
const apiKey: string = process.env.apiKey;
export class StockList{
    private static  instance: StockList;
     public stockArray: string[] = [];
     public dataArray:any =[];
     private socket : SocketData;
     static getInstance(){
         if(!StockList.instance){
             StockList.instance= new StockList();
         }
         return StockList.instance;
     }
     public checkStockExist(stock: string): boolean{
         if(this.stockArray.indexOf(stock)> -1){
             return  false
         }
         else {
             this.stockArray.push(stock)

             if(this.stockArray.length ===1 ){
                 this.socket = SocketData.getSocket()
             }
           this.stockArray.forEach((stock)=>{
              const data =  this.startQueeringStock(stock);
              data.then((tables: any)=>{
                  if( tables[0].hasOwnProperty('error')) {

                      this.socket.emitData( JSON.stringify(tables[0]), 'error');
                  } else {
                      this.dataArray.push(tables[0]);
                      this.socket.emitData(JSON.stringify({tables: tables}), 'data');
                  }
              })
          })
             return  true
         }
     }
     public  getStockData(){
          return this.dataArray;
     }
     private  startQueeringStock(stock: string) {
         return    this.getStock(stock)

         // setInterval(async () => {
         // }, 100000)
     }
     private  getStock(stock: string) {
         const prms: Promise<any>[] = [];
       //  this.stockArray.forEach((stock) => {
             prms.push(
                 new Promise<any>((resolve, reject) => {
                     https.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${stock}&apikey=${apiKey}`, res => {
                         let data = '';
                         res.on('data', chunk => {
                             data += chunk
                         })
                         res.on('end', () => {
                             const dataArray: any = []
                             const resData = JSON.parse(data);
                             if (resData.hasOwnProperty('Meta Data')) {
                                 const obj: any = Object.values(resData);
                                 const renameProp = (
                                     oldProp: string,
                                     newProp: string,
                                     {[oldProp]: old, ...others}
                                 ) => ({
                                     [newProp]: old,
                                     ...others
                                 })

                                 Object.keys(obj[0]).forEach((key) => {
                                     const newKey = key.slice(3);
                                     obj[0] = renameProp(key, newKey, obj[0]);
                                 })
                                 Object.keys(obj[1]).forEach((key) => {
                                     const rowArray: number[] = []
                                     const time: number = Date.parse(key);
                                     const item: string[] = Object.values(obj[1][`${key}`])
                                     rowArray.push(time, parseInt(item[0]), parseInt(item[3]))
                                     dataArray.push(rowArray)
                                 })

                                 resolve({metaData: obj[0], data: dataArray, id: obj[0][`Symbol`]})

                             } else {
                                 resolve({error: 'can not get  data'});
                             }
                         })
                     })
                         .on('error', err => {
                             resolve({error: 'can not get  data'});
                         })
                 })
             )
        // })
         return Promise.all(prms)
     }
 }
