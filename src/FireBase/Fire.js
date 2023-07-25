var Firebase= require('firebase-admin');
const ServiceKey=require('./ServiceKey.json');

Firebase.initializeApp(
    {
        credential:Firebase.credential.cert(ServiceKey),
        databaseURL:"https://cambelldecor-default-rtdb.asia-southeast1.firebasedatabase.app",
        storageBucket:"cambelldecor.appspot.com",
    }
);
exports.fireex=(functionName)=>{
    try {
        functionName;
    } catch (error) {
        throw error;
    }
}
module.exports=Firebase;