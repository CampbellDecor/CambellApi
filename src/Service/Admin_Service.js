const {
    FireStore,
    Auth
} = require('./Fire.js');
const AdminCollection = FireStore.collection('admins');

exports.allAdmins = async () =>
{
    try {
        const AdminDoc = await AdminCollection.get();
        const Admins = [];
        const adminsResult = []
        AdminDoc.forEach(admin => {
            const {
                activity,
                ...others
            } = admin.data()
            Admins.push({
                aid: admin.id,
                ...others
            });
        });
        for (const u of Admins) {
            const admin = await Auth.getAdmin(u.aid);
            adminsResult.push({
                ...u,
                lastOnline: admin.metadata?.lastSignInTime ? new Date(admin.metadata?.lastSignInTime).toISOString() : "Not Yet",
                join: new Date(admin.metadata.creationTime).toISOString()
            })
        }
        return adminsResult;
    } catch (error) {
        throw error;
    }
}
