const Fire = require("./Fire");
const PackageCol = Fire.firestore().collection("packages");

exports.allPack = async () => {
    try {
        const packDoc = await PackageCol.get();
        const packages = [];
        packDoc.forEach(pack => {
            const {
                services,
                ...others
            } = pack.data();
            const arr = Object.entries(services).map(ele => ele[1])
            packages.push({
                packageID: pack.id,
                ...others,
                services: arr
            })

        })
        return packages;
    } catch (error) {
        throw error;
    }
}
