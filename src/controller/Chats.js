const Chatmodel = require( "../Model/userchats.js" );
exports.addChat = ( req, res ) =>
{
    Chatmodel.add( req ).then(
        chatinfo =>
        {
            req.json( chatinfo );
        }
    ).catch( err =>
    {
        res.json( err );
    })
};
exports.getChat = (req,res) =>
{
    
}

exports.getChats = (req,res) =>
{
    
}

exports.deleteChat = (req,res) =>
{
    
};
exports.blockChat = (req,res) =>
{
    
};
exports.unblockChat = (req,res) =>
{
    
}
exports.editChat = (req,res) =>
{
    
}