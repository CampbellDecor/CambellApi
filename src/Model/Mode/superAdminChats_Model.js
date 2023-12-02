const OneChat = function (chatid, adminid, username, message, time, date) {
    return {
        chatid,
        adminid,
        username,
        message,
        time,
        date,
        profile,
        get time() {
            return this.time;
        },
        set time(time) {
            this.time = time;
            return this;
        },

        get date() {
            return this.date;
        },
        set date(date) {
            this.date = date;
            return this;
        },
        get message() {
            return this.message;
        },
        set message(message) {
            this.message = message;
            return this;
        },
        get username() {
            return this.username;
        },
        set username(username) {
            this.username = username;
            return this;
        },
        get adminid() {
            return this.adminid;
        },
        set adminid(adminid) {
            this.adminid = adminid;
            return this;
        },
        get chatid() {
            return this.chatid;
        },
        set chatid(chatid) {
            this.chatid = chatid;
            return this;
        },
        get data() {
            return {
                chatid,
                adminid,
                username,
                message,
                time,
                date,
                profile
            }
        },
        set data({
            chatid,
            adminid,
            username,
            message,
            time,
            date,
            profile
        }) {
            this.chatid = chatid,
                this.adminid = adminid,
                this.username = username,
                this.message = message,
                this.time = time,
                this.date = date,
                this.profile = profile
        },
        toString() {
            return JSON.stringify({
                chatid,
                adminid,
                username,
                message,
                time,
                date,
                profile
            })
        }
    };
}

const chattingUsers = function (adminid, profile, lastmessage, time) {
    return {

        adminid,
        username,
        lastmessage,
        time,
        date,
        profile,
        get time() {
            return this.time;
        },
        set time(time) {
            this.time = time;
            return this;
        },

        get date() {
            return this.date;
        },
        set date(date) {
            this.date = date;
            return this;
        },
        get lastmessage() {
            return this.lastmessage;
        },
        set lastmessage(lastmessage) {
            this.lastmessage = lastmessage;
            return this;
        },
        get username() {
            return this.username;
        },
        set username(username) {
            this.username = username;
            return this;
        },
        get adminid() {
            return this.adminid;
        },
        set adminid(adminid) {
            this.adminid = adminid;
            return this;
        },

        get data() {
            return {

                adminid,
                username,
                lastmessage,
                time,
                date,
                profile
            }
        },
        set data({

            adminid,
            username,
            lastmessage,
            time,
            date,
            profile
        }) {
            this.adminid = adminid,
                this.username = username,
                this.lastmessage = lastmessage,
                this.time = time,
                this.date = date,
                this.profile = profile
        },
        toString() {
            return JSON.stringify({
                adminid,
                username,
                lastmessage,
                time,
                date,
                profile
            })
        }
    }
}
