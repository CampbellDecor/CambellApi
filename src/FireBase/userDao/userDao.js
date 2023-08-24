const fire = require( "../Fire.js" );
const FireStore=require('../FireStore/FireStore.js')
const userCollection =new  FireStore( "users" );
exports.getusers = async () =>
{
    try
    {
        let users = [];
        users = await userCollection.getAll();
        return users;
    } catch ( error )
    {
        throw error;
    }
  
};
exports.getuser = async ( id ) =>
{
    try
    {
        let user = {};
        user = await userCollection.DocumentByID( id );
        return user;
    } catch ( error )
    {
        throw error;
    }
};
exports.adduser = async ({email,password,mobile,username,firstname,lastname,isOnline,isBlock,profile}) =>
{
    try {
        let uid = null;
        let authuser = await fire.auth().createUser( {
            email,
            password,
            phoneNumber: mobile,
            disabled:isBlock
        } )
        username ?? email.subString( email.indexOf( "@" ) );
        isOnline ?? false;
        isBlock ?? false;
        let user = await userCollection.addDocument( {email,password,mobile,username,firstname,lastname,isOnline,isBlock,profile},authuser.uid );
        uid = user;
        return uid;
    } catch (error) {
        throw error;
    }
}
exports.deleteUser =async ( id ) =>
{
    try {
        const del = await userCollection.deleteDoc( id );
        return del;
    } catch (error) {
        throw error;
    }
}
exports.updateUser =async ( userEle,id ) =>
{
    try {
        const edit = await userCollection.updateDoc(userEle,id);
        return edit;
    } catch (error) {
        throw error;
    }
}
exports.totaluser = async () =>
{
    try {
        let count = await userCollection.countDoc();
        return count;
    } catch (error) {
        throw error;
    }
}

exports.block = (id) =>
{
    
}