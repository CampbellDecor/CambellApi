const fire = require( "../Fire.js" );
const FireStore=require('../FireStore/FireStore.js')
const BookingCollection =new  FireStore( "Bookings" );
exports.getBookings = async () =>
{
    try
    {
        let Bookings = [];
        Bookings = await BookingCollection.getAll();
        return Bookings;
    } catch ( error )
    {
        throw error;
    }
  
};
exports.getBooking = async ( id ) =>
{
    try
    {
        let Booking = {};
        Booking = await BookingCollection.DocumentByID( id );
        return Booking;
    } catch ( error )
    {
        throw error;
    }
};
exports.addBooking = async (BookingElemenent) =>
{
    try {
        let uid = null;
        let Booking = await BookingCollection.addDocument( BookingElemenent );
        uid = Booking;
        return uid;
    } catch (error) {
        throw error;
    }
}
exports.deleteBooking =async ( id ) =>
{
    try {
        const del = await BookingCollection.deleteDoc( id );
        return del;
    } catch (error) {
        throw error;
    }
}
exports.updateBooking =async ( BookingEle,id ) =>
{
    try {
        const edit = await BookingCollection.updateDoc(BookingEle,id);
        return edit;
    } catch (error) {
        throw error;
    }
}
exports.totalBooking = async () =>
{
    try {
        let count = await BookingCollection.countDoc();
        return count;
    } catch (error) {
        throw error;
    }
}

