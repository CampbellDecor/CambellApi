const BookingDoa = require('../FireBase/Booking.js');

exports.DayBookCount = async () =>
{
    try {
        const BookHis = await BookingDoa.DayBookHistory();
        let HistoryCount=[];
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

