const {
    chatListuser,
    sendMessage,
    all

} = require("../Model/userchat.js");

exports.allchat = (req, res) => {
    chatListuser(req).then(chat => {
            res.status(200).json(chat);
        })
        .catch(err => {
            console.log(err)
            res.status(404).json(err);
        })
}

exports.send = (req, res) => {
    sendMessage(req).then(chat => {
            res.status(200).json(chat);
        })
        .catch(err => {
            res.status(404).json(err);
        })
}

exports.all = (req, res) => {
    all(req).then(chat => {
            res.status(200).json(chat);
        })
        .catch(err => {
            res.status(404).json(err);
        })
}
