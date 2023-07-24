"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Firebase_1 = tslib_1.__importDefault(require("./Firebase"));
const validator_1 = tslib_1.__importDefault(require("validator"));
class FireDb {
    constructor(collection) {
        this.fireDB = Firebase_1.default.database();
        this.collection = collection;
        this.Db = this.fireDB.ref(collection);
    }
    add(object, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let dbobj;
            try {
                if (id != undefined) {
                    if (validator_1.default.isBoolean(id)) {
                        let itemCount = 0;
                        yield this.Db.once('value', (snapshot) => {
                            itemCount = snapshot.numChildren();
                        });
                        id = id ? itemCount++ : Math.floor(Math.random() * itemCount);
                    }
                    dbobj = this.Db.child(id);
                }
                else
                    dbobj = yield this.Db.push().then((item) => {
                        id = item.key;
                    });
                yield dbobj.set(object);
                return id;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
