const chatDao = require("../FireBase/adminchat.js");
const TimeHandle = require('./Timehandle.js');

exports.adminchatlist = async (req) => {
    const token = req.cookies.access_token;
    try {
        const chats = await chatDao.alladminchat(token);
        return chats.map(element => {
            const {
                last,
                ...others
            } = element;
            const {
                date,
                ...otherdet
            } = last;
            const lastchat = {
                dateTime: TimeHandle.diffTimeString(date),
                ...otherdet
            }
            return {
                lastchat,
                ...others
            }
        });
    } catch (error) {
        throw error;
    }
}

exports.unreadmessages = async () => {
    try {
        return await chatDao.unreadchatcount();
    } catch (error) {
        throw error;
    }
}

exports.Chats = async (req) => {
    const {
        senderid
    } = req.params;
    const token = req.cookies.access_token;
    try {
        const chats = chatDao.chats(senderid, token);
        return chats;

    } catch (error) {
        throw error;
    }
}
