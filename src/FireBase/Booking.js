const Firebase = require('./Fire');
const FireStore = Firebase.firestore();
const BookingCol = FireStore.collection('bookings');

const approveBooking = async (bookcode) => {
    try {
        const booking = await BookingCol.doc(bookcode).update({
            status: 'active'
        });
        return booking.writeTime.toDate();
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

