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
