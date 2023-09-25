// @ts-nocheck
const Firebase = require( "./Fire.js" );
const { FieldValue } = require( "firebase-admin/firestore" );
const FireStorage = require( "./Storage.js" );
const userCol = Firebase.firestore().collection( "users" );
exports.add = async ( user ) =>
{
    try
    {
        let uid;
        const { password, ...other } = user;
        const userauth = await Firebase.auth().createUser( {
            phoneNumber: user?.mobile,
            email: user?.email,
            displayName: user?.username??"",
            password,
            disabled:user?.isBlock??false
        } );
        let userdata,verifylink;
        try
        {
            userdata = await userCol.doc( userauth.uid );
            userdata.set( other );
            verifylink = await Firebase.auth().generateEmailVerificationLink( user?.email );
        } catch(error) {
            throw error;
        } finally
        {
            await Firebase.auth().deleteUser( userauth.uid );
            uid = null;
        }
       
        return { uid ,verifylink};
    } catch (error) {
        throw error;
    }
};
exports.all = async () =>
{
    try {
        const users = [];
        const snapshot = await userCol.get();
        snapshot.forEach( async user =>
        {
            users.unshift( { uid: user.id, ...user.data() } );
          
        } )
        return users;
    } catch (error) {
        throw error;
    }
};
exports.block = async (uid) =>
{
    try
    {
       const user= await Firebase.auth().updateUser( uid, {
            disabled: true,
        })
            await userCol.doc( uid ).update( {isBlock:true} );
           return  { block:true,email:user.email}
    } catch (error) {
        throw error;
    }
}
exports.unblock = async (uid) =>
{
    try
    {
       const user= await Firebase.auth().updateUser( uid, {
            disabled: false,
        })
        await userCol.doc( uid ).update( {isBlock:false} );
        return { unblock:true,email:user.email};
    } catch (error) {
        throw error;
    }
}

exports.OneUser = async ( uid ) =>
{
    try {
        const User = await userCol.doc( uid ).get();
        return { uid: User.id, ...User.data() }
        
    } catch (error) {
        throw error;
    }
}
exports.Religions = async () =>
{
    const userblockmap = [];
    try
    {
        const Religions = []
        const snapshot = await userCol.get();
        snapshot.forEach(
            user =>
            {

                const rel = user.data().religion??"unknown";
                Religions.push( rel?.at( 0 )?.toUpperCase() + rel?.substring( 1, rel.length ).toLowerCase() );
                
               
            }
        )
        return Religions.length <= 0 ? "" : new Set( Religions );
    } catch (error) {
        throw error;
    }
    
}


exports.deleteUser = async(uid) =>
{
try {
    const user=await userCol.doc( uid ).delete();
    await Firebase.auth().deleteUser( uid );
    return { user};
} catch (error) {
    throw error;
}
};
exports.block_unblock_fillter = async (block) =>
{
    try
    {
        const users = [];
        const userDoc = await userCol.where( "isBlock", "==", block ).get();
        userDoc.forEach( user =>
        {
            users.push( { uid: user.id, ...user.data() } );
        } )
        return users;
    } catch(err) {
        throw err;
    }
}
exports.ReligionCounts = async () =>
{
    const Religions = [];
    const ReligionsCount=[[],[]]
    try {
        const snapshot = await userCol.get();
        snapshot.forEach(
            user =>
            {

                const rel = user.data().religion ?? "unknown";
                Religions.push( rel?.at( 0 )?.toUpperCase() + rel?.substring( 1, rel.length ).toLowerCase() );
                
               
            } );
        const UNIq = new Set( Religions );
        UNIq.forEach( ele =>
        {
            ReligionsCount[ 0 ].push( ele );
            const count = Religions.filter( value => value === ele ).length;
            ReligionsCount[ 1 ].push( count );
            
        } );
        return ReligionsCount
    } catch (error) {
        throw error;
    }
    
}
exports.Online_Offline =async () =>
{
    try
    {
        const userlist=[[],[]]
        const users = (await Firebase.auth().listUsers()).users;
        users.forEach( u =>
        {
            if(u.metadata.lastSignInTime >=new Date())
                userlist[ 0 ].push( {
                    uid: u.uid,
                    OnlineTime: u.metadata.lastSignInTime 
                } );
            else
            userlist[ 1 ].push( {
                uid: u.uid,
                OfflineTime: u.metadata.lastSignInTime 
            } );
            
        })
        
        return  userlist;
    } catch (error) {
        throw error;
    }
};
