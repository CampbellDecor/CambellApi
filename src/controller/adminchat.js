const AdminchatModel = require('../Model/adminchats');

exports.chatlist = (req, res) =>
{
    AdminchatModel.adminchatlist(req)
        .then(
            result => { res.status(200).json(result) }
    )
        .catch(error =>
        {
        res.status(200).json(error)
    })
}
