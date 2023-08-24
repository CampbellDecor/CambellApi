const fire = require( "../Fire.js" );
const FireStore=require('../FireStore/FireStore.js')
const ServiceCollection =new  FireStore( "services" );
exports.getServices = async () =>
{
    try
    {
        let Services = [];
        Services = await ServiceCollection.getAll();
        return Services;
    } catch ( error )
    {
        throw error;
    }
  
};
exports.getService = async ( id ) =>
{
    try
    {
        let Service = {};
        Service = await ServiceCollection.DocumentByID( id );
        return Service;
    } catch ( error )
    {
        throw error;
    }
};
exports.addService = async (ServiceElemenent) =>
{
    try {
        let uid = null;
        let Service = await ServiceCollection.addDocument( ServiceElemenent );
        uid = Service;
        return uid;
    } catch (error) {
        throw error;
    }
}
exports.deleteService =async ( id ) =>
{
    try {
        const del = await ServiceCollection.deleteDoc( id );
        return del;
    } catch (error) {
        throw error;
    }
}
exports.updateService =async ( ServiceEle,id ) =>
{
    try {
        const edit = await ServiceCollection.updateDoc(ServiceEle,id);
        return edit;
    } catch (error) {
        throw error;
    }
}
exports.totalService = async () =>
{
    try {
        let count = await ServiceCollection.countDoc();
        return count;
    } catch (error) {
        throw error;
    }
}

