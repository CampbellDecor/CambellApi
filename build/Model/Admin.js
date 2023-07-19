"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
class Admin extends User_1.User {
    isIsadmin() {
        return this.isadmin;
    }
    setIsadmin(isadmin) {
        this.isadmin = isadmin;
    }
    constructor(isadmin) {
        super();
        this.isadmin = isadmin;
    }
}
class AdminBuilder extends User_1.UserBuilder {
    constructor(admin) {
        super(admin);
        this.admin = admin !== null && admin !== void 0 ? admin : new Admin();
    }
    setIsadmin(isadmin) {
        this.admin.setIsadmin(isadmin);
        return this;
    }
}
