const Firebase = require("./Fire.js");
//const random = require("random");
const Auth = Firebase.auth();
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

exports.unreadchatcount = async () => {
    try {
        const AdminChatsnap = await adminCol.where("status", "==", "unread");
        const snap = await AdminChatsnap.get();
        console.log(snap.size);
        return snap.size;

    } catch (error) {
        throw error;
    }
}
exports.chats = async (senderid, token = "") => {
    try {
        const {
            uid
        } = await Auth.verifyIdToken(token);
        const adminchatsCol = await adminchatCol.get();
        const adminchats = [];
        adminchatsCol.forEach(ele => {
            adminchats.push({
                chatid: ele.id,
                ...ele.data()
            });

        })
        const snapshot = await adminCol.doc(senderid).get();
        const {
            firstname,
            lastname,
            mobile,
            email,
            address,
            ...othersadmin
        } = snapshot.data();
        const thisadminchats = adminchats.filter(
            element => (element.sender === uid && element.reciver === senderid) || (element.reciver === uid && element.sender === senderid)).map(element => {
            const {
                sender,
                reciver,
                date,
                ...other
            } = element;
            return {
                type: sender === uid ? 'sent' : 'recive',
                date: date.toDate(),
                ...other,
                ...othersadmin
            }
        }).sort((ele1, ele2) => ele1.date - ele2.date)

        return thisadminchats;
    } catch (error) {
        throw error;

    }
}
exports.sendmessage = async (data) => {
    try {
        const adminchat = await adminchatCol.add(data);
        return adminchat.id;
    } catch (error) {
        throw error;
    }
}
exports.deletemessage = async (achatid,aid) => {
    try {
        const adminchat = await adminchatCol.doc(achatid);
        const snap=await adminchat.get();
        const {
            status,
            sender
        } = snap.data();
        if (sender === aid && status==='unread')
        {
           await adminchat.delete();
            return true;
        } else
        {
            throw new Error("Can't Delete");
        }

    } catch (error) {
        throw error;
    }
}
exports.editmessage = async (achatid,data,aid) => {
    try {
        const adminchat = await adminchatCol.doc(achatid);
        const snap = await adminchat.get();
        const {
            status,
            sender
        } = snap.data();
        if (sender === aid && status === 'unread') {
            await adminchat.update({ ...data });
            return true;
        } else {
            throw new Error("Can't Edit");
        }
    } catch (error) {
        throw error;
    }
}
