const BookingDoa = require('../FireBase/Booking.js');
const TodoDoa = require('../FireBase/Todo.js');
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
exports.addTask = async (req) => {
    try {
        const {
            bookid,
            ...task
        } = req.body;
        const TodoAdd = await TodoDoa.addTask(bookid, {
            ...task,
            createDate: new Date()
        });
        return TodoAdd !== undefined;
    } catch (error) {
        throw error;
    }
}
exports.deleteTask = async ({
    bookid,
    taskid
}) => {
    try {
        const Delcol = await TodoDoa.deleteTask(bookid, taskid);
        return Delcol;
    } catch (error) {
        throw error
    }
}

exports.editTask = async (Body) => {
    const {
        bookid,
        taskid,
        ...other
    } = Book;
    try {
        console.log(Body);
        const Edit = await TodoDoa.editTask(bookid, taskid, other);
        return Edit;
    } catch (error) {
        console.log(error)
        throw error;
    }
}
exports.showTask = async ({params}) =>
{
try {
    const Todolist = await TodoDoa.ShowTodo(params.bookid);
    return Todolist??[];
} catch (error) {
    throw error;
}
}
exports.all = async () => {
    try {
        const Bookings = await BookingDoa.all();
        const BookMap = [];
        Bookings.forEach(ele => {
            const {
                eventDate,
                bookDate,
                ...others
            } = ele;
            BookMap.push({
                ...others,
                eventDate: eventDate.toDate().toLocaleDateString(),
                bookDate: bookDate.toDate().toDateString()
            })
        })
        return BookMap;
    } catch (error) {
        throw error;
    }
}

exports.OneBooking = async ({
    params
}) => {
    try {
        const book = await BookingDoa.oneBooking(params.bookid);
        return book;
    } catch (error) {
        throw error;
    }
}
