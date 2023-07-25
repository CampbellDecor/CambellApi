"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fire = tslib_1.__importStar(require("./Firebase"));
class FireStore {
    constructor(collection) {
        this.firestore = fire.firestore();
        this.collection = collection;
        this.store = typeof (collection) == 'string' ? this.firestore.collection(collection) : this.firestore;
    }
    addDoc(object, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.available();
            try {
                if (id == undefined) {
                    yield this.store.doc().create(object);
                }
                else {
                    if (typeof (id) == 'boolean') {
                        const Collectionall = yield this.store.get();
                        let count = Collectionall.size;
                        id == true ? count++ : Math.floor(Math.random() * count);
                        id = count.toString();
                    }
                    yield this.store.doc(id).set(object);
                    return id;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    available() {
        if (this.collection == undefined)
            return;
        else
            return true;
    }
}
