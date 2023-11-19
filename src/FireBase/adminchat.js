const Fire = require("./Fire.js");
const adminchatcol = Fire.firestore().collection('adminchats');
exports.sendMessage = async ({
    message,
    aid,
    access_token
}) => {
    try {
        const {
            uid
        } = await Fire.auth().verifyIdToken(access_token);
        const chatting = {
            message,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            type: aid === uid ? 'sent' : 'recive'
        }
        const chatid = await adminchatcol.doc(aid).collection("chat").add(chatting);
        await adminchatcol.doc(aid).update({
            last: {
                type: aid === uid ? 'sent' : 'recive',
                message,
            }
        })
        return {
            chatid:chatid.id,...chatting
        };
    } catch (error) {
        throw error;
    }
}
exports.showchatllist = async ({

    access_token
}) => {
    try {
        const {
            uid
        } = Fire.auth().verifyIdToken(access_token);
        const chats = await adminchatcol.get();
        const all = [];
        chats.forEach(ch => {
            const {
                last,
                ...others
            } = ch.data();
            const {
                message,
                type
            } = last ?? {};
            if (ch.id !== uid) {
                all.push({
                    ...others,
                    aid: ch.id,
                    message,
                    type
                });
            }
        });

        return all ?? [];
    } catch (error) {
        throw error;
    }

}

exports.adminchats = async (aid) => {
    try {
        const adminchat = await adminchatcol.doc(aid).get();
        const {
            last,
            ...others
        } = adminchat.data();
        const Adch = await adminchatcol.doc(aid).collection("chat").get();
        const c = [];
        Adch.forEach(e => {
            c.unshift({
                aid,
                chatid: e.id,
                ...others,
                ...e.data()
            });
        })
        return c;
    } catch (error) {
        throw error;
    }
}

// exports.searchA = async (searchtext) => {
//     try {

//         const adminDoc = await showchatllist();
//         const search = new RegExp(searchtext, 'ig');
//         const result = [];
//         adminDoc.forEach(ele => {
//             if (ele.username.search(search)) {
//                 result.push(ele)
//             }

//         })
//         return result;
//     } catch (error) {
//         throw error;
//     }
// }
