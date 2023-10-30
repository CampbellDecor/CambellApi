const Firebase = require("./Fire.js");
const {
    FieldValue
} = require("firebase-admin/firestore");
const FireStorage = require("./Storage.js");
const Auth = Firebase.auth();
const adminDoc = Firebase.firestore().collection("admins");
exports.add = async (admin) => {
    try {
        const adminauth = await Firebase.auth().createUser({
            phoneNumber: admin?.mobile,
            email: admin?.email,
            displayName: admin?.username
        });

        const admindata = await adminDoc.doc(adminauth.uid);
        admindata.set(admin);
        const verifylink = await Firebase.auth().generateEmailVerificationLink(admin?.email);
        return {
            aid: admindata.id,
            verifylink
        };
    } catch (error) {
        throw error;
    }
};

exports.all = async (access_token) => {
    try {
        const admins = [];
        const snapshot = await adminDoc.get();
        const {
            uid
        } = await Auth.verifyIdToken(access_token);
        snapshot.forEach(admin => {
            if (admin.aid !== uid) {
                admins.unshift({
                    aid: admin.id,
                    ...admin.data()
                });
            }


        })
        console.log(admins);
        return admins;
    } catch (error) {
        throw error;
    }
};

exports.block = async (aid) => {
    try {
        const user = await Firebase.auth().updateUser(aid, {
            disabled: true,
        })
        await adminDoc.doc(aid).update({
            isBlock: true
        });
        return {
            block: true,
            email: user.email
        }
    } catch (error) {
        throw error;
    }
}
exports.unblock = async (aid) => {
    try {
        const user = await Firebase.auth().updateUser(aid, {
            disabled: false,
        })
        await adminDoc.doc(aid).update({
            isBlock: false
        });
        return {
            unblock: true,
            email: user.email
        };
    } catch (error) {
        throw error;
    }
}

exports.OneAdmin = async (aid) => {
    try {
        const User = await adminDoc.doc(aid).get();
        return {
            uid: User.id,
            ...User.data()
        }

    } catch (error) {
        throw error;
    }
}
