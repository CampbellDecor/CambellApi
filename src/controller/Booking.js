const BookingModel = require('../Model/Booking.js');
//all Booking in one Month
exports.allBooking = (req, res) => {
    BookingModel.all()
        .then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(404).json(error);
        })
};
//Booking Count For One Month every day booking Count
exports.getMonthBookingsSummary = (req, res) => {
    BookingModel.DayBookCount(req)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(
            error => {
                console.log(error);
                res.status(404).json(error);
            }
        )
}
//Recent Bookings
exports.recentBooking = (req, res) => {
    BookingModel.recentBookings()
        .then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(404).json(error);
        })

};
//Booking ByID
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

exports.allTodo = (req, res) => {
    BookingModel.allTasklist()
        .then(result => {

            res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            res.status(404).json(error)
        })
}
exports.approve = (req, res) => {
    BookingModel.Approve(req)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            res.status(404).json(error)
        })
}

exports.reject= (req, res) => {
    BookingModel.RejectBook(req)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            res.status(404).json(error)
        })
}







/* ------------------------------------------ToDo---------------------------------
 */
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


exports.getTasks = (req, res) => {
    BookingModel.showTask(req)
        .then(result => {
            res.status(200).json(result);
        }).catch(error => {
            console.error(error)
            res.status(404).json(error);
        })
}

exports.QrGenrate = (req, res) => {
    BookingModel.Qrgenrate(req)
        .then(result => {
            res.status(200).json(result);
        }).catch(error => {
            console.error(error)
            res.status(404).json(error);
        })
}
