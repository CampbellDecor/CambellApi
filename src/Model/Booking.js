const BookingDoa = require('../FireBase/Booking.js');
const TodoDoa = require('../FireBase/Todo.js');
const userModel = require('../FireBase/User.js');
exports.DayBookCount = async ({
    params
}) => {
    const month = params?.month ?? new Date().getMonth() + 1
    try {
        const BookHis = await BookingDoa.DayBookHistory(month);
        let HistoryCount = [];
        let Date = [];

        BookHis.forEach(ele => {
            Date.push(ele.eventDate);
        });
        const uniqdate = new Set(Date);
        uniqdate.forEach(ele => {
            HistoryCount.push({
                date: ele,
                count: BookHis?.filter(ele1 => ele1.eventDate === ele).length
            })
        })
        return HistoryCount;
    } catch (error) {
        throw error;
    }
}
exports.Approve = async ({
    params
}) => {
    try {
        const result = await BookingDoa.approveBooking(params.bookid);
        return result;
    } catch (error) {
        throw error;
    }
}
//recent Bookings
exports.recentBookings = async () => {
    try {
        const recentBook = await BookingDoa.recentBookings();
        const RecentBooked = [];
        for (const book of recentBook) {
            const {
                userID,
                ...others
            } = book;
            const user = await userModel.OneUser(userID);
            const {
                imgURL,
                name
            } = user;
            RecentBooked.push({
                user: {
                    profile: imgURL,
                    username: name,
                    uid: userID,
                },
                ...others
            })
        }
        return RecentBooked;
    } catch (error) {
        throw error;
    }
}
//Booking ByID
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
//All Booking Details
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
exports.addTask = async (req) => {
    try {
        const {
            bookid,
            ...task
        } = req.body;
        const TodoAdd = await TodoDoa.addTask(bookid, task);
        return TodoAdd ?? {};
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
exports.showTask = async ({
    params
}) => {
    try {
        const Todolist = await TodoDoa.ShowTodo(params.bookid);
        return Todolist ?? [];
    } catch (error) {
        throw error;
    }
}
exports.Qrgenrate = async ({
    params
}) => {
    try {
      return  await  BookingDoa.Qrgenarate(params.bookid);
    } catch (error) {
        throw error
    }
}
