const ServiceDao = require("../FireBase/Service.js");

exports.all = async () => {
    try {
        const services = await ServiceDao.all();
        return services;
    } catch (error) {
        throw error;
    }
}

exports.addCategory = async ({
    body
}) => {
    try {
        const Service = await ServiceDao.addCategory(body);
        return Service;
    } catch (error) {
        throw error;
    }
}

exports.addService = async ({
    params,
    body
}) => {
    try {
        const AddService = await ServiceDao.addService(params.servicecode, body);
        return AddService;
    } catch (error) {
        throw error;
    }
}
