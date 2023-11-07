const ServiceModel =require( "../Model/Service.js" );
exports.addService = (req,res) =>
{

};
exports.getService = (req,res) =>
{

}

exports.getServices = (req,res) =>
{
    ServiceModel.all()
        .then( services =>
        {
            res.status( 200 ).json( services );
        } ).catch( err =>
        {
            res.status( 404 ).json( err );
    })
}

exports.deleteService = (req,res) =>
{

};
exports.blockService = (req,res) =>
{

};
exports.searchService = (req,res) =>
{

}
exports.editService = (req,res) =>
{

};
exports.ImgUpload = ( req, res ) =>
{

}
