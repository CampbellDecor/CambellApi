const {
    showchatllist,
    sendMessage,
    adminchats,
    searchA
} = require('../FireBase/adminchat.js');


exports.send = async ({
    body,
    cookies,
}) => {
    try {
        const {
            message,
            aid
        } = body;

        const result = await sendMessage({
            message,
            aid,
            access_token: cookies.access_token
        });
        return result;
    } catch (error) {
        throw error;
    }
}

exports.chatlist = async ({
    cookies
}) => {
    try {
        const result = await showchatllist(cookies);
        return result;
    } catch (error) {
        throw error;
    }
}

exports.chats = async ({
    params
}) => {
    try {
        const {
            aid
        } = params;
        const result = await adminchats(aid);
        return result;
    } catch (error) {
        throw error;
    }
}
exports.search = async ({
    params
}) => {
    try {
        const result = await searchA(params.search);
        return result;
    } catch (error) {
        throw error;
    }
}
