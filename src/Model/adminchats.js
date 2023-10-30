const chatDao = require("../FireBase/adminchat.js");
const TimeHandle = require('./Timehandle.js');

exports.adminchatlist = async (req) => {
    const token = req.cookies.access_token;
    try {
        const chats = await chatDao.alladminchat(token);
        return chats.map(element => {
            const {
                lastchat,
                ...others
            } = element;
            const {
                date,
                ...otherdet
            } = lastchat;
            const last = {
                dateTime: TimeHandle.diffTimeString(date),
                ...otherdet
            }
            return {
                last,
                ...others
            }
        });
    } catch (error) {
        throw error;
    }
}
