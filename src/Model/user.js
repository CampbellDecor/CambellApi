const userDao = require("../FireBase/user.js");
const BookDao = require("../FireBase/Booking.js");
const randompwd = require("generate-password");
const Mail = require("./Mail.js");

const userModel = (userDoc) => {
    const {
        activity,
        imgURL,
        name,
        isOnline,
        phoneNo,
        ...Other
    } = userDoc;
    return {
        profile: imgURL,
        username: name,
        mobile: phoneNo,
        ...Other
    };
}
const userSetModel = async (user) => {
    try {
        const usermodel = userModel(user);
        const isOnline = await userDao.isOnline(user.uid);
        const booking = await BookDao.userBookingCount(user.uid);
        return {
            ...usermodel,
            isOnline,
            booking
        }
    } catch (error) {
        throw error;
    }
}
exports.add = async (request) => {
    const {
        username,
        profile,
        email,
        mobile,
        address,
        religion
    } = request.body;
    religion ?? "unknown";
    const password = randompwd.generate({
        length: 20,
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true
    })
    try {
        const useradd = await userDao.add({
            name: username,
            imgURL: profile ?? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",
            email,
            religion: religion ?? 'unknown',
            phoneNo: mobile,
            address,
            isBlock: false,
            password,
            isOnline: false,
            activity: [{
                action: "created",
                dateAndTime: new Date()
            }]
        })
        const adduser = `
        <html>
        <head>
        </head>
        <body>
        <h6>Hi,${username}</h6>
        <h1 style="text-align:'center'">Add New user</h1>
        <p>welcome ${username}</p>
        <p>Your Password is : ${password} <br/> you can changed anytime</p>
        <p><a href="${useradd.verifylink}">verify you</a></p>
        </body>
        </html>
        `
        await Mail.sendSingleMail(email, "Cambell Decor Registration", adduser);
        return useradd.uid;
    } catch (error) {
        throw error;
    }
};

exports.block = async (request) => {
    try {
        const {
            uid,
            reason
        } = request.body;
        reason ?? "UnNessary Activity";
        const blocked = await userDao.block(uid, request, reason);
        await Mail.sendSingleMail(blocked.email, "Account Freezed", `<html>
        <h1>Account Blocked</h1>
        Hi, ${blocked.email?.substring( 0, blocked.email.indexOf( "@" ) )}<br/>
        Your Account have freezed for Your ${reason} .if You continue your Work Please Contact with Our team With In <b>30</b> Days
        </html>`);
        return blocked.block;
    } catch (error) {
        throw error;
    }


}
exports.unblock = async (request) => {
    try {
        const {
            uid,
            note
        } = request.body;
        const blocked = await userDao.unblock(uid, request, note);
        await Mail.sendSingleMail(blocked.email, "Account unFreezed", `<html>
        <h1>Account UnBlock</h1>
        Hi, ${blocked.email?.substring( 0, blocked.email.indexOf( "@" ) )}<br/>
        Your Account have resume for Your request .if You can continue your Work .
        </html>`);
        return blocked.unblock;
    } catch (error) {
        throw error;
    }


}

exports.all = async () => {
    try {
        const UserDatas = [];
        const userSetData = [];
        const userCol = await userDao.all();
        userCol.forEach(user => {
            UserDatas.push(user);
        })
        for (const iterator of UserDatas) {
            const u = await userSetModel(iterator);
            userSetData.push(u);
        }
        return userSetData;
    } catch (error) {
        throw error;
    }
}
exports.OneUser = async (req) => {
    try {
        const uid = req.params.uid;
        const user = await userDao.OneUser(uid);
        return userModel(user);
    } catch (error) {
        throw error;
    }
};

exports.block_unblock_user = async (req) => {
    try {
        const UserDatas = [];
        const result = req.params.block;
        const userCol = await userDao.block_unblock_fillter(result === "block");
        userCol.forEach(user => {
            UserDatas.push(user);
        })
        const datas = []
        for (const iterator of UserDatas) {
            const u = await userSetModel(iterator);
            datas.push(u);
        }
        return datas.length <= 0 ? [] : datas;
    } catch (error) {
        throw error;
    }
};

exports.religions_filter = async (filter) => {
    try {
        const users = await userDao.religionFilter(filter);
        console.log(users)
        const data = users.map(ele => {
            return userModel(ele)
        });
        console.log(data);
        return data;
    } catch (error) {
        throw error;
    }

};

exports.relCount = async () => {
    const relcount = await userDao.ReligionCounts();
    return relcount;
}

exports.userCount = async () => {
    try {
        const users = await userDao.userCount();
        return users ?? 0;
    } catch (error) {
        throw error;
    }
}
exports.editUser = async (req) => {
    try {
        const body = req.body;
        const user = await userDao.edit(body);
    } catch (error) {
        throw error;
    }
}
exports.userHints = async () => {
    try {
        const userHints = await userDao.searchHint();
        return userHints.filter(ele => ele !== undefined);
    } catch (error) {
        throw error;
    }
}
exports.userSearch = async (req) => {
    const searchres = req.params.search;
    try {
        const searchuser = await userDao.search(searchres);
        const datas = [];
        for (const iterator of searchuser) {
            const u = await userModel(iterator);
            datas.push(u);
        }
        return datas.length > 0 ? datas : [];
    } catch (error) {
        throw error;
    }
}
