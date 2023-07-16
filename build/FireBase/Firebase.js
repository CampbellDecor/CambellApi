"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const firebase_admin_1 = tslib_1.__importDefault(require("firebase-admin"));
const ServiceKey_js_1 = tslib_1.__importDefault(require("./ServiceKey.js"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(JSON.stringify(ServiceKey_js_1.default))
});
exports.default = firebase_admin_1.default;
