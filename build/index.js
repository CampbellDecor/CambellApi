"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const routes_1 = tslib_1.__importDefault(require("./router/routes"));
const express_1 = tslib_1.__importDefault(require("express"));
const connect_timeout_1 = tslib_1.__importDefault(require("connect-timeout"));
const campellApiApp = (0, express_1.default)();
campellApiApp.use((0, connect_timeout_1.default)('120s'));
campellApiApp.use(express_1.default.json());
// Define your routes and other middleware here
// Error handling for timeout
campellApiApp.use((req, res, next) => {
    if (!req.timedout) {
        next();
    }
    else {
        // Respond with an error message or take other actions
        res.status(503).send('Request timed out');
    }
});
//routing
campellApiApp.use("/api", routes_1.default);
campellApiApp.listen(8808, () => {
    console.log("Hello");
});
