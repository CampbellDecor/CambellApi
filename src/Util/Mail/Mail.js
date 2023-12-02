const nodemailer = require("nodemailer");
const neh = require("nodemailer-express-handlebars");
const path = require("path");
const MailInfo = require("./MailInfo.js");
const fs = require('fs');
// const {
//   getcontent
// } = require("./Htmlhandle/showpage.js");

class CambellMail {

  constructor(auth, reciver = '', subject = '', noreply = true) {
    this.auth = auth;
    this.reciver = reciver;
    this.subject = subject;
    this.noreply = noreply;
  }
  init() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: this.auth
    });
    this.mailOptions = {
      from: this.auth.user,
      to: this.reciver,
      subject: this.subject,
      replyTo: this.noreply ? null : this.noreply
    };
  }
  setreciver(reciver) {
    this.reciver = reciver;
    return this;
  }
  setnoreply(noreply) {
    this.noreply = noreply;
    return this;
  }
  setSubject(subject) {
    this.subject = subject
    return this;
  }
  async sendMail() {
    this.init();
    this.prepare();
    try {
      await this.transporter.sendMail(this.mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          throw error;
        } else {
          return 'Email sent: ' + info.response;
        }
      })
    } catch (error) {
      throw error;
    }

  }
  static getInstance(auth = MailInfo.auth) {
    return new this(auth);
  }
  setConf(reciver, subject) {
    this.reciver = reciver;
    this.subject = subject;
  }
  prepare() {

  }
}
class TextCambellMail extends CambellMail {
  constructor(auth, reciver, subject, text = '') {
    super(auth, reciver, subject);
    this.text = text;
  }
  setText(text) {
    this.text = text;
    return this;
  }
  prepare() {
    this.mailOptions.text = this.text;
  }
}

//html content
class HtmlCambellMail extends CambellMail {
  constructor(auth, reciver = '', subject = '', html = '') {
    super(auth, reciver, subject);
    this.html = html;
  }
  setText(html) {
    this.html = html;
    return this;
  }
  sethtmlStem(path) {
    this.html = fs.ReadStream(path);
  }
  prepare() {
    this.mailOptions.html = this.html;
  }
}

//Mail Templete send
class HtmlTempleteCambellMail extends CambellMail {
  constructor(auth, reciver = '', subject = '', template = '', context = {}) {
    super(auth, reciver, subject);
    this.template = template;
    this.pathname = '';
    this.context = context;
    this.template = template;
  }
  setpathname(pathname) {
    this.pathname = pathname
    return this;
  }
  setTemplet(templete, context) {
    this.template = templete;
    this.context = context;
  }
  prepare() {
    const handlebarOption = {
      veiwEngine: {
        extName: '.handlebars',
        partialsDir: path.resolve(this.pathname),
        defaultLayout: false
      },
      viewPath: path.resolve(this.pathname),
      extName: '.handlebars'
    }
    this.transporter.use('compile', neh(handlebarOption))
    this.mailOptions.template = this.template;
    this.mailOptions.context = this.context;
  }

}


module.exports={HtmlCambellMail,TextCambellMail,HtmlTempleteCambellMail}
