const PaymentHistoryModel = require('../Model/PaymentHistory.js')


exports.all = (req, res) => {
    PaymentHistoryModel.allHistory()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => res.status(404).json(err))
}
