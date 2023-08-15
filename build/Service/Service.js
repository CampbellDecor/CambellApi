"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProvider = void 0;
const tslib_1 = require("tslib");
const userService_1 = tslib_1.__importDefault(require("./userService"));
class ServiceProvider {
    constructor(servicePro) {
        switch (servicePro) {
            case "user":
                this.service = new userService_1.default();
                break;
            default:
                this.service = new userService_1.default();
                break;
        }
    }
    getService() {
        return this.service;
    }
}
exports.ServiceProvider = ServiceProvider;
