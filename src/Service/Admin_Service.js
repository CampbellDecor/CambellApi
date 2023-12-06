const {AdminActivity,Admin} = require('../Model/Mode/Admin_Model.js');
const {Service,AsyncFunction} = require('./Service.js');
const activity = AdminActivity();
class ServiceAdmin extends Service {
    constructor(admin=new Admin()) {
        super("admins", "adminActivity");
        this.admin = admin;

    }
    async resetPassword() {
        const {
            email
        } = this.admin;
        return AsyncFunction(
            async () => {
                if (!email) throw new Error("email is Empty");
                return await this.Auth.resetPassword(email);
            }
        )
    }
    async add() {
        return AsyncFunction(
            async () => {
                const adminadd = await this.Auth.addnew(this.admin);
                this.admin.auth_data = adminadd;
                this.admin.aid = adminadd.uid;
                await this.Store.addwithIDDoc(this.admin.aid, this.admin.firebasedata);
                activity.data = {
                    aid: adminadd.uid,
                    title: "Add New Admin",
                    aid: this.admin.aid,
                    description: `Add new Admin by sdsdsd at  ${new Date().toISOString()}`
                }
                await this.Db.AddNesetedDoc(this.admin.aid, activity.data, activity.title)
                return this.admin.data;
            }
        )
    }
    async edit(data) {
        return AsyncFunction(
            async () => {
                this.admin.auth_data = await this.Auth.editUser({
                    uid: this.admin.aid,
                    ...data
                });
                this.admin.data = await this.Store.editDoc(this.admin.aid, data);
                return this.admin.data;

            }
        )
    }
    async all() {
        return AsyncFunction(
            async () => {
                const AuthDetails = await this.Auth.getAll();
                const admins = (await this.Store.getAll()).map(ele => {
                    const {
                        id,
                        ...other
                    } = ele;
                    this.admin.data = other;
                    this.admin.auth_data = AuthDetails.find(ele => ele.id === id);
                    this.admin.aid = id;
                    return this.admin.data;
                })
                return admins;
            }
        )
    }
    async delete() {

    }
    async search() {

    }
    async block() {
        return AsyncFunction(async () => {
            this.admin.auth_data = await this.Auth.block(this.admin.aid);
            this.admin.data = await this.Store.editDoc(this.admin.aid, {
                isBlock: true
            });
            return this.admin.data;
        })
    }
    async unblock() {
        return AsyncFunction(async () => {
            this.admin.auth_data = await this.Auth.unblock(this.admin.aid);
            this.admin.data = await this.Store.editDoc(this.admin.aid, {
                isBlock: false
            });
            return this.admin.data;
        })
    }
}


module.exports = {
    ServiceAdmin
};
