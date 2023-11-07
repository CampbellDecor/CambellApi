const BookingModel = require('../Model/Booking.js');
exports.getRecentBooking = (req, res) => {

}

exports.getBookings = (req, res) => {
    BookingModel.DayBookCount()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(
            error => {
                res.status(404).json(error);
            }
        )
}

exports.allBooking = (req, res) => {
    res.json("jkgfccvc");
};
exports.recentBooking = (req, res) => {
    res.json(7766)

};
exports.addTask = (req, res) => {
    BookingModel.addTask(req)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            console.error(error)
            res.status(404).json(error);
        })
}
exports.editBooking = (req, res) => {

}
