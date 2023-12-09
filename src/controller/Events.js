const {
    allEvents
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
