const Firebase = require( "./Fire.js" );
const {Filter,FieldPath}=require("firebase-admin/firestore");
const chatCollection = Firebase.firestore().collection( "userchats" );

const all = async () =>
{
    try {
        const chats = await chatCollection.orderBy();
    } catch (error) {
        throw error;
    }
}