"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Fire_1 = require("./Fire");
const Model_1 = require("../Model/Model");
class FireStore {
    constructor(collection) {
        this.FireStoreB = (0, Fire_1.firestore)();
        this.Entity = this.FireStoreB.collection(collection);
    }
    add(element) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const row = yield this.Entity.add(element);
                return row.id;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addWithId(element, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const row = this.Entity.doc(id);
                yield row.set(Model_1.Model);
                return row.id;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addWithIncrement(element) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let id = 0;
            try {
                const snapshot = yield this.Entity.orderBy('createdAt', 'desc').limit(1).get();
                if (!snapshot.empty) {
                    const lastDocument = snapshot.docs[0];
                    const last = lastDocument.id;
                    id = parseInt(last);
                }
                const row = this.Entity.doc(id);
                yield row.set(Model_1.Model);
                return row.id;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(element) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const obj = yield this.Entity.doc(element.getId());
                ;
                obj.delete();
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteWithId(element) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const obj = yield this.Entity.doc(element);
                obj.delete();
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    edit(element) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const obj = yield this.Entity.doc(element.getId());
                ;
                obj.update(element);
            }
            catch (error) {
                throw error;
            }
        });
    }
    editWithId(element, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const obj = yield this.Entity.doc(id);
                obj.update(element);
                return element;
            }
            catch (error) {
                throw error;
            }
        });
    }
    orderById() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const snapshot = yield this.Entity.orderBy(Fire_1.firestore.FieldPath.documentId()).get();
                const documents = [];
                snapshot.forEach((doc) => {
                    documents.push(Model_1.Model.setData(doc.data()).fixedId(doc.id));
                });
                return documents;
            }
            catch (error) {
                throw error;
            }
        });
    }
    orderBy(field, orderby) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const snapshot = yield this.Entity.orderBy(field, orderby !== null && orderby !== void 0 ? orderby : 'asc').get();
                const documents = [];
                snapshot.forEach((doc) => {
                    documents.push(Model_1.Model.setData(doc.data()).fixedId(doc.id));
                });
                return documents;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const querySnapshot = yield this.Entity.get();
                const documents = [];
                querySnapshot.forEach((doc) => {
                    documents.push(Model_1.Model.setData(doc.data()).fixedId(doc.id));
                });
                return documents;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getByID(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const docRef = yield this.Entity.doc(id);
                const docSnapshot = yield docRef.get();
                if (docSnapshot.exists) {
                    return docSnapshot.data();
                }
                else {
                    throw new Error('Not found');
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    count() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const snapshot = yield this.Entity.get();
                return snapshot.size;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
