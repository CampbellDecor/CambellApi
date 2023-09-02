const adminDao = require( "../FireBase/admin.js" );
const randompwd = require( "generate-password" );
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
        const adminid=await adminDao.add({
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
        })
        return { ...adminid, password };
    } catch (error) {
        throw error;
    }
}