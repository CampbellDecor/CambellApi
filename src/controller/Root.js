const usermodel = require("../Model/user.js");

exports.countpanel = async () => {
    try {
        const counts = {
            user: 0,
            booking: 0,
            payment: 0,
            packages: 0
        }
        return counts;
    } catch (error) {
        throw error;
    }
}
