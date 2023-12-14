const adminDao = require("../FireBase/admin.js");
const randompwd = require("generate-password");
const Fire = require('../FireBase/Fire.js');
const Mail = require("./Mail.js");
const Authu = require("../FireBase/Auth.js")
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
    <title>Your Email Template</title>
  </head>
  <body
    style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4;">
    <header
      style="background: linear-gradient(to right, #111be6, #8f91fb); color: white; text-align: center; padding: 10px;">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/campbelldecor-c2d1f.appspot.com/o/logo.png?alt=media&token=8beb4a91-6495-41c9-941d-3b26d1403757"
        alt="Logo" style="max-width: px; height:100px;">
      <h1>Campbell Decor</h1>
    </header>
    <main
      style="padding: 30px; margin: 5px 20px;text-align: justify;display: flex;align-items: center;justify-content: center;">
      <div style="width: 90%;">
        <h2>Account Registed</h2>
        <h5>Hi, ThanuMahee</h5>
        <p>Dear ${username},
          We're delighted to inform you that you have been successfully added as
          an administrator on Campbell Decor.
          Your new administrative role grants you access to a range of powerful
          tools and functionalities within the app, allowing you to effectively
          manage and oversee various aspects of the platform. Your contribution
          as an admin is invaluable in ensuring a smooth and efficient user
          experience for our community.
          As an administrator, you have the responsibility and privilege to
          manage user accounts, moderate content, configure settings etc. Your
          insights and actions will significantly contribute to enhancing the
          functionality and overall experience for all users.
          Please log in to your account using your credentials to access the
          administrative dashboard. If you require any guidance on how to
          utilize the administrative features or have any questions, our support
          team is readily available to assist you.
          Thank you for accepting this crucial role within Campbell Decor. We're
          confident that your expertise and dedication will greatly benefit our
          community and the app as a whole.
          Best regards,
        </p>
        <div>
<a href ="${
        adminadd?.reset
    }"> here! </a>but first you must verify
    <a href='${adminadd?.verifylink}'>you</a> </p>
<p style="color:red">
password <istyle="margin-left:10px">${password}</i>
</p>
        </div>
      </div>
    </main>
    <footer
      style="background-color: #333; color: white; text-align: center; padding: 10px; position: fixed; bottom: 0; width: 100%;">
      <div style="display: flex; justify-content: center; align-items: center;">
        <div style="margin-right: 20px;">
          <img
            src="https://img.icons8.com/material-outlined/24/ffffff/phone.png"
            alt="Phone Icon" style="margin-bottom: -5px;">
          <span style="margin-left: 5px;">+61410734436</span>
        </div>
        <div style="margin-right: 20px;">
          <img src="https://img.icons8.com/ios/24/ffffff/email.png"
            alt="Email Icon" style="margin-bottom: -5px;">
          <a href="mailto:campbelldecorau@gmail.com"
            style="margin-left: 5px; text-decoration: none ;color:#f4f4f4;">campbelldecorau@gmail.com</a>
        </div>
        <div>
          <img
            src="https://img.icons8.com/material-outlined/24/ffffff/domain.png"
            alt="Website Icon" style="margin-bottom: -5px;">
          <a href="http://www.campbelldecor.com.au/"
            style="margin-left: 5px;; text-decoration: none ;color:#f4f4f4;">www.campbelldecor.com</a>
        </div>
      </div>
    </footer>
  </body>
</html>
`;
      await Mail.sendSingleMail(email, "Cambell Decor Registration", addAdmin)
      return adminadd.result;
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
        uid=req.cookies.access_token;
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
    const uid = req.cookies.access_token;
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
`;
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
    <h2>Account unBlocked</h2>
    <h5>Hi, ${admin.username}</h5>
    <p>
      We 're pleased to inform you that your administrative access on Campbell Decor has been successfully unblocked.
    After a careful review of the situation, we 've resolved the issue that led to the block and restored your administrative privileges. You now have access to manage and oversee the functionalities and features available within the app.
    We understand the importance of administrative access in efficiently utilizing the app 's capabilities, and we apologize for any disruption this block may have caused. Your ability to manage and support the app'
    s operations is crucial, and we 're committed to ensuring a smooth experience moving forward.
    Please log in to your administrative account to resume your responsibilities and take advantage of the administrative tools provided by Campbell Decor.Should you encounter any further concerns or require assistance, our support team remains available to help you.
    Thank you
    for your understanding and cooperation throughout this process.We greatly appreciate your continued commitment to enhancing the functionality and effectiveness of Campbell Décor.
    Best regards,
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
`;
    await Mail.sendSingleMail(admin.email, "Cambell Decor unBlock Admin", addAdmin);
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
    const addAdmin = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Email Template</title>
  </head>
  <body
    style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4;">
    <header
      style="background: linear-gradient(to right, #111be6, #8f91fb); color: white; text-align: center; padding: 10px;">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/campbelldecor-c2d1f.appspot.com/o/logo.png?alt=media&token=8beb4a91-6495-41c9-941d-3b26d1403757"
        alt="Logo" style="max-width: px; height:100px;">
      <h1>Campbell Decor</h1>
    </header>
    <main
      style="padding: 30px; margin: 5px 20px;text-align: justify;display: flex;align-items: center;justify-content: center;">
      <div style="width: 90%;">
        <h2>Account Deleted</h2>
        <h5>Hi, ${admin?.username}</h5>
        <p>We hope this message finds you well. We wanted to inform you of a
          recent change regarding administrative roles on Campbell Decor.
          As part of our ongoing app management, we've made adjustments to the
          administrative access privileges, and unfortunately, your
          administrative role has been removed.
          We want to express our gratitude for your contributions and dedication
          while serving as an administrator. Your efforts in maintaining and
          overseeing Campbell Decor were invaluable, and we appreciate the time
          and commitment you invested in this role.
          If you have any questions regarding this change or need further
          clarification, please feel free to reach out to our team.
          We thank you once again for your contributions as an administrator.
          Best regards,
        </p>
      </div>
    </main>
    <footer
      style="background-color: #333; color: white; text-align: center; padding: 10px; position: fixed; bottom: 0; width: 100%;">
      <div style="display: flex; justify-content: center; align-items: center;">
        <div style="margin-right: 20px;">
          <img
            src="https://img.icons8.com/material-outlined/24/ffffff/phone.png"
            alt="Phone Icon" style="margin-bottom: -5px;">
          <span style="margin-left: 5px;">+61410734436</span>
        </div>
        <div style="margin-right: 20px;">
          <img src="https://img.icons8.com/ios/24/ffffff/email.png"
            alt="Email Icon" style="margin-bottom: -5px;">
          <a href="mailto:campbelldecorau@gmail.com"
            style="margin-left: 5px; text-decoration: none ;color:#f4f4f4;">campbelldecorau@gmail.com</a>
        </div>
        <div>
          <img
            src="https://img.icons8.com/material-outlined/24/ffffff/domain.png"
            alt="Website Icon" style="margin-bottom: -5px;">
          <a href="http://www.campbelldecor.com.au/"
            style="margin-left: 5px;; text-decoration: none ;color:#f4f4f4;">www.campbelldecor.com</a>
        </div>
      </div>
    </footer>
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


exports.auth = async () => {
  try {
    return await Authu.alluser() ?? [];
  } catch (error) {
    throw error;
  }
}
