const ServiceDao=require("../FireBase/ServiceDao/Service.js");
exports.addService = (req,res) =>
{
    
};
exports.getService = (req,res) =>
{
    
}

exports.getServices = (req,res) =>
{
    ServiceDao.getServices()
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
exports.unblockService = (req,res) =>
{
    
}
exports.editService = (req,res) =>
{
    
}