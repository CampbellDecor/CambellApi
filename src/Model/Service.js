const ServiceDao = require("../FireBase/Service.js");

exports.all = async () => {
    try {
        const services = await ServiceDao.all();
        return services;
}
catch (error) {
    throw error;
}
}

exports.addCategory = async ({body}) =>
{
    try {
        const Service = await ServiceDao.addCategory(body);
        return Service;
    } catch (error) {
        throw error;
    }
}
