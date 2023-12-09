const Firebase = require("./Fire.js");
const {
    FieldValue
} = require("firebase-admin/firestore");
const ServiceCol = Firebase.firestore().collection("services");

exports.all = async () =>
{
    try {
        const ServiceDoc = await ServiceCol.get();
        const Services = [];
        ServiceDoc.forEach(ele =>
        {
            Services.push({
                servicecode: ele.id,
                serviceImage: ele.data().imgURL,
                serviceName:ele.data().name
            })
        })
        for (const iterator of Services) {
            const subservice = [];
            const subServiceDoc = await ServiceCol.doc(iterator.servicecode).collection(iterator.serviceName).get();
            subServiceDoc.forEach(ele =>
            {
                subservice.push({
                    serid: ele.id,
                    sername: ele.data().name,
                    serprice:ele.data().price
                })
                iterator.subservice = subservice;
            })
        }
        return Services;
    } catch (error) {
        throw error;
    }
}
