const {
    allEvents,
    addEvents,
    deleteEvent
} = require("../Model/Event.js");


exports.allEvents = (req, res) => {
    allEvents()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.error(err)
            res.status(404).json(err);
        })
}

exports.deleteEvent = (req, res) => {
    deleteEvent(req)
        .then(result => {
            res.status(200).json(result);
        }).catch(err => {
            res.status(404).json(err);
        })
}
exports.addEvents = (req, res) => {
    addEvents(req)
        .then(result => {
            res.status(200).json(result);
        }).catch(err => {
            res.status(404).json(err);
        })
}
