const userDao = require("../FireBase/User.js");
const randompwd = require("generate-password");
const Mail = require("./Mail.js");
const BookingDao = require('../FireBase/Booking.js')
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

        const Online = await userDao.isOnline(user.uid);
        const booking = await BookingDao.userBookingCount(user.uid);
        return {
            ...usermodel,
            isOnline: Online.isOnline,
            lastSignin: Online.lastOnline,
            isVerfied: Online.isemailVerfied,
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
        const addAdmin = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Locked</title>
</head>

<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4;">

  <header style="background: linear-gradient(to right, #111be6, #8f91fb); color: white; text-align: center; padding: 10px;">
    <img src="https://firebasestorage.googleapis.com/v0/b/campbelldecor-c2d1f.appspot.com/o/logo.png?alt=media&token=8beb4a91-6495-41c9-941d-3b26d1403757" alt="Logo" style="max-width: px; height:100px;">
    <h1>Campbell Decor</h1>
  </header>

  <main style="padding: 30px; margin: 5px 20px;text-align: justify;display: flex;align-items: center;justify-content: center;">
    <div style="width: 90%;">
    <h2>Account Blocked</h2>
    <h5>Hi, ${blocked.email.substring(0,blocked.email.indexOf('@')-1)}</h5>
    <p>We hope this message finds you well. We regret to inform you that your user account with Campbell Decor has been temporarily blocked because of multiple suspicious activity or violation of terms of service.

We understand the inconvenience this may cause and apologize for any disruption to your experience with Campbell Decor. Our primary concern is the security of your account and your data.  If you believe this block is in error, do not hesitate to reach out to us for further assistance.</p>
<p>
    Thank you
for your understanding and cooperation.We look forward to resolving this matter promptly and having you back as a valued customer. </p>
</div>
  </main>

  <footer style="background-color: #333; color: white; text-align: center; padding: 10px; position: fixed; bottom: 0; width: 100%;">
    <div style="display: flex; justify-content: center; align-items: center;">
      <div style="margin-right: 20px;">
        <img src="https://img.icons8.com/material-outlined/24/ffffff/phone.png" alt="Phone Icon" style="margin-bottom: -5px;">
        <span style="margin-left: 5px;">+61410734436</span>
      </div>
      <div style="margin-right: 20px;">
        <img src="https://img.icons8.com/ios/24/ffffff/email.png" alt="Email Icon" style="margin-bottom: -5px;">
        <a href="mailto:campbelldecorau@gmail.com"  style="margin-left: 5px; text-decoration: none ;color:#f4f4f4;">campbelldecorau@gmail.com</a>
      </div>
      <div>
        <img src="https://img.icons8.com/material-outlined/24/ffffff/domain.png" alt="Website Icon" style="margin-bottom: -5px;">
        <a href="http://www.campbelldecor.com.au/" style="margin-left: 5px;; text-decoration: none ;color:#f4f4f4;">www.campbelldecor.com</a>
      </div>
    </div>
  </footer>

</body>
</html>
`
        await Mail.sendSingleMail(blocked.email, "Account Freezed", addAdmin);
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
        const addAdmin = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Locked</title>
</head>

<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4;">

  <header style="background: linear-gradient(to right, #111be6, #8f91fb); color: white; text-align: center; padding: 10px;">
    <img src="https://firebasestorage.googleapis.com/v0/b/campbelldecor-c2d1f.appspot.com/o/logo.png?alt=media&token=8beb4a91-6495-41c9-941d-3b26d1403757" alt="Logo" style="max-width: px; height:100px;">
    <h1>Campbell Decor</h1>
  </header>

  <main style="padding: 30px; margin: 5px 20px;text-align: justify;display: flex;align-items: center;justify-content: center;">
    <div style="width: 90%;">
    <h2>Account unBlocked</h2>
    <h5>Hi, ${blocked.email.substring(0,blocked.email.indexOf('@')-1)}</h5>
    <p> We hope this message finds you well.We are writing to inform you that your account on Campbell Decor has been successfully unblocked.
    After a thorough review of your account, we 've lifted the block to ensure you can once again access and enjoy the full range of services provided by Campbell Decor. We apologize for any inconvenience this temporary block may have caused and appreciate your patience and understanding throughout this process.
    We encourage you to log in to your account now to resume your activities and make the most of Campbell Decor 's features. Should you encounter any further issues or have any questions, please don'
    t hesitate to reach out to our team.
    Thank you
    for being a valued member of our community.We appreciate your cooperation and look forward to continuing to provide you with a seamless experience on Campbell Decor.
 </p>
</div>
  </main>

  <footer style="background-color: #333; color: white; text-align: center; padding: 10px; position: fixed; bottom: 0; width: 100%;">
    <div style="display: flex; justify-content: center; align-items: center;">
      <div style="margin-right: 20px;">
        <img src="https://img.icons8.com/material-outlined/24/ffffff/phone.png" alt="Phone Icon" style="margin-bottom: -5px;">
        <span style="margin-left: 5px;">+61410734436</span>
      </div>
      <div style="margin-right: 20px;">
        <img src="https://img.icons8.com/ios/24/ffffff/email.png" alt="Email Icon" style="margin-bottom: -5px;">
        <a href="mailto:campbelldecorau@gmail.com"  style="margin-left: 5px; text-decoration: none ;color:#f4f4f4;">campbelldecorau@gmail.com</a>
      </div>
      <div>
        <img src="https://img.icons8.com/material-outlined/24/ffffff/domain.png" alt="Website Icon" style="margin-bottom: -5px;">
        <a href="http://www.campbelldecor.com.au/" style="margin-left: 5px;; text-decoration: none ;color:#f4f4f4;">www.campbelldecor.com</a>
      </div>
    </div>
  </footer>

</body>
</html>
`
        await Mail.sendSingleMail(blocked.email, "Account unFreezed", addAdmin);
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
            userSetData.push(iterator);
        }
        return userSetData;
    } catch (error) {
        throw error;
    }
}
exports.OneUser = async (uid) => {
    try {
        const user = await userDao.OneUser(uid);
        if (user) {
            return await userSetModel(user);
        } else {
            return {};
        }


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

exports.OneUserBookingHistroy = async (uid) => {
    try {
        const Book = await BookingDao.UserBookDetails(uid);
        return Book;
    } catch (error) {
        throw error;
    }
}

exports.BookUSerDetails = async (req) => {
    try {
        const {
            uid
        } = req.params;
        const bookuser = await BookingDao.BookUser(uid);
        return bookuser;
    } catch (error) {
        throw error;
    }
}
exports.addNote = async ({
    body
}) => {
    try {
        const usernote = await userDao.addNote(body.uid, body.note);
        return userSetModel(usernote);
    } catch (error) {
        throw error;
    }
}
