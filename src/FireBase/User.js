// @ts-nocheck
const Firebase = require("./Fire.js");
const {
    FieldValue
} = require("firebase-admin/firestore");
const FireStorage = require("./Storage.js");
const userCol = Firebase.firestore().collection("users");
const {
    addActivity
} = require('./admin.js');
exports.add = async (user) => {
    try {
        const {
            password,
            ...other
        } = user;
        const userauth = await Firebase.auth().createUser({
            phoneNumber: user?.mobile,
            email: user?.email,
            displayName: user?.username ?? "",
            password,
            disabled: user?.isBlock ?? false
        });
        let userdata, verifylink;
        try {
            userdata = await userCol.doc(userauth.uid);
            userdata.set(other);
            verifylink = await Firebase.auth().generateEmailVerificationLink(user?.email);
        } catch (error) {
            throw error;
        }
        return {
            uid: userauth.uid,
            verifylink
        };
    } catch (error) {
        throw error;
    }
};

exports.all = async () => {
    try {
        const users = [];
        const snapshot = await userCol.get();
        snapshot.forEach(async user => {
            const {
                religion,
                ...other
            } = user.data();
            users.push({
                uid: user.id,
                ...other,
                religion: religion ?? 'unknown'
            });

        })
        return users;
    } catch (error) {
        throw error;
    }
};
exports.block = async (userid, req, reason = 'Anwanted Activity') => {
    try {
        const {
            uid
        } = await Firebase.auth().verifyIdToken(req.cookies.access_token);
        const user = await Firebase.auth().updateUser(userid, {
            disabled: true
        })
        await userCol.doc(userid).update({
            isBlock: true,
            activity: FieldValue.arrayUnion(`Blocked By **${uid}** for ${reason}`)
        });
        await addActivity(req, `**${userid}** Blocked for ${reason}`);
        return {
            block: true,
            email: user.email
        }
    } catch (error) {
        throw error;
    }
}
exports.unblock = async (userid, req, note = 'conatact with email') => {
    try {
        const {
            uid
        } = await Firebase.auth().verifyIdToken(req.cookies.access_token);
        const user = await Firebase.auth().updateUser(userid, {
            disabled: false,
        })
        await userCol.doc(userid).update({
            isBlock: false,
            activity: FieldValue.arrayUnion(` unBlocked By **${uid}** for ${note}`)
        });
        await addActivity(req, `**${userid}** Blocked for ${note}`);
        return {
            unblock: true,
            email: user.email
        };
    } catch (error) {
        throw error;
    }
}

exports.OneUser = async (uid) => {
    try {
        const User = await userCol.doc(uid).get();
        return {
            uid: User.id,
            ...User.data()
        }

    } catch (error) {
        throw error;
    }
}
exports.Religions = async () => {
    const userblockmap = [];
    try {
        const Religions = []
        const snapshot = await userCol.get();
        snapshot.forEach(
            user => {

                const rel = user.data().religion ?? "unknown";
                Religions.push(rel?.at(0)?.toUpperCase() + rel?.substring(1, rel.length).toLowerCase());


            }
        )
        return Religions.length <= 0 ? "" : new Set(Religions);
    } catch (error) {
        throw error;
    }

}

exports.usercount = async () => {
    try {
        const adminsnap = await userCol.get();
        return adminsnap.size;
    } catch (error) {
        throw error;
    }
}
exports.block_unblock_count = async () => {
    try {
        const user = {
            block: 0,
            unblock: 0
        };
        const usersnap = await userCol.get();
        usersnap.forEach(ele => {
            ele.isBlock ? user.block++ : user.unblock++;
        })
        return user;
    } catch (error) {
        throw error;
    }
}
exports.deleteUser = async (uid) => {
    try {
        const user = await userCol.doc(uid).delete();
        await Firebase.auth().deleteUser(uid);
        return {
            user
        };
    } catch (error) {
        throw error;
    }
};
exports.block_unblock_fillter = async (block) => {
    try {
        const users = [];
        const userDoc = await userCol.where("isBlock", "==", block).get();
        userDoc.forEach(user => {
            users.push({
                uid: user.id,
                ...user.data()
            });
        })
        return users;
    } catch (err) {
        throw err;
    }
}
exports.religionFilter = async (religion) => {
    try {
        const regx = new RegExp(religion, 'ig');
        const usersnap = await userCol.get();
        const relUser = [];
        usersnap.forEach(
            ele => {
                const {
                    religion,
                    ...other
                } = ele.data();
                relUser.push({
                    uid: user.id,
                    ...other,
                    religion: religion ?? 'unknown'
                });
            }
        )
        return relUser.filter(element => regx.test(element?.religion))
    } catch (error) {
        throw error;
    }
}
exports.ReligionCounts = async () => {
    const Religions = [];
    const ReligionsCount = [
        [],
        []
    ]
    try {
        const snapshot = await userCol.get();
        snapshot.forEach(
            user => {

                const rel = user.data().religion ?? "unknown";
                Religions.push(rel?.at(0)?.toUpperCase() + rel?.substring(1, rel.length).toLowerCase());


            });
        const UNIq = new Set(Religions);
        UNIq.forEach(ele => {
            ReligionsCount[0].push(ele);
            const count = Religions.filter(value => value === ele).length;
            ReligionsCount[1].push(count);

        });
        return ReligionsCount
    } catch (error) {
        throw error;
    }

}
exports.Online_Offline = async () => {
    try {
        const userlist = [
            [],
            []
        ]
        const users = (await Firebase.auth().listUsers()).users;
        users.forEach(u => {
            if (u.metadata.lastSignInTime >= new Date())
                userlist[0].push({
                    uid: u.uid,
                    OnlineTime: u.metadata.lastSignInTime
                });
            else
                userlist[1].push({
                    uid: u.uid,
                    OfflineTime: u.metadata.lastSignInTime
                });

        })

        return userlist;
    } catch (error) {
        throw error;
    }
};
exports.search = async (search) => {
    try {
        if (typeof (search) !== 'string') throw new TypeError("String are valid")
        const rex = new RegExp(search, 'gi');
        const adminsnap = await userCol.get();
        const searchresult = [];
        adminsnap.forEach(user => {
            searchresult.push({
                uid: user.id,
                ...user.data()
            });
        })
        return searchresult.filter(Element => rex.test(Element?.username) || rex.test(Element?.name) || rex.test(Element?.firstname) || rex.test(Element?.lastname) || rex.test(toString(Element?.phoneNo)) || rex.test(Element?.email) || rex.test(Element?.address)) ?? [];
    } catch (error) {
        throw error;
    }
}

exports.edit = async (data) => {
    try {
        const {
            uid,
            profile,
            username,
            mobile,
            ...others
        } = data;
        const usercol = await userCol.doc(uid).update({
            imgURL: profile,
            phoneNo: mobile,
            name: username,
            ...others
        });
        return true;
    } catch (error) {
        throw error;
    }
}
exports.searchHint = async () => {
    try {
        const Hints = [];
        const users = await userCol.get();
        users.forEach(element => {
            const {
                name,
                email,
                phoneNo,
                address
            } = element.data();
            Hints.push(name, email, phoneNo, address);

        })
        return Hints;
    } catch (error) {
        throw error;
    }
}
exports.isOnline = async (uid) => {
    try {
        const users = await Firebase.auth().getUser(uid);
        const date = new Date();
        return {
            isOnline: users.metadata.lastSignInTime >= date,
            lastOnline: users.metadata.lastSignInTime,
            isemailVerfied: users.emailVerified
        };


    } catch (error) {
        return false;
    }
}


