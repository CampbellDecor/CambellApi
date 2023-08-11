"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const user_1 = tslib_1.__importDefault(require("../controller/user"));
const userConttoller = new user_1.default();
const Router = express_1.default.Router();
Router.post("/add", userConttoller.add);
Router.post("/", userConttoller.getAll);
Router.route("/:id")
    .post(userConttoller.getById)
    .delete(userConttoller.delete)
    .put(userConttoller.edit);
Router.post("/sigin", userConttoller.login);
Router.post("/sigout", userConttoller.logout);
exports.default = Router;
