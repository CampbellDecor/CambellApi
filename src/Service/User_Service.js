const {
    FireStore,
    Auth
} = require('./Fire.js');
const UserCollection = FireStore.collection('users');

const allUsers = async () => {
    try {
        const UserDoc = await UserCollection.get();
        const Users = [];
        const usersResult = []
        UserDoc.forEach(user =>
        {
            const {
                activity,...others}=user.data()
            Users.push({
                uid: user.id,
                ...others
            });
        });
        for (const u of Users) {
            const user = await Auth.getUser(u.uid);
            usersResult.push({
                ...u,
                lastOnline: user.metadata?.lastSignInTime?new Date(user.metadata?.lastSignInTime).toISOString():"Not Yet",
                join: new Date(user.metadata.creationTime).toISOString()
            })
        }
        return usersResult;
    } catch (error) {
        throw error;
    }
}

