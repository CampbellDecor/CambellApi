const UserModel = require( "../Model/userchat.js" );

exports.allchat = (req,res) =>
{
    UserModel.allchat()
        .then( chat =>
        {
            res.status( 200 ).json( chat );
        } )
        .catch( err =>
        {
            res.status( 404 ).json( err );
    })
}