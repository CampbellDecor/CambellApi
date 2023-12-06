const {
    Auth,
    clientAuth
} = require('./Fire.js')
const {
    signInWithEmailAndPassword,
    getIdToken,
    signOut
} = require('firebase/auth')

const Authendication = function () {

}
Authendication.prototype.addnew = async function ({
    username,
    password,
    email,
    mobile,
    profile,
    isBlock = false
}) {
    try {
        const user = await Auth.createUser({
            phoneNumber: mobile,
            displayName: username,
            password,
            email: email,
            photoURL: profile===''?undefined:profile,
            disabled: isBlock
        })
        return {
            uid: user.uid,
            username,
            email,
            mobile,
            profile,
            isBlock,
            verfied: false,
            join: new Date().toDateString(),
            lastOnline: 'Not yet'
        }
    } catch (error) {
        throw error
    }
}
Authendication.prototype.UserByID = async function (uid)
{
    try {
 const user = await Auth.getUser(uid);
 return {
     uid,
     username: user.displayName,
     email: user.email,
     isBlock: user.disabled,
     mobile: user.phoneNumber,
     verfied: user.emailVerified,
     profile: user.photoURL,
     join: new Date(user.metadata.creationTime).toDateString(),
     lastOnline: 'Not yet'
 }
    } catch (error) {
        throw error;
    }
}
Authendication.prototype.editUser = async function ({
    uid,
    username,
    profile,
    mobile,
    email
}) {
    try {
        await Auth.updateUser(uid, {
            displayName: username,
            photoURL: profile,
            phoneNumber: mobile,
            email
        })
        return await this.UserByID(uid);
    } catch (error) {
        throw error;
    }
}
Authendication.prototype.editemail = async function ({
    email,
    newEmail
}) {
    try {
        const link = await Auth.generateVerifyAndChangeEmailLink(email, newEmail);
        return link;
    } catch (error) {
        throw error;
    }
}

Authendication.prototype.getAll = async function () {
    try {
        const users = (await Auth.listUsers()).users;
        const usersD = []
        users.forEach(u => {
            const {
                metadata,
                uid,
                email,
                photoURL,
                phoneNumber,
                disabled,
                displayName,
                emailVerified
            } = u ?? {};
            usersD.push({
                id: uid,
                email,
                profile: photoURL,
                mobile: phoneNumber,
                isBlock: disabled,
                username: displayName,
                join: new Date(metadata?.creationTime).toDateString(),
                verfied: emailVerified,
                lastOnline: metadata?.lastSignInTime ? new Date(metadata?.lastSignInTime) : 'Not Yet'
            })
        })
        return usersD
    } catch (error) {
        throw error
    }
}

Authendication.prototype.login = async function ({
    email,
    password
}) {
    try {
        const Login = await signInWithEmailAndPassword(clientAuth, email, password);
        const access_token = await getIdToken(Login.user);
        return {
            access_token,
            uid: Login.user.uid
        }
    } catch (error) {
        throw error;
    }
}

Authendication.prototype.logout = async function () {
    try {
        await signOut(clientAuth);
    } catch (error) {
        throw error;
    }
}

Authendication.prototype.resetPassword = async function (email) {
    try {
        if (!email) throw new Error("Email is Empty");
        const resetlink = await Auth.generatePasswordResetLink(email);
        return resetlink;
    } catch (error) {
        throw error;
    }
}
Authendication.prototype.search = async function (search)
{
    if (!search || typeof (search) !== 'string')
        throw new TypeError("one string Parameter request ");
    try {
        const users = await this.getAll();
        const regex = new RegExp(search,'ig');
       const exist=users.filter(auth => regex.test(auth.id) || regex.test(auth.email) || regex.test(auth.mobile))
        return exist ?? [];
    } catch (error) {
        throw error;
    }
}
Authendication.prototype.isExist = async function (search) {
    if (!search || typeof (search) !== 'string')
        throw new TypeError("one string Parameter request ");
    try {
        const users = await this.search(search)
        return users?.length > 0;
    } catch (error) {
        throw error;
    }
}
Authendication.prototype.count = async function ()
{
    try {
        const user = await this.getAll();
        return user.length??0
    } catch (error) {
        throw error
    }
}
Authendication.prototype.block = async function (uid)
{
try {
    await Auth.updateUser(uid, {
        disabled: true
    });
    return await this.UserByID(uid);
} catch (error) {
    throw error;
}
}
Authendication.prototype.unblock = async function (uid) {
    try {
        await Auth.updateUser(uid, {
            disabled: false
        });
        return await this.UserByID(uid);
    } catch (error) {
        throw error;
    }
}
module.exports = Authendication;
