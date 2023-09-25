const Firebase = require( "./Fire.js" );
const { FieldValue } = require( "firebase-admin/firestore" );
const userchatCol = Firebase.firestore().collection( "messages" );
const userCol = Firebase.firestore().collection( "users" );

exports.all=async ()=>{
    try{
        const chats = [];
        const userallchats = [];
        const chatsDoc=await userchatCol.get();
        chatsDoc.forEach( element =>
        {
            chats.push(element.id  );
        } );
        for ( const iterator of chats )
        {
            const UserDetails = await userCol.doc( iterator ).get();
            const { name, imgURL, isOnline, isBlock, email, phoneNo } = UserDetails.data();
            const userchatinfo = { chats:[],uid:UserDetails.id,mobile:phoneNo,email,isBlock,isOnline,profile:imgURL,username:name };
          const userchat = await userchatCol.doc( iterator ).collection( "message" );
            const userChatSnapshot = await userchat.get();
            userChatSnapshot.forEach( chat =>
            {
                userchatinfo.chats.push({cid:chat.id,...chat.data()});
            })
            userallchats.push( userchatinfo );

        }
        return userallchats;
    }catch(error){
        throw error;
    }
};
