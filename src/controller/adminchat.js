const AdminchatModel = require('../Model/adminchats');

exports.chatlist = (req, res) => {
    AdminchatModel.adminchatlist(req)
        .then(
            result => {
                res.status(200).json(result)
            }
        )
        .catch(error => {
            res.status(200).json(error)
        })
}
exports.unreadcount = (req, res) => {
    AdminchatModel.unreadmessages()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(
            err => {
                res.status(404).json(err);
            }
        )
}

exports.chatssender = (req, res) => {
    AdminchatModel.Chats(req)
        .then(
            result => {
                res.status(200).json(result);
            }
        )
        .catch(
            error => {
                res.status(404).json(error);
            }
        )
}
