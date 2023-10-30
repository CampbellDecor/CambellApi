const Firebase = require("./Fire.js");
const Auth = Firebase.auth();
const adminchatCol = Firebase.firestore().collection("adminchat");
const adminCol = Firebase.firestore().collection("admins");

exports.alladminchat = async (token) => {
    try {
        const { uid } = await Auth.verifyIdToken(token);
        const adminchatsCol = await adminchatCol.get();
        const adminchats = [];
        adminchatsCol.forEach(ele => {
            adminchats.push({
                achatid: ele.id,
                ...ele.data()
            });

        })
        const thisadminchats = adminchats.filter(element => element.sender === uid || element.reciver === uid).map(element => {
            const {
                sender,
                reciver,
                date,
                ...other
            } = element;
            return sender === uid ? {
                type: 'sent',
                date: date.toDate(),
                reciver,
                date: date.toDate(),
                ...other
            } : {
                type: 'recive',
                date: date.toDate(),
                sender,
                ...other
            }
        })
        const chatids = [];
        thisadminchats.forEach(chats => {
            chatids.push(chats.type === 'sent' ? chats.reciver : chats.sender);
        })
        const uniqids = new Set(chatids);
        const chattings = [];
        for (const id of uniqids) {
            const snapshot = await adminCol.doc(id).get();
            const {
                firstname,
                lastname,
                ...others
            } = snapshot.data();
            const thisadminchats3 = thisadminchats.filter(element => element.sender === id || element.reciver === id).sort((ele1, ele2) => {
                return ele1.date - ele2.date;
            });
            const unread = thisadminchats3.filter(ele => ele.status === 'unread').length;
            chattings.push({
                last: thisadminchats3[0],
                ...others,
                unread
            })
        }

        return chattings;
    } catch (error) {
        throw error;

    }
}
