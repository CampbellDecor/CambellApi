const usermodel = require( "../Model/user.js" );
exports.adduser = ( req, res ) =>
{
     usermodel.add( req ).then(
        result =>
        {
            res.status( 200 ).json( result );
        }
    ).catch( (error) =>
    {
        res.status( 404 ).json( error );
    });


};
exports.getUser = ( req, res ) =>
{
    usermodel.OneUser(req).then(user=>{
        res.status( 200 ).json( user );
    }).catch(err=>{
        res.status( 404 ).json( err );
    })
}

exports.getUsers = (req,res) =>
{
    usermodel.all()
        .then( users =>
        {
            res.status( 200 ).json( users );
    }).catch(err=>{
        res.status( 404 ).json( err );
    })
}

exports.deleteUser = (req,res) =>
{

};
exports.blockUser = (req,res) =>
{
    usermodel.block( req ).then( result =>
    {
        res.status(200).json(result)
    } ).catch( err =>
    {
        res.status( 400 ).json( err );
    })
};
exports.unblockUser = (req,res) =>
{
    usermodel.unblock( req )
        .then( result =>
        {
            res.status( 200 ).json( result );
        } ).catch( err =>
        {
            res.status( 404 ).json( err );
    })
}
exports.filter_block_unblock = (req,res) =>
{
    usermodel.block_unblock_user( req )
        .then( usermodel =>
        {
            res.status( 200 ).json( usermodel );
        } )
        .catch( err =>
        {
            res.status( 404 ).json( err );
    })
}
exports.religion_filter = (req,res) =>
{
    const religion = req.params.relg;
    usermodel.religions_filter( religion )
        .then(
            resu =>
            {
                res.status( 200 ).json( resu );
        }
    )
        .catch( err =>
        {
            res.status( 404 ).json( err );
    })
}
exports.editUser = ( req, res ) =>
{

}
exports.UserCount = (req,res) =>
{

}
exports.religionCount = (req, res) =>
{
    usermodel.relCount().then(
        count =>
        {
            res.status(200).json(count);
        }
    )
        .catch(
            err =>
            {
                res.status(404).json(err);
        }
    )
}
