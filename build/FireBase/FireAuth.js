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
}
exports.FireAuth = FireAuth;
