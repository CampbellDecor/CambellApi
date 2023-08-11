"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const admin_1 = tslib_1.__importDefault(require("../controller/admin"));
const adminController = new admin_1.default();
const Router = express_1.default.Router();
Router.post("/all", adminController.getAll);
Router.route("/:id")
    .post(adminController.getById)
    .put(adminController.edit)
    .delete(adminController.delete);
Router.post("/login", adminController.login);
Router.post("/sigout", adminController.logout);
exports.default = Router;
