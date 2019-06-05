import express, {Request, Response} from "express";
import {StockController} from "../controllers/stockcontroller"


export class Routes {
    public stockController: StockController = new  StockController()
    public routes(app: express.Application): void {
        app.route("/")
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: "GET request successfulll!!!!"
                });
            });
        // Stock
        app.route("/stock/:stockId")
            .get(this.stockController.getStock.bind(this.stockController))

    }

}
