const ServiceModel = require("../Model/Service.js");
exports.addService = (req, res) => {
    ServiceModel.addService(req.body)
        .then(result => res.status(200).json(result))
        .catch(result => {
            console.error(result)
            res.status(404).json(result);
        })
};
exports.addCategory = (req, res) => {
    ServiceModel.addCategory(req)
        .then(result => res.status(200).json(result))
        .catch(result => {
            console.error(result)
            res.status(404).json(result);
        })
};
exports.getService = (req, res) => {
    const serviceId = req.params.serviceId;
    ServiceModel.OneService(serviceId)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(
            err => {
                console.error(err)
                res.status(404).json(err);
            }
        )
}

exports.getServices = (req, res) => {
    ServiceModel.all()
        .then(services => {
            res.status(200).json(services);
        }).catch(err => {
            res.status(404).json(err);
        })
}

exports.addServices = (req, res) => {
    ServiceModel.addService(req)
        .then(services => {
            res.status(200).json(services);
        }).catch(err => {
            res.status(404).json(err);
        })
}
