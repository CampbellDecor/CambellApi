const fire = require( "../Fire.js" );
const FireStore=require('../FireStore/FireStore.js')
const AdminCollection = new FireStore( "admins" );
const { AvatarGenerator } =require('random-avatar-generator');
const getAdmins = async () =>
{
    try
    {
        let Admins = [];
        Admins = await AdminCollection.getAll();
        return Admins;
    } catch ( error )
    {
        throw error;
    }
  
};
exports.getAdmin = async ( id ) =>
{
    try
    {
        let Admin = {};
        Admin = await AdminCollection.DocumentByID( id );
        return Admin;
    } catch ( error )
    {
        throw error;
    }
};
const addAdmin = async ({email,password,mobile,username,firstname,lastname,isOnline,isBlock,profile,isSuper}) =>
{
    try {
        let aid = null;
        const generator = new AvatarGenerator();
        profile ??=generator.generateRandomAvatar( ); 
        username ?? email.substring( 0,email.indexOf( "@" ) );
        isOnline ?? false;
        isBlock ?? false;
        isSuper ?? false;
        const authuser = await fire.auth().createUser( {
            email,
            password,
            phoneNumber: mobile,
            disabled:isBlock
        } )
        let actions = [ `created on ${ new Date() }` ];
        aid = authuser.uid;
        await AdminCollection.addDocument({email,password,mobile,actions}, aid );
      
        let verifylink = await fire.auth().generateEmailVerificationLink( email );
        return { aid, verifylink };
    } catch (error) {
        throw error;
    }
}
exports.deleteAdmin =async ( id ) =>
{
    try {
        const del = await AdminCollection.deleteDoc( id );
        return del;
    } catch (error) {
        throw error;
    }
}
exports.updateAdmin =async ( AdminEle,id ) =>
{
    try {
        const edit = await AdminCollection.updateDoc(AdminEle,id);
        return edit;
    } catch (error) {
        throw error;
    }
}
exports.totaladmin = async () =>
{
    try {
        let count = await AdminCollection.countDoc();
        return count;
    } catch (error) {
        throw error;
    }
}

addAdmin({email:"thanumahee440@gmail.com",mobile:"+94766859048"}).then(console.log).catch(console.error)