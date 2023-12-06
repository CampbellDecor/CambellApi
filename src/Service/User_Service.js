const Authndication = require('./Firebase/Auth.js');
const {
    User
} = require('../Model/Mode/User_Model.js');
const {
    Service,
    AsyncFunction
} = require('./Service.js');

class ServiceUser extends Service {
    constructor(user) {
        super("users");
        this.user = user;

    }
    async resetPassword() {
        const {
            email
        } = this.user;
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
                const useradd = await this.Auth.addnew(this.user.data);
                this.user.auth_data = useradd;
                this.user.uid = useradd.uid;
                this.user.firedata = await this.Store.addwithIDDoc(this.user.uid, this.user.firedata);
                return this.user.data;
            }
        )
    }
    async edit(data) {
        return AsyncFunction(
            async () => {
                this.user.auth_data = await this.Auth.editUser({
                    uid: this.user.uid,
                    ...data
                });
                this.user.firedata = await this.Store.editDoc(this.user.uid, data);
                return this.user.data;

            }
        )
    }
    async all() {
        return AsyncFunction(
            async () => {
                const AuthDetails = await this.Auth.getAll();
                const users = (await this.Store.getAll()).map(ele => {
                    const {
                        id,
                        ...other
                    } = ele;
                    this.user.data = other;
                    this.user.auth_data = AuthDetails.find(ele => ele.id === id);
                    this.user.uid = id;
                    return this.user.data;
                })
                return users;
            }
        )
    }
    async delete() {

    }
    async search() {

    }
    async block() {
        return AsyncFunction(async () => {
            this.user.auth_data = await this.Auth.block(this.user.uid);
            this.user.data = await this.Store.editDoc(this.user.uid, {
                isBlock: true
            });
            return this.user.data;
        })
    }
    async unblock() {
        return AsyncFunction(async () => {
            this.user.auth_data = await this.Auth.unblock(this.user.uid);
            this.user.data = await this.Store.editDoc(this.user.uid, {
                isBlock: false
            });
            return this.user.data;
        })
    }
}

module.exports = {
    ServiceUser
};
