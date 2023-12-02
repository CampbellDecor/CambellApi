const Qrcode = require("qrcode");
const Qr_genrator = require('qrcode-generator');
const {
    basepath
} = require("../../config/BasePath.js")

class QRCode {
    qr_genrator = Qr_genrator(4, 'L');
    constructor(data, time = new Date().toISOString()) {
        this.data = data;
        this.time = time;
        this.prepare();

    }
    prepare() {
        this.Data = {
            ...this.data,
            time: this.time
        }
        this.qr_genrator.addData(this.Data);
        this.qr_genrator.make();
        this.stringData = JSON.stringify(this.Data);
    }
    getdata() {
        return data;
    }
    setdata(data) {
        this.prepare();
        this.data = data;
    }
    gettime() {
        return this.time;
    }
    settime(time) {
        this.prepare();
        this.time = time;
    }
    async QrString() {
        try {
            return await Qrcode.toString(this.stringData);
        } catch (error) {
            throw error;
        }
    }
    QrImage() {
        try {
            return this.qr_genrator.createImgTag()
        } catch (error) {
            throw error;
        }
    }
    QrSvg() {
        return this.qr_genrator.createSvgTag();
    }
    async QrFile(filename) {
        try {
            const Path = basepath + "\\asserts\\Qr\\" + filename
            await Qrcode.toFile(Path, this.stringData);
            return Path;
        } catch (error) {
            throw error;
        }

    }
    async QrImageFile(name) {
        try {
            const Path = basepath + "\\asserts\\Qr\\" + name + '.png'
            await Qrcode.toFile(Path, this.stringData);
            return Path;
        } catch (error) {
            throw error;
        }

    }
    QrDataUrl() {
        return this.qr_genrator.createDataURL();
    }
}


const g = new QRCode({
    name: "ttt"
});
g.QrImageFile('my').then(console.log)
//module.exports = QRCode;
