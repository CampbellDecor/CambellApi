"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
//Status
class Status {
    constructor(ishere, content) {
        this.ishere = ishere;
        this.content = content;
    }
    isIshere() {
        return this.ishere;
    }
    setIshere(ishere) {
        this.ishere = ishere;
    }
    getContent() {
        return this.content;
    }
    setContent(content) {
        this.content = content;
    }
}
exports.Status = Status;
