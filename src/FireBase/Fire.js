var Firebase= require('firebase-admin');

const ServiceKey=require('./ServiceKey.json');

Firebase.initializeApp(
    {
        credential: Firebase.credential.cert( ServiceKey ),
        storageBucket: "campbelldecor-c2d1f.appspot.com",
        databaseURL: "https://campbelldecor-c2d1f-default-rtdb.firebaseio.com"
    }
);

module.exports=Firebase;
