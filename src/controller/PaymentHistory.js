const PaymentHistoryModel = require('../Model/PaymentHistory.js')
exports.YearHistory = (req, res) => {
    PaymentHistoryModel.YearHistory(req)
        .then(result => {
            res.status(200).json(result);
        }).catch(
            error => {
                res.status(404).json(error);
            }
        )

}

exports.DayHistory = async (req, res) => {
    try {
        PaymentHistoryModel.DayHistory(req)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(
                err => {
                    res.status(404).json(err);
                }
            )
    } catch (error) {
        throw error;
    }
}

exports.MonthHistory = async (req, res) => {
    try {
        PaymentHistoryModel.MonthHistory(req)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(404).json(error);
            })
    } catch (error) {
        throw error;
    }
}
