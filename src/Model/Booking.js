const BookingDoa = require('../FireBase/Booking.js');
const userModel = require('./user.js');
exports.DayBookCount = async () => {
    try {
        const BookHis = await BookingDoa.DayBookHistory();
        let HistoryCount = [];
        BookHis.forEach(ele => {
            HistoryCount.push({
                eventdate: ele.date,
                count: ele.events.length
            });
        });
        return HistoryCount;
    } catch (error) {
        throw error;
    }
}
exports.recentBookings = async () => {
    try {
        const recentBook = await BookingDoa.recentBookings();
        const RecentBooked = [];
        for (const book of recentBook) {
            const {
                userID,
                paymentAmount,
                name,
                eventDate
            } = book;
            const user = await userModel.OneUser(userID);
            const {
                profile,
                username
            } = user;
            RecentBooked.push({
                profile,
                username,
                uid: userID,
                payment: paymentAmount,
                eventName: name,
                eventdate: eventDate?.toDate()?.toLocaleDateString()
            })
        }
        return RecentBooked;
    } catch (error) {
        throw error;
    }
}
