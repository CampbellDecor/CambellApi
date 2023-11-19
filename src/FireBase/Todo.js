const Firebase = require("./Fire.js");
const FireStore = Firebase.firestore();
const BookingCol = FireStore.collection('bookings');

exports.addTask = async (bookid, task = {}) => {
    try {
        const todoDoc = await BookingCol.doc(bookid).collection('todo').add(task);
        return {
            taskid: todoDoc.id,...task
        };
    } catch (error) {
        throw error;
    }
};

exports.deleteTask = async (bookid, taskid) => {
    try {
        const todoDoc = await BookingCol.doc(bookid).collection('todo').doc(taskid).delete();

        return todoDoc.writeTime !== undefined;
    } catch (error) {
        throw error;
    }
};
exports.editTask = async (bookid, taskid, data) => {
    try {
        const todoDoc = await BookingCol.doc(bookid).collection('todo').doc(taskid);
        await todoDoc.update(data);
        return true;
    } catch (error) {
        throw error;
    }
};
exports.ShowTodo = async (bookid) => {
    try {
        const todoDoc = await BookingCol.doc(bookid).collection('todo').get();
        const todos = [];
        todoDoc.forEach(ele => todos.push({
            taskid: ele.id,
            ...ele.data()
        }));
        return todos ?? [];
    } catch (error) {
        throw error;
    }
}
