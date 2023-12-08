const {
    AdminModel
} = require('../Model/admin.js');
exports.httpfun = (req, res, fun) => {
    fun(req, res)
        .then(result => {
            res.status(200).json(result)
        }).catch(err => {
            console.error(err)
            res.status(404).json(err)
        })
}


exports.adminModel = new AdminModel();
