const PaymentHistoryModel = require('../FireBase/PatmentDB');

exports.allHistory = async () => {
    try {
        return await PaymentHistoryModel.all() ?? [];
    } catch (error) {
        throw error;
    }
}
