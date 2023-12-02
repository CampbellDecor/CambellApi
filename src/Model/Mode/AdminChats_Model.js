exports.OneChat = function (chatid, userid, username, message, time, date) {
    return {
        chatid,
        userid,
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
        get userid() {
            return this.userid;
        },
        set userid(userid) {
            this.userid = userid;
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
                userid,
                username,
                message,
                time,
                date,
                profile
            }
        },
        set data({
            chatid,
            userid,
            username,
            message,
            time,
            date,
            profile
        }) {
            this.chatid = chatid,
                this.userid = userid,
                this.username = username,
                this.message = message,
                this.time = time,
                this.date = date,
                this.profile = profile
        },
        toString() {
            return JSON.stringify({
                chatid,
                userid,
                username,
                message,
                time,
                date,
                profile
            })
        }
    };
}

exports.chattingUsers = function (userid, profile, lastmessage, time) {
    return {

        userid,
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
        get userid() {
            return this.userid;
        },
        set userid(userid) {
            this.userid = userid;
            return this;
        },

        get data() {
            return {

                userid,
                username,
                lastmessage,
                time,
                date,
                profile
            }
        },
        set data({

            userid,
            username,
            lastmessage,
            time,
            date,
            profile
        }) {
            this.userid = userid,
                this.username = username,
                this.lastmessage = lastmessage,
                this.time = time,
                this.date = date,
                this.profile = profile
        },
        toString() {
            return JSON.stringify({
                userid,
                username,
                lastmessage,
                time,
                date,
                profile
            })
        }
    }
}
