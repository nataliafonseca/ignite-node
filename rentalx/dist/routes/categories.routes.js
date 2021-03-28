"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var CreateCategoryController_1 = require("../modules/cars/useCases/createCategory/CreateCategoryController");
var ImportCategoriesController_1 = require("../modules/cars/useCases/importCategories/ImportCategoriesController");
var ListCategoriesController_1 = require("../modules/cars/useCases/listCategories/ListCategoriesController");
var categoriesRoutes = express_1.Router();
exports.categoriesRoutes = categoriesRoutes;
var upload = multer_1.default({
    dest: './tmp',
});
var createCategoryController = new CreateCategoryController_1.CreateCategoryController();
var listCategoriesController = new ListCategoriesController_1.ListCategoriesController();
var importCategoriesController = new ImportCategoriesController_1.ImportCategoriesController();
categoriesRoutes.post('/', createCategoryController.handle);
categoriesRoutes.get('/', listCategoriesController.handle);
categoriesRoutes.post('/import', upload.single('file'), importCategoriesController.handle);
