const Fire = require('./Fire.js');

exports.alluser = async () => {
    try {
        const userslis = (await Fire.auth().listUsers()).users
        const users = [];
        userslis.forEach(ele => {
            users.push({
                id: ele.uid,
                email: ele.email,
                verrify: ele.emailVerified,
                username: ele.displayName,
                isBlock: ele.disabled,
                join: ele.metadata.creationTime,
                lastOnline: ele.metadata.lastSignInTime,
                isOnline: new Date(ele.metadata.lastSignInTime) > new Date()
            })
        })
        return users;
    } catch (error) {
        throw error;
    }
}

exports.onUser = async (uid) => {
    try {
        const User = await Fire.auth().getUser(uid);
        return {
            id: User.uid,
            email: User.email,
            verrify: User.emailVerified,
            username: User.displayName,
            isBlock: User.disabled,
            join: User.metadata.creationTime,
            lastOnline: User.metadata.lastSignInTime,
            isOnline: new Date(User.metadata.lastSignInTime) > new Date()
        }
    } catch (error) {
        throw error;

    }
}
