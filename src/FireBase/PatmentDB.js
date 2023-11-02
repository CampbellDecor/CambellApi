const FireBase = require('./Fire');
const FireStore = FireBase.firestore();
const PayHistory = FireStore.collection('PaymentDBHistory');

exports.add = async (payment, type = 'income') => {
    try {
        const PH = await PayHistory.add({
            dateTime: new Date(),
            payment,
            type
        })
        return PH.id;
    } catch (error) {
        throw error;
    }
}
exports.DayHistory = async (day = new Date().toLocaleDateString()) => {
    try {
        const PayHis = await PayHistory.get();
        const His = [];
        PayHis.forEach(ele => {
            if (ele.data().dateTime.toDate().toLocaleDateString() === day) {
                His.push({
                    payment: ele.data().payment,
                    dateTime: ele.data().dateTime.toDate()
                })
            }

        });
        const HrsHis = new Map();
        for (let index = 0; index <= 24; index++) {
            HrsHis.set(index, His.filter(ele => ele.dateTime.getHours() === index) ?? []);

        }
        return HrsHis;
    } catch (error) {
        throw error;
    }
}

exports.MonthHistory = async (month = `${new Date().getMonth() + 1}/${new Date().getFullYear()}`) => {
    try {
        const regx = new RegExp(month, 'ig');
        const PayHis = await PayHistory.get();

        const His = [];
        const DayHis = new Map();
        PayHis.forEach(ele => {
            const {
                dateTime,
                payment,
                type
            } = ele.data();
            const DateTime = dateTime.toDate();
            const DateTimeString = `${DateTime.getMonth() + 1}/${DateTime.getFullYear()}`;

            if (regx.test(DateTimeString)) {
                His.push({
                    payment,
                    dateTime: DateTime
                });
            }

        });
        for (let index = 1; index <= 31; index++) {
            DayHis.set(index, His.filter(ele => ele.dateTime.getDate() === index) ?? [])

        }
        return DayHis;

    } catch (error) {
        throw error;
    }
}
exports.YearHistory = async (year = new Date().getFullYear()) => {
    try {
        const PayHis = await PayHistory.get();
        const His = [];
        const DayHis = new Map();
        PayHis.forEach(ele => {
            const {
                dateTime,
                payment,
                type
            } = ele.data();
            const DateTime = dateTime.toDate().getFullYear();

            if (DateTime == year) {
                His.push({
                    payment,
                    dateTime: dateTime.toDate()
                });
            }

        });
        for (let index = 1; index <= 12; index++) {
            DayHis.set(index, His.filter(ele => ele.dateTime.getMonth() + 1 === index) ?? [])

        }
        return DayHis;
    } catch (error) {
        throw error;
    }
}
