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

exports.OneService = async (serviceid) => {
    try {
        const Service = await ServiceDao.oneService(serviceid);
        return Service;
    } catch (error) {
        throw error;
    }
}

exports.addService = async (Body) => {
    const {
        category,
        ...others
    } = Body;
    try {
        const service = await ServiceDao.add(category, others);
        return service !== undefined;
    } catch (error) {
        throw error;
    }
}
