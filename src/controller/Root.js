const Rootmodel = require("../Model/Root.js");

exports.countpanel = async () => {
    try {
        const counts = {
            user: 0,
            booking: 0,
            payment: 0,
            packages: 0
        }
        return counts;
    } catch (error) {
        throw error;
    }
}
exports.religionNames = (req,res) =>
{
    Rootmodel.ReligionNames()
        .then(result => res.status(200).json(result))
    .catch(err => res.status(404).json(err))
}
