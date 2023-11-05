const UserchatDao = require("../FireBase/userChat");
const {
    diffTimeString
} = require('./Timehandle.js');
exports.allchat = async (req) => {
    try {
        const allchat = await UserchatDao.listofChat();
        const chatings = [];
        allchat.forEach(ele => {
            const {
                last,
                ...otherdetails
            } = ele;
            const {
                dateTime,
                ...otherchatdetails
            } = last;
            chatings.push({
                ...otherdetails,
                lastchat: {
                    ...otherchatdetails,
                    dateTime: diffTimeString(dateTime)
                }
            })
        })
        return chatings;
    } catch (error) {
        throw error;
    }
};
