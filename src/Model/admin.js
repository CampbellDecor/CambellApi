const {
  ServiceAdmin
} = require('../Service/Admin_Service.js');
const {
  HtmlTempleteCambellMail
} = require('../Util/Mail/Mail.js');
const Mail = HtmlTempleteCambellMail.getInstance();
const AdminService = new ServiceAdmin();
class AdminModel {

  async all({
    cookies
  }) {
    try {
      const AllAdmins = await AdminService.all(cookies);
      return AllAdmins;
    } catch (error) {
      throw error;
    }
  }
  async add({
    body
  }) {
    try {
      AdminService.admin.data = body;
      const AddAdmin = await AdminService.add();
      return AddAdmin;
    } catch (error) {
      throw error;
    }
  }
  async remove({
    body
  }) {
    try {
      AdminService.admin.aid = body.aid;
      const adminRemove = await AdminService.delete();
    } catch (error) {
      throw error;
    }
  }
  async edit({
    body
  }) {
    try {
      const editAdmin = await AdminService.edit(body);
      return editAdmin;
    } catch (error) {
      throw error;
    }
  }
  async block({
    params
  }) {
    try {

    } catch (error) {

    }
  }
  async unblock({
    params
  }) {
    try {

    } catch (error) {

    }
  }
  async sigin({
    body
  }) {
    try {

    } catch (error) {

    }
  }
  async sigout({
    body
  }) {
    try {

    } catch (error) {

    }
  }
  async passwordReset(req, res) {
    const {
      body
    } = req;
    try {
      const resetlink = await AdminService.resetPassword(body.email);
      Mail.setConf(body.email, "Password Reset");
      Mail.setContext({
        content: `<a href='${resetlink}'>Reset</a>`,
        title: "password Reset",
        username: body.email
      });
      await Mail.sendMail();
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }

  }
}

// const a = new AdminModel();
// req = {
//   body: {
//   email: 'thanumahee440@gmail.com'
//   }
// }
// const res={}
// a.passwordReset(req,res).then(console.log);
module.exports = {
  AdminModel
}
