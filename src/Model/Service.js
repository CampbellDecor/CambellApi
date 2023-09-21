const ServiceDao = require( "../FireBase/Service.js" );

exports.all = async () =>
{
    try {
        const services = await ServiceDao.all();
        return services?.length <= 0 ? Error( "Not Found any Services" ) : services?.map( data =>
        {
            const { name, ...otherdata } = data;
            return {
                servicename: name,
                ...otherdata
            }
        });
    } catch (error) {
        throw error;
    }
}