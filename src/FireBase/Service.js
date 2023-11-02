const Firebase = require( "./Fire.js" );
const { FieldValue } = require( "firebase-admin/firestore" );
const ServiceCol = Firebase.firestore().collection( "services" );
const SCat = require( "./ServiceCategory.js" );
const add = async (category,service) =>
{
    try {
        const serviceadd = await ServiceCol.doc(category.catid).collection(category.name).add(service);
        return serviceadd.id;
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


const all = async() =>
{
    try {
        const scat = await SCat.categoryName();
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
const findbyid =async (servicecode) =>
{
    try {
        const All = await all();
        return All.find(ele=>ele.servicecode===servicecode);
    } catch (error) {
        throw error;
    }
}
exports.deleteSer = async (servicecode) => {
    try {
        const service = await findbyid(servicecode);
        await ServiceCol.doc(service.category.cid).collection(service.category.cname).doc(servicecode).delete();
        return true;
    } catch (error) {
        throw error;
    }
};
module.exports={all,findbyid}
