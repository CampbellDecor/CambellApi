const Firebase = require("./Fire.js");
const FireStorage = require("./Storage.js");
const {
    FieldValue,
    Firestore
} = require('firebase-admin/firestore')
const Auth = Firebase.auth();
const adminDoc = Firebase.firestore().collection("admins");

exports.add = async (admin) => {
    try {
        console.log(admin);
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
            console.log(adminauth.uid);
            const admindata = await adminDoc.doc(adminauth.uid);
            admindata.set(otherAdmin);
            const verifylink = await Firebase.auth().generateEmailVerificationLink(admin?.email);
            return {
                aid: admindata.id,
                verifylink
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
            uid
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
        exports.admin = await adminDoc.doc(aid);
        admin.delete();
        await Auth.deleteUser(aid);
        return true;
    } catch (error) {
        throw error;
    }
}

exports.search = async (serach) => {
    try {
        if (typeof (serach) !== 'string') throw new TypeError("String are valid")
        const rex = new RegExp(serach, 'gi');
        const adminsnap = await adminDoc.get();
        const searchresult = [];
        adminsnap.forEach(admin => {
            searchresult.push({
                aid: admin.id,
                ...admin.data()
            });
        })
        return searchresult.filter(Element => rex.test(Element.username) || rex.test(Element.firstname) || rex.test(Element.lastname) || rex.test(toString(Element.mobile)) || rex.test(Element.email) || rex.test(Element.address)) ?? [];
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
                timeAndDate: new Date()
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
                timeAndDate: new Date()
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
        } =await Auth.verifyIdToken(req.cookies.access_token);

         await adminDoc.doc(uid).update({
            activity: FieldValue.arrayUnion({
                action,
                dateAndTime: new Date()
            })
        });
       
    } catch (error) {
        throw error;
    }
}
exports.editAdmin = async (aid, data) => {
    try {
        const admin = await adminDoc.doc(aid).update(data);
        return true;
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
