var Firebase = require('firebase-admin');
const {
    getAuth
} = require("firebase/auth");
const {
    initializeApp
} = require("firebase/app");
const {
    getMessaging
} = require("firebase/messaging");
const FirebaseConfig = require('../../config/FirebaseClintConfig.js');
const ServiceKey = require('../../config/ServiceKey.json');

const firebaseClient = initializeApp(FirebaseConfig);
Firebase.initializeApp({
    credential: Firebase.credential.cert(ServiceKey),
    storageBucket: "campbelldecor-c2d1f.appspot.com",
    databaseURL: "https://campbelldecor-c2d1f-default-rtdb.firebaseio.com"
});
module.exports = {
    Firebase,
    FireStore: Firebase.firestore(),
    Auth: Firebase.auth(),
    clientAuth: getAuth(firebaseClient),
    FireStorage: Firebase.storage(),
    FirebaseDB: Firebase.database(),
    FireMessaging: Firebase.messaging(),
    // ClientMessaging: getMessaging(firebaseClient)
};
