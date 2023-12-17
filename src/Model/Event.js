const {
    all,
    add,
    deleteEvent,
    edit
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
exports.editEvent = async ({
    body
}) => {
    try {
        const {
            eventid,
            ...others
        } = body;
        await edit(eventid, others);
        const event = await all();
       return event.find(ele => ele.eventid === eventid);
    } catch (error) {
        throw error;
    }
}
