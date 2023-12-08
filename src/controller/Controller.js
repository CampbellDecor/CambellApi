<<<<<<< HEAD
const {
    AdminModel
} = require('../Model/admin.js');
exports.httpfun = (req, res, fun) => {
    fun(req, res)
=======
const {AdminModel}=require('../Model/admin.js')
exports.httpfun = (req, res, fun) =>
{
    fun(req)
>>>>>>> parent of 729d73f (admin routes and controller setup)
        .then(result => {
            res.status(200).json(result)
        }).catch(err => {
            console.error(err)
            res.status(404).json(err)
        })
}

exports.adminModel = new AdminModel();
