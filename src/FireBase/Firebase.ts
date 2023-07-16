import Firebase from 'firebase-admin';
import ServiceKey from './ServiceKey.js';

Firebase.initializeApp(
    {
        credential:Firebase.credential.cert(JSON.stringify(ServiceKey))
    }
);
export default Firebase;
