exports.Admin = function ({
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
    address = ''
}) {

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
        get aid ()
        {
            return aid;
        }
        get User() {
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
