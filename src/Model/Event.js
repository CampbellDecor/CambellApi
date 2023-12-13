const {
    all,
    add,
    deleteEvent
} = require("../FireBase/Events.js");


exports.allEvents = async () => {
    try {
        return await all();
    } catch (error) {
        throw error;
    }
}

exports.addEvents = async ({
    body
}) => {
    try {
        return await add(body);
    } catch (error) {
        throw error;
    }
}
exports.deleteEvent = async ({
    params
}) => {
    try {
        return await deleteEvent(params);
    } catch (error) {
        throw error;
    }
}
