"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const user_1 = tslib_1.__importDefault(require("../controller/user"));
const UserController = new user_1.default();
const Router = express_1.default.Router();
exports.default = Router;
