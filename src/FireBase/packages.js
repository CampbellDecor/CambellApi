const Fire = require("./Fire");
const PackageCol = Fire.firestore().collection("packages");
//assign Package is a spcific style
const assignPackage = (pack = [], element) => {
    const {
        services,
        packageName,
        ...others
    } = element?.data() ?? {};
    if (element?.data()) {
        const arr = Object.entries(services).map(ele => ele[1])
        pack.push({
            packageID: element.id,
            ...others,
            packageName,
            services: arr
        })
    }


}
exports.addPackage = async ({
    services,
    packname,
    packImg,
    price
}) => {
    try {
        const Ser = {};
        services.forEach((ele, index) => {
            Ser['0' + (index + 1)] = ele;
        })
        const Package = {
            imgURL: packImg,
            packageName: packname,
            price: parseInt(price),
            services: Ser,
            rating_count: 1,
            avg_rating: 0,
        }
        const packAdd = await PackageCol.add(Package);
        return {
            packageID: packAdd.id,
            imgURL: packImg,
            packageName: packname,
            services: services,
            rating_count: 1,
            avg_rating: 0,
            price
        }
    } catch (error) {
        throw error;
    }
}
exports.allPack = async () => {
    try {
        const packDoc = await PackageCol.get();
        const packages = [];
        packDoc.forEach(pack => {
            assignPackage(packages, pack)
        })
        return packages;
    } catch (error) {
        throw error;
    }
}

exports.searchByName = async ({
    packname
}) => {
    try {
        const PackDoc = await PackageCol.get();
        const searchRegx = new RegExp(packname, 'gi');
        const pakages = [];
        PackDoc.forEach(ele => {
            if (searchRegx.test(ele.data().packageName))
                assignPackage(pakages, ele)
        })
        return pakages;
    } catch (error) {
        throw error
    }
}
