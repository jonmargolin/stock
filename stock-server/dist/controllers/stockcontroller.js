"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stockeModel_1 = require("../model/stockeModel");
class StockController {
    constructor() {
        this.stockList = stockeModel_1.StockList.getInstance();
    }
    getStock(req, res) {
        if (this.stockList.checkStockExist(req.params.stockId)) {
            res.status(200).send({
                message: "GET request successfulll!!!!"
            });
        }
        else {
            res.status(200).send({
                message: "data already exist "
            });
        }
    }
}
exports.StockController = StockController;
//# sourceMappingURL=stockcontroller.js.map