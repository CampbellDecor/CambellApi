const Firebase = require("./Fire.js");
const {
    FieldValue
} = require("firebase-admin/firestore");
const userchatCol = Firebase.firestore().collection("messages");
const userCol = Firebase.firestore().collection("users");

exports.sendmessage = async (aid, reciverid, data) => {
    try {
        const userchat = await userchatCol.doc(reciverid).collection('message').add({
            senderId: aid,
            receiverId: reciverid,
            timestamp: new Date(),
            ...data
        });
        return userchat.id;
    } catch (error) {
        throw error;
    }
}
exports.deletemessage = async (uchatid, receiverId) => {
    try {
        const userchat = await userchatCol.doc(receiverId).collection('message').doc(uchatid);

        await userchat.delete();
        return true;

    } catch (error) {
        throw error;
    }
}
exports.editmessage = async (uchatid, receiverId, data) => {
    try {
        const userchat = await userchatCol.doc(receiverId).collection('message').doc(uchatid);

        await userchat.update(data);
        return true;

    } catch (error) {
        throw error;
    }
}

exports.listofChat = async () => {
    try {
        const userchats = await userchatCol.get();
        const chats = [];
        userchats.forEach(chat => chats.push(chat.id));
        const Chattings = []
        for (const iterator of chats) {
            const user = await userCol.doc(iterator).get();
            const {
                name,
                imgURL,
                isBlock
            } = user.data();
            const userchat = {
                username: name,
                profile: imgURL,
                isBlock,
                last: {},
                unread: 0
            };
            const userChatMEssage = await userchatCol.doc(iterator).collection('message').orderBy('timestamp', 'desc');
            const userchatsnap = await userChatMEssage.limit(1).get();
            const userchatunread = await userChatMEssage.get();
            userchatunread.forEach(ele => {
                if (ele.data().receiverId === 0) {
                    userchat.unread++;
                }

            });
            userchatsnap.forEach(ele => {
                const {
                    text,
                    timestamp,
                    receiverId
                } = ele.data();
                userchat.last = {
                    chatid: ele.id,
                    message: text,
                    dateTime: timestamp.toDate()
                };
            });
            Chattings.push(userchat)
        }

        return Chattings;

    } catch (error) {
        throw error
    }
}

exports.oneUSerChat = async (user) => {
    try {
        const usersnap = await userCol.doc(user).get();
        const {
            imgURL,
            name,
            isBlock
    }=usersnap.data();
        const userchat = await userchatCol.doc(user).collection('message').orderBy('timestamp', 'desc').get();
        const USerChats = [];
        userchat.forEach(ele =>
        {
            const {text,timestamp,receiverId} = ele.data();
            USerChats.push({ profile:imgURL,username:name,isBlock, chatid: ele.id, dateTime: timestamp.toDate(), status: receiverId === 0,message:text });
            }
        )
        return USerChats;
    } catch (error) {
        throw error
    }
}
