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

exports.deleteBooking = (req, res) => {

};
exports.blockBooking = (req, res) => {

};
exports.unblockBooking = (req, res) => {

}
exports.editBooking = (req, res) => {

}
