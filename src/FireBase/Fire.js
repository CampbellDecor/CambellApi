var Firebase= require('firebase-admin');

const ServiceKey=require('./ServiceKey.json');

Firebase.initializeApp(
    {
        credential: Firebase.credential.cert( ServiceKey ),
        storageBucket:"campbelldecor-c2d1f.appspot.com"
    }
);

module.exports=Firebase;