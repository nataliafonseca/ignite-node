"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
var AppError_1 = require("../errors/AppError");
function handleErrors(err, request, response, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) {
    if (err instanceof AppError_1.AppError) {
        return response.status(err.statusCode).json({ Error: err.message });
    }
    return response
        .status(500)
        .json({ Error: "Internal server error - " + err.message });
}
exports.handleErrors = handleErrors;
