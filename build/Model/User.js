"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
var salt = bcryptjs_1.default.genSaltSync(10);
class User {
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
    constructor(email, password, mobile, uid, religion, firstname, lastname, username, profile, isblock, isonline) {
        this.email = email;
        this.password = bcryptjs_1.default.hashSync(password !== null && password !== void 0 ? password : '', salt);
        this.mobile = mobile;
        this.firstname = firstname;
        this.lastname = lastname;
        this.uid = uid;
        this.username = username;
        this.profile = profile;
        this.religion = religion;
        this.isonline = isonline;
        this.isblock = isblock;
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
        this.email = email;
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
}
console.log(User.InstanceOf());
