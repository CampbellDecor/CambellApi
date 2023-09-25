const UserchatDao = require( "../FireBase/userChat" );

exports.allchat = async () =>
{
    try {
        const allchat = UserchatDao.all();
        return allchat;
    } catch (error) {
        throw error;
    }
};
