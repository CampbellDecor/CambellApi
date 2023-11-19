const Fire = require('./Fire.js');

exports.alluser = async () => {
    try {
        const userslis =await (await Fire.auth().listUsers()).users
        const users = [];
        userslis.forEach(ele =>
        {
            users.push(
                {
                    id: ele.uid,
                    email: ele.email,
                    verrify: ele.emailVerified,
                    username: ele.displayName,
                    isBlock: ele.disabled,
                    join: ele.metadata.creationTime,
                    lastOnline: ele.metadata.lastSignInTime,
                    isOnline: new Date(ele.metadata.lastSignInTime)>new Date()
                }
            )
        })
        return users;
    } catch (error) {
        throw error;
    }
}
