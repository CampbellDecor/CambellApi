const Firebase = require( "./Fire.js" );
const { FieldValue } = require( "firebase-admin/firestore" );
const FireStorage = require( "./Storage.js" );
const adminDoc = Firebase.firestore().collection( "admins" );
exports.add=async (admin)=>{
    try {
        const adminauth = await Firebase.auth().createUser( {
            phoneNumber: admin?.mobile,
            email: admin?.email,
            displayName: admin?.username
        } );

        const admindata = await adminDoc.doc( adminauth.uid );
        admindata.set( admin );
        const verifylink = await Firebase.auth().generateEmailVerificationLink( admin?.email );
        return { aid: admindata.id ,verifylink};
    } catch (error) {
        throw error;
    }
};

exports.all = async () =>
{
    try {
        const admins = [];
        const admidoc = await adminDoc.doc();
        const snapshot = await adminDoc.get();
        snapshot.forEach( admin =>
        {
                admins.unshift( { aid:admin.id,...admin.data() } );
          
        } )
        return admins;
    } catch (error) {
        throw error;
    }
};

exports.login=async (email)=>{
try {
    const logiuser = await Firebase.auth().getUserByEmail( email );
    if ( logiuser.disabled )
    {
        return { login: "block", message: `${ logiuser.displayName } is Blocked` }
    } else
    {
        if ( !logiuser.emailVerified )
        {
            const verifylink = await Firebase.auth().generateEmailVerificationLink( email );
            return {login:"not-verify",message:verifylink}
        } else
        {
          await adminDoc.doc( logiuser.uid ).update( {
                isOnline: true,
                activity: FieldValue.arrayUnion( { action: "signin", date: new Date() } )
          } );
            const loginUSerCre = await adminDoc.doc( logiuser.uid ).get();
            return {
                login: "ok", message: {
                    aid: loginUSerCre.id,
                    ...loginUSerCre.data()
            } };
        }
        
    }
      
} catch (error) {
    throw error;
}
}
exports.logOut = async (aid) =>
{
    try {
        await  await adminDoc.doc( aid).update( {
            isOnline: false,
            activity: FieldValue.arrayUnion( { action: "signout", date: new Date() } )
        } );
    } catch (error) {
        throw error;
    }
}
exports.uploadAdminProf = async (path) =>
{
    try {
        await FireStorage.uploadAImage( path, "Admins" );
    } catch (error) {
        throw error;
    }
}
