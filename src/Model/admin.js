const adminDao = require( "../FireBase/admin.js" );
const randompwd = require( "generate-password" );
const Mail = require( "./Mail.js" );
exports.add = async ( request ) =>

{
    const {
        username,
        profile,
        email,
        firstname,
        lastname,
        mobile,
        address,
        isSuper,
        isBlock
    } = request.body;
    const password = randompwd.generate( {
        length: 20,
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols:true
    })
    try
    {
        const adminadd=await adminDao.add({
            username,
            profile,
            email,
            firstname,
            lastname,
            mobile,
            address,
            isSuper,
            isBlock,
            password,
            isOnline:false,
            activity: [ {
                action: "created",
                dateAndTime: new Date()
            }]
        } )
        const addAdmin = `
        <html>
        <head>
        </head>
        <body>
        <h6>Hi,${username}</h6>
        <h1 style="text-align:'center'">Add New Admin</h1>
        <p>You add in Our campbell Decor Admin team Team at ${new Date()}</p>
        <p>Your Password is : ${password} <br/> you can changed anytime</p>
        <p><a href="${adminadd.verifylink}">verify Me</a></p>
        </body>
        </html>
        `
        Mail.sendSingleMail(email,"Cambell Decor Registration",addAdmin)
        return { aid:adminadd.aid};
    } catch (error) {
        throw error;
    }
};

exports.all =  async (res) =>
{
    try {
        const admins = await adminDao.all();
        if ( admins.length <= 0 ) throw Error( "No Admins" );
        else return admins;
    } catch (error) {
        throw error;
    }
};
exports.login =async (request) =>
{
    const { email } = request.body;
    try {
        const result = await adminDao.login( email );
        if ( result.login === "block" )
        {
            await Mail.sendSingleMail( email, "Blocked Account ", `
            <h1>Your Account is Blocked</h1>
            <p>Hi user Your Account is Blocked please Contact with Adminstator</p>
            `);
            return {
                message: result.message,
                loginStatus:false
            };
        } 
        if ( result.login === "not-verify" )
        {
            const loginAdmin = `
            <html>
            <head>
            </head>
            <body>
            <h6>Hi,Admin</h6>
            <h1 style="text-align:'center'">Admin Verfication</h1>
            <p>Your Email didn't verfied First Verified it</p>
            <p><a href="${result.message}">verify Me</a></p>
            </body>
            </html>
            `
            await Mail.sendSingleMail(email, "Verify Account", loginAdmin );
            return {
                message: "User Must be Verified",
                loginStatus:false
            };
        }
        if ( result.login === "ok" )
        {
            return {
                message: result.message,
                loginStatus:true
           }
       }
    } catch (error) {
        throw error;
    }
}