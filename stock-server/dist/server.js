"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./index"));
// initialize configuration
dotenv_1.default.config();
//const port = process.env.SERVER_PORT;
const port = 5000;
index_1.default.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log("Express server listening on port " + port);
});
//# sourceMappingURL=server.js.map