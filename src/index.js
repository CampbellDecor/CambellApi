"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const campellApiApp = (0, express_1.default)();
campellApiApp.listen(8888, () => {
    console.log("Hello");
});
