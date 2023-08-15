"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Service_1 = require("../Service/Service");
const User_1 = require("../Model/User");
const controller_1 = require("./controller");
const userservice = new Service_1.ServiceProvider("user").getService();
const user = new User_1.UserBuilder();
class UserContoller extends controller_1.RoleController {
    add(req, res) {
        try {
            const { uid, password, username, religion, firstname, lastname, email, mobile } = req.body;
            if ((email | mobile) && password) {
            }
            else {
                res.redirect("/add");
            }
        }
        catch (error) {
            throw error;
        }
    }
    edit(req, res) {
        throw new Error("Method not implemented.");
    }
    delete(req, res) {
        throw new Error("Method not implemented.");
    }
    getAll(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield userservice.getAll();
            }
            catch (err) {
                res.json(err);
            }
        });
    }
    getById(req, res) {
        throw new Error("Method not implemented.");
    }
    login(req, res) {
        throw new Error("Method not implemented.");
    }
    logout(req, res) {
        throw new Error("Method not implemented.");
    }
    isexist(req, res) {
        throw new Error("Method not implemented.");
    }
}
exports.default = UserContoller;
