const User = require( "./user.js" );
class admin extends User
{
    constructor (email, password, uid, mobile, profile, address, isSuper=false,isOnline=false)
    {
        super( email, password, uid, mobile, profile, address, isOnline = false );
        this.isSuper = isSuper;
 }
}