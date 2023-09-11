const Firebase = require( "./Fire.js" );
const { FieldValue } = require( "firebase-admin/firestore" );
const ServiceCol = Firebase.firestore().collection( "services" );
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
exports.allCategory = async serviceCode =>
{
    try
    {
        const Categories = [];
        
        const service = await ServiceCol.get();
        service.forEach( servi => Categories.push( Categories =>
        { 
            console.log( servi )
        }));
        return Categories;
    } catch (error) {
        throw error;
    }
};

const all = () =>
{
    try {
        
    } catch (error) {
        
    }
}

