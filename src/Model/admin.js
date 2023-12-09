const adminDao = require("../FireBase/admin.js");
const randompwd = require("generate-password");
const Fire = require('../FireBase/Fire.js');
const Mail = require("../Util/Mail/Mail.js");
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
      const addAdmin = 0;
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
    const addAdmin = 0;
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
    const addAdmin = 0;
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
    const addAdmin = ""
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
