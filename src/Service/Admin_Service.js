const {
    AdminActivity,
    Admin
} = require('../Model/Mode/Admin_Model.js');
const {
    Service,
    AsyncFunction
} = require('./Service.js');

const activity = AdminActivity();
class ServiceAdmin extends Service {
    constructor(admin = Admin()) {
        super("admins", "adminActivity");
        this.admin = admin;
    }
    async resetPassword (email)
    {
        return AsyncFunction(
            async () => {
                if (!email) throw new Error("email is Empty");
                const { user, resetlink } = await this.Auth.resetPassword(email);
                activity.data = {
                    aid: user.id,
                    title: "Reset Password",
                    description: `Password reset on  ${new Date().toISOString()}`
                };
                await this.Db.AddNesetedDoc(user.id, activity.data, activity.title);
                console.log(resetlink);
                return resetlink;
            }

        );
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
                    description: `Add new Admin  at  ${new Date().toISOString()}`
                };
                await this.Db.AddNesetedDoc(this.admin.aid, activity.data, activity.title);
                return this.admin.data;
            }
        );
    }
    async edit(data) {
        return AsyncFunction(
            async () => {
                this.admin.auth_data = await this.Auth.editUser({
                    uid: this.admin.aid,
                    ...data
                });
                this.admin.data = await this.Store.editDoc(this.admin.aid, data);
                activity.data = {
                    title: "Edit Account",
                    aid: this.admin.aid,
                    description: `Edit Account  at  ${new Date().toISOString()} \n new updates in ${this.admin.toString()}`
                };
                await this.Db.AddNesetedDoc(this.admin.aid, activity.data, activity.title);
                return this.admin.data;

            }
        );
    }
    async all({
        access_token
    }) {
        return AsyncFunction(
            async () => {
                const AuthDetails = await this.Auth.getAll();
                const {
                    uid
                } = await this.Auth.deCodeToken(access_token);
                const admins = (await this.Store.getAll()).map(ele => {
                    const {
                        id,
                        ...other
                    } = ele;
                    this.admin.auth_data = AuthDetails.find(ele => ele.id === id) ?? {};
                    this.admin.data = other;
                    this.admin.aid = id;
                    return this.admin.data;
                });
                const currentuserposition = admins.findIndex(ele => ele.aid == uid);
                admins.splice(currentuserposition, 1);
                return admins;
            }
        );
    }
    async delete() {

    }
    async search() {

    }
    async block(reson) {
        return AsyncFunction(async () => {
            this.admin.auth_data = await this.Auth.block(this.admin.aid);
            this.admin.data = await this.Store.editDoc(this.admin.aid, {
                isBlock: true
            });
            activity.data = {
                title: "Blocked Account",
                aid: this.admin.aid,
                description: `Blocked by at  ${new Date().toISOString()} for ${reson}`
            };
            await this.Db.AddNesetedDoc(this.admin.aid, activity.data, activity.title);
            return this.admin.data;
        });
    }
    async unblock() {
        return AsyncFunction(async () => {
            this.admin.auth_data = await this.Auth.unblock(this.admin.aid);
            this.admin.data = await this.Store.editDoc(this.admin.aid, {
                isBlock: false
            });
            activity.data = {
                title: "UnBlocked Account",
                aid: this.admin.aid,
                description: `unBlocked by $ at  ${new Date().toISOString()}`
            };
            await this.Db.AddNesetedDoc(this.admin.aid, activity.data, activity.title);
            return this.admin.data;
        });
    }
    async sigin({
        email,
        password
    }) {

        return AsyncFunction(async () => {
            const {
                user,
                access_token
            } = await this.Auth.login(email, password);
            // cookie("access_token", access_token, {
            //     expire: 360000 + Date.now()
            // });
            this.admin.auth_data = user;
            this.admin.aid = user.id;
            this.admin.data = await this.Store.findById(this.admin.aid);
            activity.data = {
                title: "Sigin",
                aid: this.admin.aid,
                description: `sigin at  ${new Date().toISOString()}`
            };
            await this.Db.AddNesetedDoc(this.admin.aid, activity.data, activity.title);
            return {
                admin: this.admin.data,
                access_token
            };
        })
    }
    async sigOUt() {
        return AsyncFunction(
            async () => {

                await this.Auth.logout();
                activity.data = {
                    title: "Sigin",
                    aid: this.admin.aid,
                    description: `sigin at  ${new Date().toISOString()}`
                };
                await this.Db.AddNesetedDoc(this.admin.aid, activity.data, activity.title);
                return true;
            }
        )
    }
}


module.exports = {
    ServiceAdmin
};
