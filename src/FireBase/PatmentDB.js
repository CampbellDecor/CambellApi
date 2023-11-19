const FireBase = require('./Fire');
const FireStore = FireBase.firestore();
const PayHistory = FireStore.collection('paymentDBHistory');
exports.all = async () => {
    try {
        const PayHis = [];
        const payhis = await PayHistory.get();
        payhis.forEach(ele => {
            const {
                price,
                dateTime,
                type
            } = ele.data();
            PayHis.push({
                payid: ele.id,
                price: price ?? 0,
                date: dateTime.toDate().toDateString(),
                type: type ?? "income"
            });
        })
        return PayHis;
    } catch (error) {
        throw error;
    }
}
