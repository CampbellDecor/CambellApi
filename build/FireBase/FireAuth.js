"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireAuth = void 0;
const tslib_1 = require("tslib");
const Firebase_1 = tslib_1.__importDefault(require("./Firebase"));
const Auth = Firebase_1.default.auth();
class FireAuth {
    static add(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const newuser = yield Auth.createUser({
                    email: user.getEmail(),
                    password: user.getPassword(),
                    phoneNumber: user.getMobile(),
                    displayName: user.getUsername(),
                    photoURL: user.getProfile()
                });
                user.setUid(newuser.uid);
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static delete(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield Auth.deleteUser(user);
            }
            catch (error) {
                throw error;
            }
        });
    }
    static edit(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                if ((user === null || user === void 0 ? void 0 : user.getUid()) != undefined)
                    yield Auth.updateUser(user.getUid(), {
                        displayName: user.getUsername(),
                        password: user.getPassword(),
                        email: user.getEmail(),
                        phoneNumber: user.getMobile(),
                        photoURL: user.getProfile()
                    });
            }
            catch (error) {
            }
        });
    }
}
exports.FireAuth = FireAuth;
module.exports = FireAuth;
