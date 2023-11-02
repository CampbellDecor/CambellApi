const UserchatDao = require("../FireBase/userChat");

exports.allchat = async (req) => {
    try {
        const allchat = await UserchatDao.listofChat()
        return allchat;
    } catch (error) {
        throw error;
    }
};
