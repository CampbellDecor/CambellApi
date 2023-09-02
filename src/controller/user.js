const userDao = require( "../FireBase/userDao/userDao.js" );
exports.addUser = ( req, res ) =>
{
    userDao.getusers()
        .then( user =>
        {
            res.status(200).json( user );
        }
    ).catch( err =>
    {
        res.status( 404 ).json( err );
        })
};
exports.getUser = (req,res) =>
{
    
}

exports.getUsers = (req,res) =>
{
    
}

exports.deleteUser = (req,res) =>
{
    
};
exports.blockUser = (req,res) =>
{
    
};
exports.unblockUser = (req,res) =>
{
    
}
exports.editUser = (req,res) =>
{
    
}
exports.UserCount = (req,res) =>
{
    
}