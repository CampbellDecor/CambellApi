const UserchatDao = require("../FireBase/userChat");
const adminChatDao = require('../FireBase/adminchat.js')
const {
    diffTimeString
} = require('./Timehandle.js');
const Fire=require('../FireBase/Fire.js')
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

exports.oneUSerChat = async (req) =>
{
    const senderid = req.params.senderId;
    const { uid } =Fire.auth().verifyIdToken(req.cookies.access_token) ;
    try
    {
        const userchats = [];
        const chats = await UserchatDao.oneUSerChat(senderid);
        chats.forEach(ele =>
        {
            const { senderId, ...otherdetails } = ele;
            userchats.push({...otherdetails, type: senderId === uid ? 'sent' : 'recive' });
        })
        return userchats;
    } catch (error) {
        throw error;
    }
}
