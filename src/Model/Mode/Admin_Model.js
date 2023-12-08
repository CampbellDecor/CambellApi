const validator = require('validator');

exports.Admin = function (
    aid = '',
    username = '',
    firstname = '',
    lastname = '',
    email = '',
    password = '',
    isSuper = false,
    isOnline = false,
    isBlock = false,
    join = '',
    lastOnline = '',
    mobile = '',
    ratings = 0,
    profile = '',
    address = '',
    verfied = false) {

    if (email !== '' && !validator.isEmail(email)) throw new TypeError("email is invalid")

    return {
        username,
        password,
        isSuper,
        isOnline,
        isBlock,
        join,
        lastOnline,
        ratings,
        mobile,
        profile,
        address,
        email,
        firstname,
        lastname,
        address,
        verfied,
        get data() {
            return {
                aid: this.aid,
                address: this.address,
                username: this.username,
                password: this.password,
                isSuper: this.isSuper,
                isOnline: this.isOnline,
                isBlock: this.isBlock,
                join: this.join,
                lastOnline: this.lastOnline,
                ratings: this.ratings,
                mobile: this.mobile,
                profile: this.profile,
                email: this.email,
                lastname: this.lastname,
                firstname: this.firstname,
                verfied: this.verfied
            };
        },
        get firebasedata() {
            return {
                address: this.address,
                username: this.username,
                isSuper: this.isSuper,
                isBlock: this.isBlock,
                ratings: this.ratings,
                mobile: this.mobile,
                profile: this.profile,
                email: this.email,
                lastname: this.lastname,
                firstname: this.firstname,
            };
        },
        set data({
            username,
            password,
            isSuper,
            isOnline,
            isBlock,
            ratings,
            mobile,
            profile,
            email,
            firstname,
            lastname,
            address
        }) {
            if (email && !validator.isEmail(email)) throw new TypeError("email is invalid")
            this.username = username ?? "",
                this.password = password ?? "",
                this.isSuper = isSuper ?? false,
                this.isOnline = isOnline ?? false,
                this.isBlock = isBlock ?? false
            this.ratings = ratings ?? 0,
                this.mobile = mobile ?? '',
                this.profile = profile ?? ''
            this.email = email ?? "";
            this.address = address ?? "",
                this.lastname = lastname ?? '',
                this.firstname = firstname ?? ""
        },
        set auth_data({
            join,
            lastOnline,
            verfied
        }) {

            this.join = join ?? "",
                this.lastOnline = lastOnline ?? 'Not Yet'
            this.verfied = verfied ?? false;
        },
        toString() {
            return JSON.stringify({
                aid,
                username,
                password,
                isSuper,
                isOnline,
                isBlock,
                join,
                lastOnline,
                ratings,
                mobile,
                profile,
                email,
                firstname,
                lastname,
                address
            })
        }
    }

}
//admin activity
exports.AdminActivity = function (aid = '', title = '', description = '', date = new Date().toDateString(), time = new Date().toLocaleTimeString()) {
    return {
        aid,
        title,
        description,
        date,
        time,
        set data({
            aid,
            title,
            description,
            date,
            time,
        }) {
            this.aid = aid,
                this.title = title,
                this.description = description,
                this.date = date,
                this.time = time
        },
        get data() {
            return {
                aid:this.aid,
                title:this.title,
                description:this.description,
                date:this.date,
                time:this.time,
            }
        },
        set data({title,description,date,time}) {

                this.aid=aid,
                this.title=title,
                this.description=description,
                this.date = date ?? new Date().toDateString();
                    this.time = time ?? new Date().toLocaleTimeString();

        },
        toString() {
            return JSON.stringify({
                aid,
                title,
                description,
                date,
                time,
            })
        }

    }
}
