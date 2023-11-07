const adminmodel = require("../Model/admin.js");
exports.addAdmin = (req, res) => {
    adminmodel.add(req).then(
        result => {
            res.status(200).json(result);
        }
    ).catch(error => {
        res.status(404).json(error);
    })

};
exports.getAdmin = (req, res) => {
    adminmodel.findByID(req).
    then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(404).json(error);
        })
}

exports.getAdmins = (req, res) => {
    adminmodel.all(req)
        .then(admins => {
            res.status(200).json(admins);
        }).catch(error => {
            throw error;
        })
}

exports.deleteAdmin = (req, res) => {

};
exports.blockAdmin = (req, res) => {

};
exports.unblockAdmin = (req, res) => {

}
exports.editAdmin = (req, res) => {

};
exports.AuthAdmin = (req, res) => {
    adminmodel.login(req)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(404).json(error);
        })
};

exports.LogoutAdmin = (req, res) => {
    adminmodel.logout(req)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(404).json(err);
        })
}
exports.SearchAdmin = (req, res) => {

}
