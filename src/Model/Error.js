exports.alreadyExist = (Error) =>
{
    if ( Error.code === "app/invalid-credential" || Error.code==="auth/network-request-failed" ) throw new Error( "Server Down" );
    else if ( Error.code === "auth/email-already-exists" ||  Error.code ==='auth/phone-number-already-exists') throw new Error( "already Exist" );
    else throw Error;
}
exports.NetworkError = (Error) =>
{
    if ( Error.code === "app/invalid-credential" || Error.code==="auth/network-request-failed" ) throw new Error( "Server Down" );
    else throw Error;
}