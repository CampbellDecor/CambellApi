const {
  ServiceAdmin
} = require('../Service/Admin_Service.js');
const AdminService = new ServiceAdmin();
class AdminModel {

  async all({
    cookies
  }) {

  }
  async add({
    body}) {
    return 20;
  }
  async remove({
    body
  }) {

  }
  async edit({
    body
  }) {

  }

}
module.exports = {
  AdminModel
}
