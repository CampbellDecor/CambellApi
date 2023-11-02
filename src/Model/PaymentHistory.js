const PaymentHistoryModel = require('../FireBase/PatmentDB');

exports.DayHistory = async (req = null) => {
    try {
        const date = req.params?.date;
        const XY = [
            [],
            []
        ];
        const Day = await PaymentHistoryModel
            .DayHistory(date.replaceAll('-', '/'));
        XY[0] = [...Day.keys()];
        for (let index = 0; index <= 24; index++) {
            XY[1].push(Day.get(index).reduce((total, ele) => total + ele.payment, 0));

        }
        return XY;
    } catch (error) {
        throw error;
    }
}
exports.MonthHistory = async (req = null) => {
    try {
        const month = req.params.month;
        const XY = [
            [],
            []
        ];
        const Day = await PaymentHistoryModel.MonthHistory(month.replace('-', '/') ?? `${new Date().getMonth() + 1}/${new Date().getFullYear()}`);
        XY[0] = [...Day.keys()];
        for (let index = 1; index <= 31; index++) {
            XY[1].push(Day.get(index).reduce((total, ele) => total + ele.payment, 0));
        }

        return XY;
    } catch (error) {
        throw error;
    }
}
exports.YearHistory = async (req = null) => {
    try {
        const year = req.params.year;
        const XY = [
            [],
            []
        ];
        const Day = await PaymentHistoryModel.YearHistory(year ?? new Date().getFullYear());
        XY[0] = [...Day.keys()];
        for (let index = 1; index <= 12; index++) {
            XY[1].push(Day.get(index).reduce((total, ele) => total + ele.payment, 0));

        }
        return XY;
    } catch (error) {
        throw error;
    }
}
