const nodemailer = require( "nodemailer" );
const Function = require( "../../functions/node_modules/firebase-functions" );
var transporter = nodemailer.createTransport({
  service: "gmail",
   port: 465,
  secure: true, 
  auth: {
    user: 'campbelldecor087@gmail.com',
    pass: 'zswsgpsfbkjuyrkh'
  }
} );
/*
const sendSingleMail = async (reciver,subject,body) =>
{*/
  var mailOptions = {
  from: 'campbelldecor087@gmail.com',
  to: "thanumahee440@gmail.com",
  subject:"Thelo",
  text:"hi"
  };
  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
//}



