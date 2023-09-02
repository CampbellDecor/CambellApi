const Firebase = require( "./Fire.js" );
const adminDoc = Firebase.firestore().collection( "admins" );
exports.add=async (admin)=>{
    try {
        const adminauth = await Firebase.auth().createUser( {
            email: admin?.email,
            phoneNumber: admin?.mobile,
            displayName: admin?.username
        } );

        const admindata = await adminDoc.doc( adminauth.uid );
        admindata.set( admin );
        const verifylink = Firebase.auth().generateEmailVerificationLink( admin?.email );
        return { aid: admindata.id ,verifylink};
    } catch (error) {
        throw error;
    }
};
