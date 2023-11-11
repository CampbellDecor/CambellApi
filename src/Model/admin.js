const adminDao = require("../FireBase/admin.js");
const randompwd = require("generate-password");
const Fire = require('../FireBase/Fire.js');
const Mail = require("./Mail.js");
exports.add = async (request) =>

    {

        const {
            username,
            profile,
            email,
            firstname,
            lastname,
            mobile,
            address,
            isSuper,
            isBlock
        } = request.body;
        const password = randompwd.generate({
            length: 20,
            uppercase: true,
            lowercase: true,
            numbers: true,
            symbols: true
        })


        try {
            const adminadd = await adminDao.add({
                username,
                profile,
                email,
                firstname,
                lastname,
                mobile,
                address,
                isSuper: isSuper ?? false,
                isBlock: isBlock ?? false,
                password,
                isOnline: false,
                activity: [{
                    action: "created",
                    datetime: new Date().toLocaleDateString()
                }]
            });
            const addAdmin = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Added</title>
</head>

<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4;">

  <header style="background: linear-gradient(to right, #111be6, #8f91fb); color: white; text-align: center; padding: 10px;">
    <img src="https://firebasestorage.googleapis.com/v0/b/campbelldecor-c2d1f.appspot.com/o/logo.png?alt=media&token=8beb4a91-6495-41c9-941d-3b26d1403757" alt="Logo" style="max-width: px; height:100px;">
    <h1>Campbell Decor</h1>
  </header>

  <main style="padding: 30px; margin: 5px 20px;text-align: justify;display: flex;align-items: center;justify-content: center;">
    <div style="width: 90%;">
    <h2>Account Added</h2>
    <h5>Hi, ${username}</h5>
    <p> We hope this message finds you well.WelCome
    ${firstname}  ${lastname}
    to our Cambell Decor Team You can
    continue your work from today.first you can login our password
    if you want change that.click <a href ="${
        adminadd?.reset
    }"> here! </a>but first you must verify
    <a href='${adminadd?.verifylink}'>you</a> </p>
<p style="color:red">
password <i style="margin-left:10px">${password}</i>
</p><p>
    Thank you!
</p>
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
            await Mail.sendSingleMail(email, "Cambell Decor Registration", addAdmin)
            return {
                aid: adminadd.aid
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

exports.all = async (req) => {
    try {
        const access_token = req.cookies.access_token;
        const admins = await adminDao.all(access_token);
        if (admins.length <= 0) return [];
        else return admins;
    } catch (error) {
        throw error;
    }
};
exports.login = async (request) => {
    try {
        const result = await adminDao.login(request);
        return result;
    } catch (error) {
        throw error;
    }
};

exports.logout = async (req) => {
    try {
        const result = await adminDao.logout(req);
        return result;
    } catch (error) {
        throw error;
    }
}
exports.findByID = async (req) => {
    try {
        const id = req.params?.aid;
        let aid;
        if (id === 'self') {
            const {
                uid
            } = await Fire.auth().verifyIdToken(req.cookies.access_token);
            aid = uid;
        } else {
            aid = id;
        }
        const result = await adminDao.findById(aid);
        return result;
    } catch (error) {
        throw error;
    }
}

exports.editAdmin = async (req) => {
    try {
        const {
            body,
        } = req;
        const {
            aid,
            ...other
        } = body;
        const {
            uid
        } = Fire.auth().verifyIdToken(req.cookies.access_token);
        const admindoc = await adminDao.editAdmin(aid, other);
        return admindoc === uid ? 'self' : admindoc;
    } catch (error) {
        throw error;
    }
}
exports.blockAdmin = async (req) => {
    try {
        const {
            aid
        } = req.params;
        const reason = req.body.reason;
        const admin = await adminDao.findById(aid);
        const blockadmin = await adminDao.block(aid, reason);
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
    <h5>Hi, ${admin.username}</h5>
    <p>We hope this message finds you well. We regret to inform you that your user account with Campbell Decor has been temporarily blocked because of multiple suspicious activity or violation of terms of service.

We understand the inconvenience this may cause and apologize for any disruption to your experience with Campbell Decor. Our primary concern is the security of your account and your data.  If you believe this block is in error, do not hesitate to reach out to us for further assistance.  </p>
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
        await Mail.sendSingleMail(admin.email, "Cambell Decor Block Admin", addAdmin);
        return blockadmin;
    } catch (error) {
        throw error;
    }

}
exports.unblockAdmin = async (req) => {
    try {
        const {
            aid
        } = req.params;
        const reason = req.body.note;
        const admin = await adminDao.findById(aid);
        const blockadmin = await adminDao.unblock(aid, reason);
        const addAdmin = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Unblocked</title>
</head>

<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4;">

  <header style="background: linear-gradient(to right, #111be6, #8f91fb); color: white; text-align: center; padding: 10px;">
    <img src="https://firebasestorage.googleapis.com/v0/b/campbelldecor-c2d1f.appspot.com/o/logo.png?alt=media&token=8beb4a91-6495-41c9-941d-3b26d1403757" alt="Logo" style="max-width: px; height:100px;">
    <h1>Campbell Decor</h1>
  </header>

  <main style="padding: 30px; margin: 5px 20px;text-align: justify;display: flex;align-items: center;justify-content: center;">
    <div style="width: 90%;">
    <h2>Account Blocked</h2>
    <h5>Hi, ${admin.username}</h5>
    <p>We hope this message finds you well. We regret to inform you that your user account with Campbell Decor has been temporarily blocked because of multiple suspicious activity or violation of terms of service.

We understand the inconvenience this may cause and apologize for any disruption to your experience with Campbell Decor. Our primary concern is the security of your account and your data.  If you believe this block is in error, do not hesitate to reach out to us for further assistance.  </p>
<p>
Thank you
for your understanding and cooperation.We look forward to resolving this matter promptly and having you back as a valued customer.
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
        await Mail.sendSingleMail(admin.email, "Cambell Decor Block Admin", addAdmin);
        return blockadmin;
    } catch (error) {
        throw error;
    }
};

exports.deleteAdmin = async (req) => {
    try {
        const {
            aid
        } = req.params;

        const admin = await adminDao.findById(aid);
        const addAdmin = `
            <html>
            <head>
            </head>
            <body>
            <h6>Hi,${admin.username}</h6>
            <h1>Account Deleted</h1>
        <p>Mr.${admin.firstname} ${admin.lastname} We have been unBlocked Your account from you  can continue your work</p>

            </body>
            </html>
            `
        if (admin.email) {
            await Mail.sendSingleMail(admin.email, "Cambell Decor Delete Admin", addAdmin);
        }
        const deleteadmin = await adminDao.deleteAdmin(aid);



        return deleteadmin;
    } catch (error) {
        throw error;
    }
};

const adminactivity = async (req) => {
    try {
        const aid = req.params.aid;
        const activi = await adminDao.showAdminActivity(aid);
        return activi;
    } catch (error) {
        throw error;
    }
}
