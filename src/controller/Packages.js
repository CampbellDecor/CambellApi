const {
    allPack,
    searchByName
} = require("../Model/Packages.js");


exports.all = (req, res) => {
    allPack()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(404).json(err);
        })
}
exports.nameSearch = (req, res) => {
    searchByName(req)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        })
}

exports.add = (req, res) =>
{
    searchByName(req)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        })
}
