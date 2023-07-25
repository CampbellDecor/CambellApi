"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const userService_1 = tslib_1.__importDefault(require("../Service/userService"));
const User_1 = require("../Model/User");
const userService = new userService_1.default();
const user = new User_1.UserBuilder();
class User {
    addUser(req, res) {
        try {
            const [email, mobile, password] = req.body;
            user.setEmail(email)
                .setMobile(mobile)
                .setPassword(password);
            userService.addService(user.getUser());
        }
        catch (error) {
            res.status(404).json(error);
        }
    }
}
exports.default = User;
