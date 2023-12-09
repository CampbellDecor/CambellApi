const {
    chatList,
    sendMessage,
    allchats
} = require("../FireBase/userChat.js");
const admin = require("../FireBase/adminchat.js");
const Fire = require("../FireBase/Fire.js");
const adminChat = Fire.firestore().collection("admins");

exports.chatListuser = async ({
    cookies
}) => {
    try {
        const uid = cookies.access_token;
        const admin = await adminChat.doc("CuXlAV6HTGYn3hVyYDaSSIj0nqx1").get();
        const {
            profile,
            username
        } = admin.data();
        const chatlist = await chatList();
        return [{
            profile,
            username,
            id: uid
        }, ...chatlist];
    } catch (error) {
        throw error;
    }
}
exports.sendMessage = async ({
    cookies,
    body
}) => {
    try {
        const access_token = cookies.access_token;
        const uid= access_token;
        const {
            userid,
            username,
            message
        } = body;
        let result = false;
        if (userid === uid) {
            result = await admin.sendMessage({

                aid: uid,
                access_token
            });
        } else {
            result = await sendMessage({
                access_token,
                userid,
                username,
                message
            });
        }
        return result;
    } catch (error) {
        throw error;
    }

}
exports.all = async ({
    params,
    cookies
}) => {
    const {
        uid
    } = params;
    const userid =cookies.access_token
    try {
        if (userid.uid === uid) {
            const chats = await admin.adminchats(uid);
            return chats;
        } else {
            const chats = await allchats(uid);
            return chats;
        }

    } catch (error) {
        throw error;
    }
}
