const Firebase = require( "./Fire.js" );
const { FieldValue } = require( "firebase-admin/firestore" );
const ServiceCol = Firebase.firestore().collection( "services" );

exports.allCategory = async () =>
{
    try
    {
        const Categories = [];
        
        const service = await ServiceCol.get();
        service.forEach( cat => Categories.push({cid:cat.id,...cat.data()}));
        return Categories;
    } catch (error) {
        throw error;
    }
};
exports.categories=async()=>{
    try {
        const cat_name = [];
        const service = await ServiceCol.get();
        service.forEach( servi =>
        {
            cat_name.push( { cid:servi.id,cname:servi.data().name } );
        } );
        return cat_name;
    } catch (error) {
        throw error;
    }
}
