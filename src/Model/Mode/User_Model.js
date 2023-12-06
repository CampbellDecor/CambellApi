exports.User = function (
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
    address = '',
    verfied = false,
    email = ''
) {

    return {
        uid,
        username,
        religion,
        isOnline,
        isBlock,
        join,
        lastOnline,
        bookCount,
        mobile,
        profile,
        address,
        verfied,
        email,
        get data() {
            return {
                uid: this.uid ?? '',
                email: this.email ?? '',
                username: this.username ?? '',
                religion: this.religion ?? '',
                isOnline: this.isOnline ?? false,
                isBlock: this.isBlock ?? false,
                join: this.join ?? '',
                lastOnline: this.lastOnline ?? 'Notyet',
                bookCount: this.bookCount ?? 0,
                mobile: this.mobile ?? '',
                profile: this.profile ?? ''
            };
        },
        set data({
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
            verfied,
            email
        }) {
            this.username = username,
                this.password = password,
                this.religion = religion,
                this.isOnline = isOnline,
                this.isBlock = isBlock,
                this.join = join,
                this.lastOnline = lastOnline,
                this.bookCount = bookCount,
                this.mobile = mobile,
                this.profile = profile;
            this.verfied = verfied;
            this.email = email;
        },
        set firedata({
            name,
            religion,
            isBlock,
            phoneNo,
            imgURL,
            address,
            email

        }) {
            this.username = name,

                this.religion = religion,
                this.isBlock = isBlock,
                this.mobile = phoneNo,
                this.profile = imgURL;
            this.address = address;
            this.email = email;
        },
        get firedata() {
            return {
                name: this.username,

                religion: this.religion,
                isBlock: this.isBlock,
                phoneNo: this.mobile,
                imgURL: this.profile,
                address: this.address,
                email: this.email
            }
        },
        set auth_data({
            isOnline,
            join,
            lastOnline,
            verfied
        }) {
            this.username = username,
                this.isOnline = isOnline;
            this.join = join,
                this.lastOnline = lastOnline,
                this.verfied = verfied;
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
                address,
                verfied
            });
        }
    };


};
