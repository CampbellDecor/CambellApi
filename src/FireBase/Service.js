const Firebase = require( "./Fire.js" );
const { FieldValue } = require( "firebase-admin/firestore" );
const ServiceCol = Firebase.firestore().collection( "services" );
const SCat = require( "./ServiceCategory.js" );
const add = async service =>
{
    try {
        const serviceadd = await ServiceCol.add( service );
        return serviceadd.id;
    } catch (error) {
        throw error;
    }
};
const deleteSer =async servicecode =>
{
    try {
        const del = await ServiceCol.doc( servicecode ).delete();
    } catch (error) {
        throw error;
    }
};
const oneService = async serviceCode =>
{
    try {
        const service = await ServiceCol.doc( serviceCode ).get();
        return {sid:service.id,...service.data()};
    } catch (error) {
        throw error;
    }
};


exports.all = async() =>
{
    try {
        const scat = await SCat.categories();
        const Services=[];
        for ( const cate of scat )
        {
           
            const servicesNestedCol = await ServiceCol.doc( cate.cid ).collection( cate.cname );
            const serviceSnapshot = await servicesNestedCol.get();
        await serviceSnapshot.forEach(serv=>{
            Services.push({servicecode:serv.id,category:cate,...serv.data()}); 
        })
       }
        return Services;
    } catch (error) {
        
    }
}