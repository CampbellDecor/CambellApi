const {allPack } = require("../Model/Packages.js");


exports.all = (req,res) =>
{
    allPack()
        .then(result =>
        {
            res.status(200).json(result);
        })
        .catch(err =>
        {
        res.status(404).json(err);
    })
}
