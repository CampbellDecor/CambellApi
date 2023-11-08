const nodemailer = require("nodemailer");
const MailInfo = require("./MailInfo.js");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: MailInfo.auth
});


exports.sendSingleMail = async (reciver, subject, body) => {
  try {
    var mailOptions = {
      from: MailInfo.auth.user,
      to: reciver,
      subject,
      html: body
    };
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        throw error;
      } else {
        return 'Email sent: ' + info.response;
      }
    })
  } catch (error) {
    throw error;
  };
}
