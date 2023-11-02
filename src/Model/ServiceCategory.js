const Categorydao = require("../FireBase/ServiceCategory");

exports.all = async () => {
    try {
        const categories = await Categorydao.all();
        const ServiceCate = [];
        categories.forEach(element => {
            ServiceCate.push(element);
        });
        if (categories.length <= 0) throw Error("Categoies Not Found");

        else return ServiceCate;
    } catch (error) {
        throw error;
    }
}
