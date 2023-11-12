const BookingModel = require('../Model/Booking.js');
exports.editTask = (req, res) => {
    BookingModel.editTask(req.body)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            console.error(error);
            res.status(404).json(error);
        })
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
    BookingModel.all()
        .then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(404).json(error);
        })
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
exports.deleteTask = (req, res) => {
    BookingModel.deleteTask(req.body)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            res.status(404).json(error)
        })
}

exports.getBooking = (req, res) => {
    BookingModel.OneBooking(req)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            res.status(404).json(error)
        })

}

exports.getTasks = (req, res) => {
    BookingModel.showTask(req)
        .then(result => {
            res.status(200).json(result);
        }).catch(error => {
            console.error(error)
            res.status(404).json(error);
        })
}
