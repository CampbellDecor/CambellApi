const userDao = require( "../FireBase/user.js" );
const randompwd = require( "generate-password" );
const Mail = require( "./Mail.js" );


exports.add = async ( request ) =>
{
    const {
        username,
        profile,
        email,
        mobile,
        address,
        religion
    } = request.body;
    religion ?? "unknown";
    const password = randompwd.generate( {
        length: 20,
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols:true
    })
    try
    {
        const useradd=await userDao.add({
            username,
            profile,
            email,
            religion,
            mobile,
            address,
            isBlock:false,
            password,
            isOnline:false,
            activity: [ {
                action: "created",
                dateAndTime: new Date()
            }]
        } )
        const adduser = `
        <html>
        <head>
        </head>
        <body>
        <h6>Hi,${username}</h6>
        <h1 style="text-align:'center'">Add New user</h1>
        <p>welcome ${username}</p>
        <p>Your Password is : ${password} <br/> you can changed anytime</p>
        <p><a href="${useradd.verifylink}">verify you</a></p>
        </body>
        </html>
        `
        try {
            await Mail.sendSingleMail( email, "Cambell Decor Registration", adduser );
        } catch (error) {
            
            throw error;
        } finally
        {
            userDao.deleteUser( useradd.uid );
        }
        
        return { uid:useradd.uid};
    } catch (error) {
        throw error;
    }
};

exports.block = async ( request ) =>
{
    try {
        const { uid, reason } = request.body;
        reason ?? "UnNessary Activity";
        const blocked = await userDao.block( uid );
        await Mail.sendSingleMail( blocked.email, "Account Freezed", `<html>
        <h1>Account Blocked</h1>
        Hi, ${blocked.email?.substring( 0, blocked.email.indexOf( "@" ) )}<br/>
        Your Account have freezed for Your ${reason} .if You continue your Work Please Contact with Our team With In <b>30</b> Days
        </html>` );
        return blocked.block;
    } catch (error) {
        throw error;
    }
  

}
exports.unblock = async ( request ) =>
{
    try {
        const { uid } = request.body;
        const blocked = await userDao.unblock( uid );
        await Mail.sendSingleMail( blocked.email, "Account unFreezed", `<html>
        <h1>Account UnBlock</h1>
        Hi, ${blocked.email?.substring( 0, blocked.email.indexOf( "@" ) )}<br/>
        Your Account have resume for Your request .if You can continue your Work .
        </html>` );
        return blocked.unblock;
    } catch (error) {
        throw error;
    }
  

}

exports.all = async () =>
{
    try {
        const UserDatas = [];
        const userCol = await userDao.all();
        userCol.forEach( user =>
        {
            const { imgURL, name, phoneNo,...Other } = user;
            UserDatas.push( { profile: imgURL, username: name, mobile: phoneNo, ...Other } );
        } )
        return UserDatas;
    } catch (error) {
        
    }
}
exports.OneUser = async  (req) =>
{
    try {
        const uid = req.params.uid;
        const user=await userDao.OneUser( uid );
        return user;
    } catch (error) {
        throw error;
    }
};
