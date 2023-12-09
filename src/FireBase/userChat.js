const Fire = require('../FireBase/Fire.js');
const UserChatsCol = Fire.firestore().collection("messages");
const User = Fire.firestore().collection("users");
const {} = require('random-avatar-generator');
exports.sendMessage = async ({
    userid,
    message,
    access_token,
    username
}) => {
    try {
        const uid = access_token;
        const now = new Date();
        const Mes = {
            receiverId: userid,
            senderId: uid,
            text: message,
            timestamp: now,
            username: username
        }
        const addMes = await UserChatsCol.doc(userid).collection("message").add(Mes)
        const Dtime = {
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString()
        }
        return {
            chatid: addMes.id,
            ...Dtime,
            type: 'recive',
            message,
            uid: userid
        };
    } catch (error) {
        throw error;
    }
}
exports.chatList = async () => {
    try {
        const userchats = [];
        const chats = await UserChatsCol.get();
        chats.forEach(ele => {
            userchats.push(ele.id);
        })
        const chatuserlist = [];
        for (const iterator of userchats) {
            const u = await User.doc(iterator).get();
            if (u.data()) {
                const {
                    imgURL,
                    name
                } = u.data();
                chatuserlist.push({
                    profile: imgURL,
                    id: u.id,
                    username: name
                })
            }

        }
        return chatuserlist;

    } catch (error) {
        throw error;
    }
}

exports.allchats = async (uid) => {
    try {
        const userDoc = await User.doc(uid).get();
        const {
            imgURL
        } = userDoc?.data() ?? {};
        const chats = await UserChatsCol.doc(uid).collection("message").orderBy('timestamp').get();
        const chat = [];
        chats.forEach(c => {
            const {
                receiverId,
                text,
                timestamp
            } = c.data();

            if (text) {
                const Dtime = {
                    date: new Date(timestamp.toDate()).toLocaleDateString(),
                    time: new Date(timestamp.toDate()).toLocaleTimeString()
                }
                const type = receiverId === uid ? 'recive' : 'sent';
                chat.push({
                    chatid: c.id,
                    ...Dtime,
                    type,
                    message: text,
                    profile: imgURL,
                    uid
                });

            }
        })
        return chat;
    } catch (error) {
        throw error;
    }
}
