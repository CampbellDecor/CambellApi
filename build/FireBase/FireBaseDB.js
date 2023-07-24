"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Fire_1 = require("./Fire");
class FireDatabase {
    constructor(collection) {
        this.Database = (0, Fire_1.database)();
        this.Entity = this.Database.ref(collection);
    }
    add(element) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const row = yield this.Entity.push();
                yield row.set(element);
                return row.key;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addWithId(element, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const row = yield this.Entity.child(id);
                yield row.set(element);
                return row.key;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addWithIncrement(element) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const snapshot = yield this.Entity.orderByKey().limitToLast(1).once('value');
                // The snapshot will contain the last added element, which you can get the key from.
                const lastKey = Object.keys(snapshot.val())[0];
                const row = yield this.Entity.child(parseInt(lastKey) + 1);
                yield row.set(element);
                return row.key;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
