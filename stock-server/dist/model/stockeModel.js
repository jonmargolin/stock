"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https = __importStar(require("https"));
const socketData_1 = require("../socket/socketData");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const apiKey = process.env.apiKey;
class StockList {
    constructor() {
        this.stockArray = [];
        this.dataArray = [];
    }
    static getInstance() {
        if (!StockList.instance) {
            StockList.instance = new StockList();
        }
        return StockList.instance;
    }
    checkStockExist(stock) {
        if (this.stockArray.indexOf(stock) > -1) {
            this.socket.emitData(JSON.stringify({ tables: this.dataArray }), 'data');
        }
        else {
            this.stockArray.push(stock);
            if (this.stockArray.length === 1) {
                this.socket = socketData_1.SocketData.getSocket();
            }
            this.stockArray.forEach((stock) => {
                const data = this.startQueeringStock(stock);
                data.then((tables) => {
                    if (tables[0].hasOwnProperty('error')) {
                        this.socket.emitData(JSON.stringify(tables[0]), 'error');
                    }
                    else {
                        this.dataArray.push(tables[0]);
                        this.socket.emitData(JSON.stringify({ tables: tables }), 'data');
                    }
                });
            });
            return true;
        }
    }
    getStockData() {
        return this.dataArray;
    }
    startQueeringStock(stock) {
        return this.getStock(stock);
        // setInterval(async () => {
        // }, 100000)
    }
    getStock(stock) {
        const prms = [];
        //  this.stockArray.forEach((stock) => {
        prms.push(new Promise((resolve, reject) => {
            https.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${stock}&apikey=${apiKey}`, res => {
                let data = '';
                res.on('data', chunk => {
                    data += chunk;
                });
                res.on('end', () => {
                    const dataArray = [];
                    const resData = JSON.parse(data);
                    if (resData.hasOwnProperty('Meta Data')) {
                        const obj = Object.values(resData);
                        const renameProp = (oldProp, newProp, _a) => {
                            var _b = oldProp, old = _a[_b], others = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
                            return (Object.assign({ [newProp]: old }, others));
                        };
                        Object.keys(obj[0]).forEach((key) => {
                            const newKey = key.slice(3);
                            obj[0] = renameProp(key, newKey, obj[0]);
                        });
                        Object.keys(obj[1]).forEach((key) => {
                            const rowArray = [];
                            const time = Date.parse(key);
                            const item = Object.values(obj[1][`${key}`]);
                            rowArray.push(time, parseInt(item[0]), parseInt(item[3]));
                            dataArray.push(rowArray);
                        });
                        resolve({ metaData: obj[0], data: dataArray, id: obj[0][`Symbol`] });
                    }
                    else {
                        resolve({ error: 'can not get  data' });
                    }
                });
            })
                .on('error', err => {
                resolve({ error: 'can not get  data' });
            });
        }));
        // })
        return Promise.all(prms);
    }
}
exports.StockList = StockList;
//# sourceMappingURL=stockeModel.js.map