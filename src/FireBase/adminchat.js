const Firebase = require( "./Fire.js" );
const {Filter}=require("firebase-admin/firestore");
const chatDoc = Firebase.firestore().collection( "userchats" );

exports.userchat =async (uid) =>
{
    try {
        const chats = [];
        const chatsDoc = await chatDoc.where( Filter.or(
            Filter.where( 'sender', '==', uid ),
            Filter.where( 'reciver', '==', uid )
        ) ).orderBy( "dateAndTime" );
        const snapshot = chatDoc.get();
        ( await snapshot ).forEach( chat =>
        {
            chats.push( { cid: chat.id, dateAndTime: chat.createTime, ...chat.data() } );
        })
        return chats;
    } catch (error) {
        throw error;
    }
};
const addchat =async (message,rid,sid) =>
{
    try {
        const chat = await chatDoc.add( { message, dateAndTime: new Date(), sender: sid, reciver: rid ,status:"unread"} );
        return { scuss: true, cid: chat.id };
    } catch (error) {
        throw error;
    }
};
