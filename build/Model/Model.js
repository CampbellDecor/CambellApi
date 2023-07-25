"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
class Model {
    constructor(data) {
        this.data = data;
    }
    static setData(data) { throw new Error("set data must be implement"); }
    getData(data) {
        return data;
    }
}
exports.Model = Model;
