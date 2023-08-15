"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const FireStore_1 = tslib_1.__importDefault(require("../FireBase/FireStore"));
const FireAuth_1 = tslib_1.__importDefault(require("../FireBase/FireAuth"));
const userStore = new FireStore_1.default("user");
const Auth = new FireAuth_1.default();
class Service_user {
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userStore.count();
                return users;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = Service_user;
