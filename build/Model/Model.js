"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

exports.Details = exports.Model = void 0;
class Model {
    static setData(data) { throw new Error("set data must be implement"); }
    getData() {
        return this.data;
    }
}
exports.Model = Model;
class Details {
}
exports.Details = Details;

