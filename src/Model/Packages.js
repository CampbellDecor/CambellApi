const {
    allPack,
    searchByName
} = require("../FireBase/packages.js")

exports.allPack = async () => {
    try {
        const packs = await allPack();
        return packs;
    } catch (error) {
        throw error;
    }
}

exports.searchByName = async ({
    params
}) => {
    try {
        const pack = await searchByName(params);
        return pack ?? [];
    } catch (error) {
        throw error;
    }
}
