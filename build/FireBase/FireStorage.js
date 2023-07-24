"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Firebase_1 = tslib_1.__importDefault(require("./Firebase"));
let fireStorage = Firebase_1.default.storage();
let Budcket = fireStorage.bucket();
class FireStorage {
    static upload(localFilePath, storageBaseFilepath, storagename) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let storageFilepath = new FireStorage().renameFile(localFilePath, storageBaseFilepath, storagename);
            try {
                yield Budcket.upload(localFilePath, {
                    destination: storageFilepath
                });
                const file = Budcket.file(storageFilepath);
                const [url] = yield file.getSignedUrl({
                    action: 'read',
                    expires: FireStorage.expriedDate(4)
                });
                return { storageUrl: storageFilepath,
                    url: url };
            }
            catch (error) {
                console.error('Error uploading file:', error);
                throw error;
            }
        });
    }
    renameFile(url, basepath, filename) {
        let type = url.substring((url.lastIndexOf(".")));
        let name = filename != undefined ? filename : url.substring(url.lastIndexOf("/"), url.lastIndexOf("."));
        let storageFilepath = basepath + "/" + name + type;
        return storageFilepath;
    }
    static expriedDate(howlong) {
        let date = new Date();
        return `${date.getFullYear() + 100}+${date.getMonth() + 1}-${date.getDate() + howlong}`;
    }
}
FireStorage.upload("./unnamed.png","user","thanush").then(console.log);
