const nodemailer = require( "nodemailer" );
const Function = require( "../../functions/node_modules/firebase-functions" );
const MailInfo = require( "./MailInfo.js" );
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: MailInfo.auth
} );


exports.sendSingleMail = async (reciver,subject,body) =>
{
  var mailOptions = {
  from: 'campbelldecor087@gmail.com',
  to: reciver,
  subject,
  html:body
  };
  let result;
  await transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    throw error;
  } else {
    result='Email sent: ' + info.response;
  }
  } );
  return result;
}


