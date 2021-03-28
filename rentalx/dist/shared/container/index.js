"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var UsersRepository_1 = require("../../modules/accounts/repositories/implementations/UsersRepository");
var CategoriesRepository_1 = require("../../modules/cars/repositories/implementations/CategoriesRepository");
var SpecificationsRepository_1 = require("../../modules/cars/repositories/implementations/SpecificationsRepository");
tsyringe_1.container.registerSingleton('CategoriesRepository', CategoriesRepository_1.CategoriesRepository);
tsyringe_1.container.registerSingleton('SpecificationsRepository', SpecificationsRepository_1.SpecificationsRepository);
tsyringe_1.container.registerSingleton('UsersRepository', UsersRepository_1.UsersRepository);
