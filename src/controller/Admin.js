const {resetpassword} = require("../Model/admin.js");
exports.addAdmin = (req, res) => {
    adminmodel.add(req).then(
        result => {
            res.status(200).json(result);
        }
    ).catch(error => {
        console.error(error)
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
    adminmodel.deleteAdmin(req)
        .then(result => res.status(200).json(result))
        .catch(error => {
            console.error(error);
            res.status(404).json(error);
        })
};
exports.blockAdmin = (req, res) => {
    adminmodel.blockAdmin(req)
        .then(result => res.status(200).json(result))
        .catch(error => {
            console.error(error);
            res.status(404).json(error);
        })
};
exports.unblockAdmin = (req, res) => {
    adminmodel.unblockAdmin(req)
        .then(result => res.status(200).json(result))
        .catch(error => {
            console.error(error);
            res.status(404).json(error);
        })
}
exports.editAdmin = (req, res) => {
    adminmodel.editAdmin(req)
        .then(result => res.status(200).json(result))
        .catch(error => {
            console.error(error);
            res.status(404).json(error);
        })
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
exports.resetpassword = (req, res) => {
    resetpassword(req).then(result => res.status(200).json(result))
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        });
};


exports.auth = (req,res) =>
{
    adminmodel.auth()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(404).json(error);
        })
}
