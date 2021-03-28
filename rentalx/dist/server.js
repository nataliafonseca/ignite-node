"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
require("./database");
var handleErrors_1 = require("./middleware/handleErrors");
var routes_1 = require("./routes");
require("./shared/container");
var swagger_json_1 = __importDefault(require("./swagger.json"));
var app = express_1.default();
app.use(express_1.default.json());
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use(routes_1.router);
app.use(handleErrors_1.handleErrors);
app.listen(3333, function () { return console.log('Server is running!'); });
