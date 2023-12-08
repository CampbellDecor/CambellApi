const { httpfun,adminModel} = require('./Controller');
exports.add = (req, res) => {
    httpfun(req, res,adminModel.add)
}
exports.all = (req, res) => {
    httpfun(req, res,adminModel.all)
}
exports.update = (req, res) => {
    httpfun(req, res,adminModel.edit)
}
exports.remove = (req, res) => {
    httpfun(req, res,adminModel.remove)
}
exports.passwordReset = (req, res) =>
{
    httpfun(req, res, adminModel.passwordReset);
}
