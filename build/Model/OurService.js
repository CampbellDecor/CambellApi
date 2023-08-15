"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./Model");
class OurService extends Model_1.Model {
    constructor(ServiceCode, ServiceName, rating, ServiceId) {
        super();
        this.Images = [];
        this.description = "";
        this.ServiceCode = ServiceCode;
        this.ServiceName = ServiceName;
        this.rating = rating !== null && rating !== void 0 ? rating : 0;
        this.ServiceId = ServiceId;
    }
    getDescription() {
        return this.description;
    }
    setDescription(description) {
        this.description = description;
    }
    getServiceCode() {
        return this.ServiceCode;
    }
    setServiceCode(ServiceCode) {
        this.ServiceCode = ServiceCode;
    }
    getServiceName() {
        return this.ServiceName;
    }
    setServiceName(ServiceName) {
        this.ServiceName = ServiceName;
    }
    getRating() {
        return this.rating;
    }
    setRating(rating) {
        this.rating = rating;
    }
    getImages() {
        return this.Images;
    }
    setImages(Images) {
        this.Images = Images;
    }
    instansof() {
        return this;
    }
    getId() {
        return this.ServiceId;
    }
    fixedId(id) {
        this.ServiceId = id;
        return this;
    }
}
exports.default = OurService;
