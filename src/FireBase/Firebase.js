const Firebase =require('firebase-admin');
const ServiceKey =require( './ServiceKey.js');

Firebase.initializeApp(
    {
        credential:Firebase.credential.cert(JSON.stringify(ServiceKey))
    }
);
console.log(Firebase.SDK_VERSION)