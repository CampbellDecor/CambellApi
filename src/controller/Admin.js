const adminmodel = require( "../Model/admin.js" );
const jwt = require( "jsonwebtoken" );
const randompassword = require( "generate-password" );
exports.addAdmin = ( req, res ) =>
{
    adminmodel.add( req ).then(
        result =>
        {
            res.status( 204 ).json( result );
        }
    ).catch( error =>
    {
        res.status( 404 ).json( error );
    })

};
exports.getAdmin = (req,res) =>
{
    
}

exports.getAdmins = (req,res) =>
{
    
}

exports.deleteAdmin = (req,res) =>
{
    
};
exports.blockAdmin = (req,res) =>
{
    
};
exports.unblockAdmin = (req,res) =>
{
    
}
exports.editAdmin = (req,res) =>
{
    
};
exports.loginAdmin = ( req, res ) =>
{
    const { email } = req.body;
    Dao.login( email )
        .then( output =>
        {
            if ( output.login === "correct" )
            {
                const currentUser= output.result;
                res.status(200).json( { auth: true, currentUser} );
            } else if ( output.login === "not-auth" )
            {
                res.status( 501 ).json( "verify first" );
                
            } else
            {
                res.status( 404 ).json( "invalid login" );
        }
    })
};
exports.logoutAdmin = (req,res) =>
{
    res.clearCookie( "access_token" );
    Dao.logout();
}