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
    // adminmodel.login( req )
    //     .then( output =>
    //     {
    //         if ( output?.loginStatus )
    //         {
    //             res.status( 200 ).json( "sucess" );
    //             console.log(output.message);

    //         } else
    //         {
    //             res.status( 404 ).json( "fail" );
    //             console.log(output?.message);
    //        }
    // })
};
