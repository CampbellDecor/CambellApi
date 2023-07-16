"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = tslib_1.__importDefault(require("../src/index"));
describe('testing index file', () => {
    test('empty string should result in zero', () => {
        expect((0, index_1.default)(1, 4)).toBe(5);
    });
});
