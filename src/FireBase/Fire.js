var Firebase= require('firebase-admin');

const ServiceKey=require('./ServiceKey.json');

Firebase.initializeApp(
    {
        credential:Firebase.credential.cert(ServiceKey),
    }
);
module.exports=Firebase;