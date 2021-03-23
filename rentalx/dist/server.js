"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.get("/", function (request, response) {
    return response.json({ message: "Hello World" });
});
app.post("/courses", function (request, response) {
    var name = request.body.name;
    return response.json({ name: name });
});
app.listen(3333, function () { return console.log("Server is running!"); });
