const chatDao = require( "../FireBase/adminchat.js" );
exports.add = async ( request ) =>
{
    try {
        const { message } = request.body;
        const uid = request.params.uid;
        const chat = await chatDao.addchat( message, uid );
        return { cid: chat.cid, scuss: chat.scuss };
    } catch (error) {
        throw error;
    }
}