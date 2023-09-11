const Firebase = require( "./Fire.js" );
const { FieldValue } = require( "firebase-admin/firestore" );
const userchatCol = Firebase.firestore().collection( "messages" );

const all=async ()=>{
    try{
        const chats=[];
        const chatsDoc=await userchatCol.get();
        chatsDoc.forEach( element =>
        {
            chats.push( element );
        } );
        return chats;
    }catch(error){
        throw error;
    }
};
all().then( console.log );