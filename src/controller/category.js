const CatModel = require("../Model/ServiceCategory.js");

exports.all = (req, res) => {
    CatModel.all()
        .then(categoies => {n
            res.status(200).json(categoies);
        }).catch(errr => {
            res.status(404).json(errr);
        });
}
