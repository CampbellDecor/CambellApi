const Firebase = require("./Fire.js");
const ServiceCol = Firebase.firestore().collection("services");

exports.categoryName = async () => {
    try {
        const cat_name = [];
        const service = await ServiceCol.get();
        service.forEach(servi => {
            cat_name.push({
                cid: servi.id,
                cname: servi.data().name,
                catURL: servi.data().imgURL
            });
        });
        return cat_name;
    } catch (error) {
        throw error;
    }
}
exports.all = async () => {
    try {
        const categories = await ServiceCol.get();
        const cat = [];
        categories.forEach(ele => cat.push({
            cid: ele.id,
            ...ele.data()
        }))
        return cat;
    } catch (error) {
        throw error;
    }
}
exports.categorycount = async () => {
    try {
        const Categorycount = new Map();
        const cat = [];
        const catDoc = await ServiceCol.get();
        catDoc.forEach(cate => cat.push({
            catid: cate.id,
            catname: cate.data().name
        }));
        for (const iterator of cat) {
            const servicesnap = await ServiceCol.doc(iterator.catid).collection(iterator.catname).get();
            Categorycount.set(iterator.catname, servicesnap.size);
        }
        return Categorycount;
    } catch (error) {
        throw error;
    }
}

exports.add = async (data) => {
    try {
        const cat = await ServiceCol.add(data);
        return cat.id;
    } catch (error) {
        throw error;
    }
}
exports.edit = async (catid, data) => {
    try {
        const cat = await ServiceCol.doc(catid).update(data);
        return true;
    } catch (error) {
        throw error;
    }
}
exports.deleteCat = async (catid) => {
    try {
        await ServiceCol.doc(catid).delete();
        return true;
    } catch (error) {
        throw error;
    }
}

exports.search = async (searchtext) => {
    const regx = new RegExp(searchtext, 'ig');
    const CatDoc = await ServiceCol.get();
    const serachResult = [];
    CatDoc.forEach(cate => serachResult.push({
        catid: cate.id,
        ...cate.data()
    }));
    return serachResult.filter(categ => regx.test(categ.name));
}
exports.GroupBy = async () => {
    try {
        const filcategory = await ServiceCol.get();
        let cat = [];
        filcategory.forEach(ele => cat.push({
            catid: ele.id,
            ...ele.data()
        }));
        const filterresult = new Map();
        for (const iterator of cat) {
            const catDoc = await ServiceCol.doc(iterator.catid).collection(iterator.name).get();
            const ser = [];
            catDoc.forEach(services => ser.push({
                serviceid: services.id,
                ...services.data()
            }));
            filterresult.set({
                catname: iterator.name,
                catid: iterator.catid
            }, ser);

        }

        return filterresult;
    } catch (error) {
        throw error;
    }
};
exports.totalCategorycount = async () => {
    try {
        const category = await ServiceCol.get();
        return category.size;
    } catch (error) {
        throw error;
    }
}
