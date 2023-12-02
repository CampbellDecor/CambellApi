exports.Admin = function (
    aid = '',
    username = '',
    password = '',
    isSuper = false,
    isOnline = false,
    isBlock = false,
    join = '',
    lastOnline = '',
    mobile = '',
    ratings = 0,
    profile = '',
    address = '') {

    return {
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
        address,
        get username() {
            return username;
        },
        get address() {
            return address;
        },
        set address(address) {
            this.address = address
            return this;
        },
        get profile() {
            return profile;
        },
        get mobile() {
            return mobile;
        },
        get password() {
            return password;
        },
        get isOnline() {
            return isOnline;
        },
        get isBlock() {
            return isBlock;
        },
        get isSuper() {
            return isSuper;
        },
        get join() {
            return join;
        },
        get lastOnline() {
            return lastOnline;
        },
        get ratings() {
            return ratings;
        },
        get isBlock() {
            return isBlock;
        },
        set username(username) {
            this.username = username;
            return this
        },
        set mobile(mobile) {
            this.mobile = mobile;
            return this;
        },
        set password(password) {
            this.password = password;
            return this
        },
        set isOnline(isOnline) {
            this.isOnline = isOnline;
            return this
        },
        set isBlock(isBlock) {
            this.isBlock = isBlock;
            return this
        },
        set isSuper(isSuper) {
            this.isSuper = isSuper;
            return this
        },
        set join(join) {
            this.join = join;
            return this
        },
        set profile(profile) {
            this.profile = profile;
            return this
        },
        set lastOnline(lastOnline) {
            this.lastOnline = lastOnline;
            return this
        },
        set ratings(ratings) {
            this.ratings = ratings;
            return this
        },
        set isBlock(isBlock) {
            this.isBlock = isBlock;
            return this
        },
        get aid() {
            return aid;
        },
        get data() {
            return {
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
                profile
            };
        },
        set data({
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
            profile
        }) {
            this.aid = aid,
                this.username = username,
                this.password = password,
                this.isSuper = isSuper,
                this.isOnline = isOnline,
                this.isBlock = isBlock,
                this.join = join,
                this.lastOnline = lastOnline,
                this.ratings = ratings,
                this.mobile = mobile,
                this.profile = profile
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
        get aid() {
            return aid;
        },
        get title() {
            return title;
        },
        get description() {
            return description;
        },
        get date() {
            return date;
        },
        get time() {
            return time;
        },
        set aid(aid) {
            this.aid = aid;
            return this;
        },
        set title(title) {
            this.title = title;
            return this;
        },
        set description(description) {
            this.description = description
            return this;
        },
        set date(date) {
            this.date = date;
            return this;
        },
        set Time(date = new Date()) {
            this.time = date.toLocaleTimeString();
            return this;
        },
        set Date(date = new Date()) {
            this.date = date.toDateString();
            return this;
        },
        set time(time) {
            this.time = time;
            return this;
        },
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
                aid,
                title,
                description,
                date,
                time,
            }
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


