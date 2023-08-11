"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Fire_1 = require("./Fire");
class FireAuth {
    getall() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const userList = yield (0, Fire_1.auth)().listUsers();
                let userRecord = [];
                yield userList.users.forEach(user => {
                    userRecord.push(user.toJSON());
                });
                return userRecord;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addUser(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                if (user.getEmail() !== undefined || user.getMobile() !== undefined) {
                    const authuser = yield (0, Fire_1.auth)().createUser({
                        displayName: user.getUsername(),
                        phoneNumber: user.getMobile(),
                        email: user.getEmail(),
                        photoURL: user.getProfile(),
                    });
                    return authuser.toJSON();
                }
                else {
                    return "Failed inputs";
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    edit(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, Fire_1.auth)().updateUser(user.getId(), {
                    displayName: user.getUsername(),
                    photoURL: user.getProfile(),
                    email: user.getEmail(),
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    changeProfile(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, Fire_1.auth)().updateUser(user.getId(), {
                    photoURL: user.getProfile()
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    verifyEmail(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                let usere;
                if (user.getEmail() != undefined) {
                    usere = yield (0, Fire_1.auth)().getUserByEmail(user.getEmail());
                    let link = "";
                    if (!usere.emailVerified) {
                        link = yield (0, Fire_1.auth)().generateEmailVerificationLink(user.getEmail());
                    }
                    return link;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = FireAuth;
