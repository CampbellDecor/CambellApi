const userDao = require("../FireBase/user.js");
exports.ReligionNames = async () => {
    try {
        const Religions = await userDao.Religions();
        const religionNames = [];
        Religions.forEach(ele => {
            religionNames.push({
                name: ele,
                value: ele.toLowerCase()
            })
        })
        return religionNames;
    } catch (error) {
        throw error;
    }
}
