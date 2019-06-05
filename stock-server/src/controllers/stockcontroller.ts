import { Request, Response } from "express";
import {StockList}  from "../model/stockeModel"


export class StockController {

  public stockList: StockList;

  constructor() {
    this.stockList = StockList.getInstance();
  }

  public getStock(req: Request, res: Response) {

    if (this.stockList.checkStockExist(req.params.stockId)) {

      res.status(200).send({
        message: "GET request successfulll!!!!"
      });
    } else {
      res.status(400).send({
        message: "data already exist "
      })
    }
  }
}
