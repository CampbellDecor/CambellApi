const nodemailer = require( "nodemailer" );
const testAccount = nodemailer.createTestAccount();
var transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 567,
    secure:true,
  auth: {
    user: 'campbelldecor087@gmail.com',
    pass: 'Thanush126@'
  }
});

var mailOptions = {
  from: 'campbelldecor087@gmail.com',
  to: 'thanumahee440@gmail.com',
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