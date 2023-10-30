const Firebase = require("./Fire.js");
const Auth = Firebase.auth();
const {
    FieldValue,
    FieldPath,
    Timestamp
} = require("firebase-admin/firestore");
const adminchatCol = Firebase.firestore().collection("adminchat");
const adminCol = Firebase.firestore().collection("admins");

exports.alladminchat = async (token) => {
    try {
        const {
            uid
        } = await Auth.verifyIdToken(token);
        const adminchatsCol = await adminchatCol.get();
        const adminchats = [];
        adminchatsCol.forEach(ele => {
            adminchats.push(ele.id);
        })
        const chattings = [];
        for (const iterator of adminchats) {
            const admin = await adminCol.doc(iterator).get();
            const {
                email,
                mobile,
                activity,
                address,
                ...other
            } = admin.data();
            const AdminChatDoc = await adminchatCol.doc(iterator).collection('messages').orderBy('date', 'desc').limit(1).get();
            const AdminChatDoccount = (await adminchatCol.doc(iterator).collection('messages').where('status', '==', 'unread').get()).size;
            let chat = {}
            AdminChatDoc.forEach(ele => {
                const {
                    date,
                    ...otherdetails
                } = ele.data();
                const t = date.toDate();
                chat = {
                    cid: ele.id,
                    ...otherdetails,
                    date: t
                }
            })
            chattings.push({
                chatID: iterator,
                unread: AdminChatDoccount,
                lastchat: chat,
                ...other
            })
        }

        return chattings;
    } catch (error) {
        throw error;

    }
}
