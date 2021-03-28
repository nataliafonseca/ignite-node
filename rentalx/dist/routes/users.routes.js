"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("../config/upload"));
var CreateUserController_1 = require("../modules/accounts/useCases/createUser/CreateUserController");
var UpdateUserAvatarController_1 = require("../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController");
var usersRoutes = express_1.Router();
exports.usersRoutes = usersRoutes;
var uploadAvatar = multer_1.default(upload_1.default.upload('./tmp/avatar'));
var createUserController = new CreateUserController_1.CreateUserController();
var updateUserAvatarController = new UpdateUserAvatarController_1.UpdateUserAvatarController();
usersRoutes.post('/', createUserController.handle);
usersRoutes.patch('/avatar', uploadAvatar.single('avatar'), updateUserAvatarController.handle);
