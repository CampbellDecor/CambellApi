"use strict";
var Firebase = require('firebase-admin');
const ServiceKey = require('./ServiceKey.json');
Firebase.initializeApp({
    credential: Firebase.credential.cert(ServiceKey)
});
console.log(Firebase.SDK_VERSION);
