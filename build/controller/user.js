"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const userService_1 = tslib_1.__importDefault(require("../Service/userService"));
const User_1 = require("../Model/User");
const controller_1 = require("./controller");
const userService = new userService_1.default();
const user = new User_1.UserBuilder();
class User extends controller_1.UserController {
    add(req, res) {
        try {
            const { email, password, mobile } = req.body;
            user.setEmail(email).setPassword(password).setMobile(mobile);
        }
        catch (error) {
            express_1.response.status(404).json(error);
        }
    }
    edit(req, res) {
    }
    delete(req, res) {
    }
    getAll(req, res) {
    }
    getById(req, res) {
    }
    login(req, res) {
    }
    logout(req, res) {
    }
}
exports.default = User;
