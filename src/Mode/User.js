exports.User = function ({
    uid = '',
    username = '',
    password = '',
    religion = 'unKnown',
    isOnline = false,
    isBlock = false,
    join = '',
    lastOnline = '',
    mobile = '',
    bookCount = 0,
    profile = '',
    address = ''
}) {

    return {
        uid,
        username,
        password,
        religion,
        isOnline,
        isBlock,
        join,
        lastOnline,
        bookCount,
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
        get religion() {
            return religion;
        },
        get join() {
            return join;
        },
        get lastOnline() {
            return lastOnline;
        },
        get Bookcount() {
            return bookCount;
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
        set religion(religion) {
            this.religion = religion;
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
        set Bookcount(Bookcount) {
            this.bookCount = Bookcount;
            return this
        },
        set isBlock(isBlock) {
            this.isBlock = isBlock;
            return this
        },
        get uid() {
           return uid
        },
        set uid(uid) {
            this.uid=uid;
            return this
        },
        get User() {
            return {
                uid,
                username,
                password,
                religion,
                isOnline,
                isBlock,
                join,
                lastOnline,
                bookCount,
                mobile,
                profile
            };
        },
        toString() {
            return JSON.stringify({
                uid,
                username,
                password,
                religion,
                isOnline,
                isBlock,
                join,
                lastOnline,
                bookCount,
                mobile,
                profile,
                address
            })
        }
    }


}
