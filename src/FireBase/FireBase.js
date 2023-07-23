var firebase_admin_1 = require("firebase-admin");
var ServiceKey_js_1 = require("./ServiceKey.json");
firebase_admin_1.initializeApp({
    credential: firebase_admin_1.credential.cert(ServiceKey_js_1)
});
module.exports=firebase_admin_1;
