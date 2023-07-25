"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Fire_1 = tslib_1.__importDefault(require("./Fire"));
const Budget = Fire_1.default.storage().bucket();
class Stroage {
    static upload(localFilePath, storageFilepath) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield Budget.upload(localFilePath, {
                    destination: storageFilepath
                });
                return 'File uploaded successfully.';
            }
            catch (error) {
                console.error('Error uploading file:', error);
                throw error;
            }
        });
    }
}
exports.default = Stroage;
