const nodemailer = require( "nodemailer" );
const testAccount = nodemailer.createTestAccount();
var transporter = nodemailer.createTransport({
    service:"gmail",
  auth: {
    user: 'campbelldecor087@gmail.com',
    pass: 'Thanush126'
  }
});

var mailOptions = {
  from: 'campbelldecor087@gmail.com',
  to: 'jeeyukatharsa@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});