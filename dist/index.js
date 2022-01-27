"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./pre-start"); // Must be the first import
const _server_1 = __importDefault(require("@server"));
const Logger_1 = __importDefault(require("@shared/Logger"));
const mongoose_1 = require("mongoose");
// Start the server
const port = Number(process.env.PORT || 3000);
(0, mongoose_1.connect)('mongodb://admin:mitreadmin123456@localhost:27017/?authSource=admin').then(() => {
    Logger_1.default.info('connected to db');
    _server_1.default.listen(port, () => {
        Logger_1.default.info('Express server started on port: ' + port);
    });
}).catch((err) => Logger_1.default.err(err));
