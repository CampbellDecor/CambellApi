const ServiceDao = require("../FireBase/Service.js");

exports.all = async () => {
    try {
        const services = await ServiceDao.all();
        return services?.length <= 0 ? Error("Not Found any Services") : services?.map(data => {
            const {
                name,
                imgURL,
                culture,
                desc,
                Events,
                ...otherdata

            } = data;
            return {
                servicename: name,
                url: imgURL ?? otherdata.category.catURL,
                Culture: culture ?? ['common', "Hindu"],
                description: desc ?? "good Service",
                relatedEvents: Events?.length ?? 0,
                ...otherdata
            }
        });
    } catch (error) {
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
