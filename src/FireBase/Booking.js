const Firebase = require('./Fire');
const FireStore = Firebase.firestore();
const BookingCol = FireStore.collection('bookings');
const BookingHisCol = FireStore.collection('BookingHistory');
const USerCol = FireStore.collection('users');
const Service = require('./Service.js');
const Event = require('../FireBase/Events.js');
const Packages = FireStore.collection("users");

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
//when one booking user details
exports.BookUser = async (uid) => {
    try {
        const Bookuser = await Firebase.auth().getUser(uid);
        const {
            creationTime,
            lastSignInTime
        } = Bookuser.metadata
        const Time = {};
        Time.join = new Date(creationTime).toDateString();
        Time.isOnline = new Date(lastSignInTime) > new Date();
        const BookDoc = await USerCol.doc(uid).get();
        const {
            name,
            imgURL,
            address,
            phoneNo,
            email
        } = BookDoc.data();
        const bookcountusers = (await BookingCol.where('userID', '==', uid).get()).size;
        return {
            username: name,
            profile: imgURL,
            address,
            mobile: phoneNo,
            ...Time,
            email,
            No_book: bookcountusers
        };
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
//recent 10 booking pending and active stage
exports.recentBookings = async () => {
    try {
        const bookingsDoc = await BookingCol.where('status', 'in', ['active', 'pending']).limit(8).get();
        const RecentSnap = [];
        bookingsDoc.forEach(ele => {
            const {
                name,
                eventDate,
                date,
                status,
                userID
            } = ele?.data() ?? {}
            RecentSnap.push({
                bookid: ele.id,
                eventDate: eventDate.toDate().toLocaleDateString(),
                bookdate: eventDate.toDate(),
                name,
                status,
                userID
            });
        });

        return RecentSnap.sort((ele1, ele2) => ele1.bookdate - ele2.bookdate);
    } catch (error) {
        throw error;
    }
}
//book by id one booking
exports.oneBooking = async (bookid) => {
    try {
        const book = await BookingCol.doc(bookid);
        const bookDetails = await book.get();
        if (bookDetails?.data()) {
            const {
                date,
                eventDate,
                userID,
                paymentAmount,
                status,
                isRated,
                name,
            } = bookDetails.data();
            return {
                bookDate: new Date(date.toDate()).toLocaleDateString(),
                eventDate: new Date(eventDate.toDate()).toLocaleDateString(),
                user: userID,
                payment: paymentAmount,
                name,
                status,
                isRated,
                bookid
            };
        } else {
            return null;
        }

    } catch (error) {
        throw error
    }
}
//for show how many book in a number and month wise show
exports.DayBookHistory = async (month) => {
    try {
        const BookDoc = await BookingCol.where('status', 'not-in', ["cart", "cancelled"]).get();
        const bookings = [];
        BookDoc.forEach(ele => {
            const {
                eventDate,
                status,
                name,
                date
            } = ele.data();
            const dater = new Date(eventDate.toDate());
            if ((dater.getMonth() + 1) === parseInt(month)) {
                bookings.push({
                    bookid: ele.id,
                    eventDate: dater.toLocaleDateString(),
                    status,
                    name,
                    bookdate: date
                })
            }

        })
        return bookings;
    } catch (error) {
        throw error;
    }
}
//booking count
exports.bookcountall = async () => {
    try {
        const bookings = await BookingCol.where('status', 'not-in', ['cart', 'cancelled']).get();
        return await bookings.size;

    } catch (error) {
        throw error;
    }
}
//one user booking counts
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
            if (status !== 'cart' || status !== 'cancelled') {
                booking.push(other);
            }

        });
        return booking.length;
    } catch (error) {
        throw error;
    }
}
//all Bookings
exports.all = async () => {
    try {
        const allBooking = [];
        const bookings = await BookingCol.get()
        bookings.forEach(ele => {
            const {
                eventDate,
                status,
                date,
                name,
                PaymentAmount,
                userID,
            } = ele.data();
            if (status !== 'cart' && eventDate) {
                allBooking.push({
                    bookid: ele.id,
                    eventname: name ?? "unknown",
                    eventDate,
                    bookDate: date,
                    status,
                    user: userID,
                    paid: PaymentAmount !== undefined

                });
            }
        })
        return allBooking;
    } catch (error) {
        throw error
    }
}

exports.deleteTask = async (bookid, taskid) => {
    try {
        const BookDoc = await BookingCol.doc(bookid).collection('todo').doc(taskid).delete();
        return BookDoc.writeTime;
    } catch (error) {
        throw error;
    }
}


exports.UserBookDetails = async (uid) => {
    try {
        const Bookings = await BookingCol.where('userID', '!=', uid).get();
        const bookings = [];
        Bookings.forEach(ele => {
            const {
                name,
                PaymentAmount,
                eventDate,
                status
            } = ele.data();
            if (status !== 'cart') {
                bookings.push({
                    bookid: ele.id,
                    event: name,
                    payment: PaymentAmount ?? 0,
                    eventDate: eventDate.toDate().toDateString(),
                    status
                });
            }
        })
        return bookings;
    } catch (error) {
        throw error;
    }
}
