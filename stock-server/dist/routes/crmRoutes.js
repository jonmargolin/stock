"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crmController_1 = require("../controllers/crmController");
const stockcontroller_1 = require("../controllers/stockcontroller");
class Routes {
    constructor() {
        this.contactController = new crmController_1.ContactController();
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
        // Contact
        app.route("/contact")
            // GET endpoint
            .get(this.contactController.getcontacts)
            // POST endpoint
            .post(this.contactController.addNewContact);
        // Contact detail
        app.route("/contact/:contactId")
            // get specific contact
            .get(this.contactController.getContactWithID)
            .put(this.contactController.updatecontact)
            .delete(this.contactController.deleteContact);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=crmRoutes.js.map