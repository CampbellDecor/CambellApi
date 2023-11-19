const Firebase = require("./Fire.js");
const {
    FieldValue
} = require("firebase-admin/firestore");
const ServiceCol = Firebase.firestore().collection("services");
const add = async (category, service) => {
    try {
        const serviceadd = await ServiceCol.doc(category.catid).collection(category.catname).add(service);
        return serviceadd.id;
    } catch (error) {
        throw error;
    }
};

const oneService = async serviceCode => {
    try {
        const service = await findbyid(serviceCode);
        const {
            name,
            imgURL,
            culture,
            desc,
            Events,
            ...otherdata

        } = service;
        return {
            servicename: name,
            url: imgURL ?? otherdata.category.catURL,
            Culture: culture ?? ['common', "Hindu"],
            description: desc ?? "good Service",
            relatedEvents: Events?.length ?? 0,
            ...otherdata
        }
    } catch (error) {
        throw error;
    }
};


const all = async () => {
    try {
        const scat = await ServiceCol.get();
        const catset = []
        scat.forEach(ele => catset.push(`/services/${ele.id}/${ele.data().name}`))
        const Services = [];
        for (const cate of catset) {

            const servicesNestedCol = await Firebase.doc(cate);
            const serviceSnapshot = await servicesNestedCol.get();
            await serviceSnapshot.forEach(serv => {
                Services.push({
                    servicecode: serv.id,
                    category: cate,
                    ...serv.data()
                });
            })
        }
        return Services;
    } catch (error) {

    }
}
const findbyid = async (servicecode) => {
    try {
        const All = await all();
        return All.find(ele => ele.servicecode === servicecode);
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
module.exports = {
    all,
    findbyid,
    oneService,
    add
}
