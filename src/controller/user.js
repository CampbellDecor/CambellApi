const usermodel = require("../Model/user.js");
exports.adduser = (req, res) => {
    usermodel.add(req).then(
        result => {
            res.status(200).json(result);
        }
    ).catch((error) => {
        console.error(error);
        res.status(404).json(error);
    });


};
exports.getUser = (req, res) => {
    const uid = req.params.uid;
    usermodel.OneUser(uid).then(user => {
        res.status(200).json(user);
    }).catch(err => {
        res.status(404).json(err);
    })
}

exports.getUsers = (req, res) => {
    usermodel.all()
        .then(users => {
            res.status(200).json(users);
        }).catch(err => {
            res.status(404).json(err);
        })
}

exports.blockUser = (req, res) => {
    usermodel.block(req).then(result => {
        res.status(200).json(result)
    }).catch(err => {
        res.status(400).json(err);
    })
};
exports.unblockUser = (req, res) => {
    usermodel.unblock(req)
        .then(result => {
            res.status(200).json(result);
        }).catch(err => {
            console.error(err);
            res.status(404).json(err);
        })
}
exports.filter_block_unblock = (req, res) => {
    usermodel.block_unblock_user(req)
        .then(usermodel => {
            res.status(200).json(usermodel);
        })
        .catch(err => {
            res.status(404).json(err);
        })
}
exports.religion_filter = (req, res) => {
    const religion = req.params.relg;
    usermodel.religions_filter(religion)
        .then(
            resu => {
                res.status(200).json(resu);
            }
        )
        .catch(err => {
            res.status(404).json(err);
        })
}
exports.editUser = (req, res) => {
    usermodel.editUser(req)
        .then(resu => res.status(200).json(resu))
        .catch(err => res.status(404).json(err));
}
exports.UserCount = (req, res) => {
    usermodel.userCount().then(result => {
        res.status(200).json(result);
    }).catch(error => {
            res.status(404).json(error);
        }

    )
}
exports.seachHint = (req, res) => {
    usermodel.userHints()
        .then(result => res.status(200).json(result))
        .catch(error => res.status(404).json(error));
}

exports.search = (req, res) => {
    console.log(req.params.search)
    usermodel.userSearch(req)
        .then(result => res.status(200).json(result))
        .catch(error => {
            res.status(404).json(error);
            console.log(error);
        });

}
exports.userBook = (req, res) => {
    const uid = req.params.uid;
    try {
        usermodel.OneUserBookingHistroy(uid)
            .then(result => {
                res.status(200).json(result);
            }).catch(error =>
            {
                console.error(error)
                res.status(404).json(error);
            })

    } catch (error) {
        throw error;
    }
}

exports.BookUser = (req, res) => {
    usermodel.BookUSerDetails(req)
        .then(result => res.status(200).json(result))
        .catch(error => {
            console.error(error);
            res.status(404).json(error);
        });
}
