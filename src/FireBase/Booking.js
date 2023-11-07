const Firebase = require('./Fire');
const FireStore = Firebase.firestore();
const BookingCol = FireStore.collection('bookings');
const BookingHisCol = FireStore.collection('BookingHistory');
const USerCol = FireStore.collection('users');

exports.approveBooking = async (bookcode) => {
    try {
        const booking = BookingCol.doc(bookcode);
        const book = await booking.update({
            status: 'active'
        });
        const bookdetails = await booking.get();
        const {
            eventDate
        } = bookdetails.data();
        const bookingHistory = await BookingHisCol.add({
            bookcode,
            eventdate: eventDate.toDate(),
            approve: book.writeTime.toDate()
        });
        return bookingHistory.id;
    } catch (error) {
        throw error;
    }
}
exports.rejectedBooking = async (bookcode) => {
    try {
        const booking = await BookingCol.doc(bookcode).update({
            status: 'rejected'
        });
        return booking.writeTime.toDate();
    } catch (error) {
        throw error;
    }
}
const allBookings = async () => {
    try {
        const bookingsnap = await BookingCol.get();
        const status = ['pending', 'rejected', 'cancelled', 'active'];
        const bookings = [];
        bookingsnap.forEach(ele => {
            const {
                date,
                eventDate,
                ...other
            } = ele.data();
            bookings.push({
                bookcode: ele.id,
                ...other,
                bookdate: date.toDate(),
                eventDate: eventDate.toDate()
            });
        });
        const bookingDetails = [];
        for (const book of bookings) {
            const {
                userID,
                ...other
            } = book;
            const usersnap = await USerCol.doc(userID).get();
            bookingDetails.push({
                ...other,
                user: {
                    uid: usersnap.id,
                    ...usersnap.data()
                }
            });

        }
        const allbookings = new Map();
        status.forEach(ele => {
            const rex = new RegExp(ele, 'ig');
            allbookings.set(ele, bookingDetails.filter(e => rex.test(e.status)));
        })
        return allbookings;
    } catch (error) {
        throw error;
    }
}

exports.addBooking = async (booking) => {
    try {
        const booking = await BookingCol.add(booking);
        return booking.id;
    } catch (error) {
        throw error;
    }
}
exports.DayBookHistory = async () => {
    try {
        const BookingAssemple = [];
        const DaYHistory = await BookingHisCol.get();
        const bookHis = [];
        const listdate = []
        DaYHistory.forEach(ele => {
            const {
                eventdate,
                ...otherdetails
            } = ele.data();
            bookHis.push({
                hisid: ele.id,
                ...otherdetails,
                eventdate: eventdate.toDate().toLocaleDateString()
            });
            listdate.push(eventdate.toDate().toLocaleDateString());
        })
        const uniqdate = new Set(listdate);
        for (const iterator of uniqdate) {
            BookingAssemple.push({
                date: iterator,
                events: bookHis.filter(ele => ele.eventdate === iterator)
            });

        }
        return BookingAssemple;
    } catch (error) {
        throw error;
    }
}
exports.userBookingCount = async (uid) => {
    try {
        const booking = [];
        const Book = await BookingCol.where('userID', '==', uid).get();
        Book.forEach(ele => {
            const {
                userID,
                status,
                ...other
            } = ele.data();
            if (status !== 'cart') {
                booking.push(other);
            }

        });
        return booking.length;
    } catch (error) {
        throw error;
    }
}

const recentBookings = async () => {
    try {
        const bookings = await BookingCol.get();
        bookings.forEach(ele =>
        {
            console.log(ele.data());
        })
        return  bookings.size;
    } catch (error) {
        throw error;
    }
}

