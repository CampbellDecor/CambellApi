const {
    all
} = require("../FireBase/Events.js");


exports.allEvents = async () => {
    try {
        return await all();
    } catch (error) {
        throw error;
    }
}
