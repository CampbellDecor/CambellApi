const Firebase = require("./Fire.js");
const FireStorage = require("./Storage.js");
const {
    FieldValue
} = require('firebase-admin/firestore')
const Auth = Firebase.auth();
const adminDoc = Firebase.firestore().collection("admins");
const adminchat = Firebase.firestore().collection("adminchats");
exports.add = async (admin) => {
    try {

        const {
            password,
            ...otherAdmin
        } = admin
        if (admin.email !== undefined && admin.password !== undefined) {
            const adminauth = await Firebase.auth().createUser({
                phoneNumber: admin?.mobile,
                email: admin?.email,
                displayName: admin?.username,
                password: admin?.password,
            });
            const admindata = await adminDoc.doc(adminauth.uid);
            admindata.set(otherAdmin);
            const adminc = await adminchat.doc(adminauth.uid);
            await adminc.set({
                username: admin?.username,
                profile: admin?.profile
            })
            const chatting = {
                message: `Welcome ${admin?.username} you can continue this chat box also`,
                date: new Date().toLocaleDateString(),
                time: new Date().toTimeString(),
                type: 'sent'
            }
            await adminc.collection("chat").add(chatting)
            const verifylink = await Firebase.auth().generateEmailVerificationLink(admin?.email);
            const reset = await Firebase.auth().generatePasswordResetLink(admin?.email);
            const { activity, ...extra } = otherAdmin;
            return {
                aid: admindata.id,
                verifylink,
                reset,
                result: {
                    aid: admindata.id,
                    ...extra
                }
            };
        } else {
            throw new Error('required Field Empty')
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

exports.all = async (access_token) => {
    try {

        const admins = [];
        const snapshot = await adminDoc.get();
        const {
            uid,
            ...other
        } = await Auth.verifyIdToken(access_token);
        snapshot.forEach(admin => {
            if (admin.id !== uid) {
                admins.push({
                    aid: admin.id,
                    ...admin.data()
                });
            }

        })
        return admins;
    } catch (error) {
        throw error;
    }
};

exports.block = async (aid, reason = 'unwanted Action') => {
    try {
        const user = await Firebase.auth().updateUser(aid, {
            disabled: true,
        })
        await adminDoc.doc(aid).update({
            isBlock: true,
            activity: FieldValue.arrayUnion({
                action: 'blocked',
                datetime: new Date(),
                reason
            })
        });
        return {
            block: true,
            email: user.email
        }
    } catch (error) {
        throw error;
    }
}
exports.unblock = async (aid, note = "Contact and solve Problem") => {
    try {
        const user = await Firebase.auth().updateUser(aid, {
            disabled: false,
        })
        await adminDoc.doc(aid).update({
            isBlock: false,
            activity: FieldValue.arrayUnion({
                action: 'unblocked',
                datetime: new Date(),
                note
            })
        });
        return {
            unblock: true,
            email: user.email
        };
    } catch (error) {
        throw error;
    }
}

exports.isblock = async (email) => {
    try {
        exports.admin = await Auth.getUserByEmail(email);
        return admin.disabled
    } catch (error) {
        throw error;
    }
}
exports.deleteAdmin = async (aid) => {
    try {
        const admin = await adminDoc.doc(aid);
        admin.delete();
        await Auth.deleteUser(aid);
        await adminchat.doc(aid).delete();
        return true;
    } catch (error) {
        throw error;
    }
}

exports.adminActivity = async (aid = undefined) => {
    try {
        if (aid) {
            const admindoc = await adminDoc.doc(aid).get();
            return {
                aid,
                activity: admindoc.data().activity
            }
        } else {
            const adminActivi = new Map();
            const admindoc = await adminDoc.get();
            admindoc.forEach(ele => adminActivi.set(ele.id, ele.data().activity ?? []));
            return adminActivi;
        }
    } catch (error) {
        throw error;
    }
}

exports.login = async (req) => {
    try {
        const {
            uid
        } = await Auth.verifyIdToken(req.cookies.access_token);

        await adminDoc.doc(uid).update({
            isOnline: true,
            activity: FieldValue.arrayUnion({
                action: 'SignIn',
                timeAndDate: new Date().toLocaleDateString()
            })
        });
        const snapshot = await adminDoc.doc(uid).get();
        const {
            activity,
            ...others
        } = snapshot.data();
        return {
            login: true,
            user: others
        }
    } catch (error) {
        throw error;
    }
}
exports.logout = async (req) => {
    try {
        const {
            uid
        } = await Auth.verifyIdToken(req.cookies.access_token);
        await adminDoc.doc(uid).update({
            isOnline: false,
            activity: FieldValue.arrayUnion({
                action: 'SignOut',
                timeAndDate: new Date().toLocaleDateString()
            })
        });
        return true;
    } catch (error) {
        throw error;
    }
}
exports.addActivity = async (req, addaction = 'admin activity') => {
    try {
        const action = req.body?.action ?? addaction;
        const {
            uid
        } = await Auth.verifyIdToken(req.cookies.access_token);

        await adminDoc.doc(uid).update({
            activity: FieldValue.arrayUnion({
                action,
                dateAndTime: new Date().toLocaleDateString()
            })
        });

    } catch (error) {
        throw error;
    }
}
exports.editAdmin = async (aid, data) => {
    try {
        const admin = await adminDoc.doc(aid).update(data);
        const {
            username,
            profile
        } = data;
        if (username) {
            await adminchat.doc(aid).update({
                username
            });
        }
        if (profile) {
            await adminchat.doc(aid).update({
                profile
            });
        }
        return aid;
    } catch (error) {
        throw error;
    }
}
exports.findById = async (aid) => {
    try {
        const admin = await adminDoc.doc(aid).get();
        return {
            aid: aid,
            ...admin.data()
        };
    } catch (error) {
        throw error;
    }

}
exports.resetPassword = async ({
    aid
}) => {
    try {
        const admin = await Firebase.auth().getUser(aid)
        const resetlink = await Firebase.auth().generatePasswordResetLink(admin.email);
        return {
            resetlink,
            email: admin.email
        }
    } catch (error) {
        throw error;
    }
}

exports.showAdminActivity = async (aid) => {
    try {
        exports.activities = await adminDoc.doc(aid).get();
        const {
            activity
        } = activities.data();
        const act = [];
        activity?.forEach(ele => {
            act.push({
                activity: ele.action,
                dateTime: ele.datetime,
                other: ele?.reason ?? ele?.note ?? ele?.other ?? ""
            })
        })
        return act ?? [];
    } catch (error) {
        throw error;
    }
}

exports.admincount = async () => {
    try {
        const admins = await adminDoc.get();
        return admins?.size ?? 0
    } catch (error) {
        throw error;
    }
}
