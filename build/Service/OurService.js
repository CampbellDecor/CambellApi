"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const FireStore_1 = tslib_1.__importDefault(require("../FireBase/FireStore"));
const Store = new FireStore_1.default('service');
class Service_OurService {
    addService(model, id) {
        let serid = "";
        () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                if (id) {
                    serid = id == '/aci/i' ? yield Store.addWithIncrement(model) : yield Store.addWithId(model, id);
                }
                else {
                    serid = yield Store.add(model);
                }
            }
            catch (error) {
                throw error;
                serid = "error";
            }
        });
        return serid;
    }
    editService(model, id) {
        throw new Error('Method not implemented.');
    }
    FindByID(id) {
        throw new Error('Method not implemented.');
    }
    getAll() {
        throw new Error('Method not implemented.');
    }
    deleteService(model) {
        throw new Error('Method not implemented.');
    }
    sort(field) {
        throw new Error('Method not implemented.');
    }
    isExist(model) {
        throw new Error('Method not implemented.');
    }
    search(model) {
        throw new Error('Method not implemented.');
    }
}
