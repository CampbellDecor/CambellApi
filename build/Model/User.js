"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBuilder = exports.User = void 0;
const tslib_1 = require("tslib");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const validator_1 = tslib_1.__importDefault(require("validator"));
var salt = bcryptjs_1.default.genSaltSync(10);
class User {
    constructor(email, password, mobile, uid, religion, firstname, lastname, username, profile, isblock, isonline) {
        this.email = validator_1.default.isEmail(email !== null && email !== void 0 ? email : '') ? email : undefined;
        this.password = bcryptjs_1.default.hashSync(password !== null && password !== void 0 ? password : '', salt);
        this.mobile = validator_1.default.isMobilePhone(mobile !== null && mobile !== void 0 ? mobile : '') ? mobile : undefined;
        this.firstname = firstname;
        this.lastname = lastname;
        this.uid = uid;
        this.username = username !== null && username !== void 0 ? username : email === null || email === void 0 ? void 0 : email.substr(email.indexOf("@")),
            this.profile = profile;
        this.religion = religion;
        this.isonline = isonline;
        this.isblock = isblock;
    }
    getIsblock() {
        return this.isblock;
    }
    setIsblock(isblock) {
        this.isblock = isblock;
    }
    getIsonline() {
        return this.isonline;
    }
    setIsonline(isonline) {
        this.isonline = isonline;
    }
    getUid() {
        return this.uid;
    }
    setUid(uid) {
        this.uid = uid;
    }
    getFirstname() {
        return this.firstname;
    }
    setFirstname(firstname) {
        this.firstname = firstname;
    }
    getUsername() {
        return this.username;
    }
    setUsername(username) {
        this.username = username;
    }
    getProfile() {
        return this.profile;
    }
    setProfile(profile) {
        this.profile = profile;
    }
    getLastname() {
        return this.lastname;
    }
    setLastname(lastname) {
        this.lastname = lastname;
    }
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = validator_1.default.isEmail(email) ? email : undefined;
    }
    getPassword() {
        return this.password;
    }
    comparePassword(password) {
        var _a;
        return bcryptjs_1.default.compareSync(password, (_a = this.password) !== null && _a !== void 0 ? _a : '');
    }
    setPassword(password) {
        this.password = bcryptjs_1.default.hashSync(password, salt);
    }
    getMobile() {
        return this.mobile;
    }
    setMobile(mobile) {
        this.mobile = mobile;
    }
    getReligion() {
        return this.religion;
    }
    setReligion(religion) {
        this.religion = religion;
    }
    static InstanceOf() {
        return new User();
    }
    static UserBuilder() {
        return new UserBuilder();
    }
}
exports.User = User;
class UserBuilder {
    constructor(user) {
        this.user = user !== null && user !== void 0 ? user : new User();
    }
    setIsblock(isblock) {
        this.user.setIsblock(isblock);
        return this;
    }
    setIsonline(isonline) {
        this.user.setIsonline(isonline);
        return this;
    }
    setUid(uid) {
        this.user.setUid(uid);
        return this;
    }
    setMobile(mobile) {
        this.user.setMobile(mobile);
        return this;
    }
    setReligion(religion) {
        this.user.setReligion(religion);
        return this;
    }
    setPassword(password) {
        this.user.setPassword(password);
        return this;
    }
    setEmail(email) {
        this.user.setEmail(email);
        return this;
    }
    setLastname(lastname) {
        this.user.setLastname(lastname);
        return this;
    }
    setProfile(profile) {
        this.user.setProfile(profile);
        return this;
    }
    setUsername(username) {
        this.user.setUsername(username);
        return this;
    }
    setFirstname(firstname) {
        this.user.setFirstname(firstname);
        return this;
    }
    getUser() {
        return this.user;
    }
}
exports.UserBuilder = UserBuilder;
