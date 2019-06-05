"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stockcontroller_1 = require("../controllers/stockcontroller");
class Routes {
    constructor() {
        this.stockController = new stockcontroller_1.StockController();
    }
    routes(app) {
        app.route("/")
            .get((req, res) => {
            res.status(200).send({
                message: "GET request successfulll!!!!"
            });
        });
        // Stock
        app.route("/stock/:stockId")
            .get(this.stockController.getStock.bind(this.stockController));
    }
}
exports.Routes = Routes;
//# sourceMappingURL=stockRoutes.js.map