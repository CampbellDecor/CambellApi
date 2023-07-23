var firebase_admin_1 = require("firebase-admin");
var ServiceKey_js_1 = require("./ServiceKey.js");
firebase_admin_1.initializeApp({
    credential: firebase_admin_1.credential.cert(JSON.stringify(ServiceKey_js_1))
});
console.log(firebase_admin_1.SDK_VERSION);
