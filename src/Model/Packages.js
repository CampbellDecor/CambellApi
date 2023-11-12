const {
    allPack
} = require("../FireBase/packages.js")

exports.allPack = async () => {
    try {
        const packs = await allPack();
        return packs;
    } catch (error) {
        throw error;
    }
}
