const Authndication = require('./Firebase/Auth.js');
const {Admin } = require('../Model/Mode/Admin.js');
const Auth = new Authndication();
class ServiceAdmin
{
    constructor (admin)
    {
        this.admin = admin;
    }
    async ResetPassword ()
    {
        const { email } = this.admin;
    try
    {
        if (!email) throw new Error("Empty email")
        const link = await Auth.resetPassword(this.admin?.email);
        return link;
    } catch (error) {
        throw error;
    }
}
}
module.exports = {
    ServiceAdmin};
