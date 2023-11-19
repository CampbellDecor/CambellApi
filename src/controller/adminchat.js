const {
    send,
    chatlist,
    chats,
    search
} = require("../Model/adminchats.js");

exports.send = (req, res) => {
    send(req)
        .then(response => {
            res.status(200).json(response)
        }).catch(err => {
            console.error(err)
            res.status(404).json(err);
        })
}

exports.list = (req, res) => {
    chatlist(req)
        .then(response => {
            res.status(200).json(response)
        }).catch(err => {
            console.error(err);
            res.status(404).json(err);
        })
}

exports.chats = (req, res) => {
    chats(req)
        .then(response => {
            res.status(200).json(response)
        }).catch(err => {
            res.status(404).json(err);
        })
}

exports.Searchadmin = (req, res) => {
    console.log(req.params)
    search(req)
        .then(response => {
            res.status(200).json(response)
        }).catch(err => {
            console.log(err);
            res.status(404).json(err);
        })
}
