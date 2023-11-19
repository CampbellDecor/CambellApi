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
            name: packageName,
            services: arr
        })
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
