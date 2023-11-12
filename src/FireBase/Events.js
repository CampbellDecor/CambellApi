const Firebase = require('./Fire');
const FireStore = Firebase.firestore();
const eventCol = FireStore.collection('events');
exports.all = async () =>
{
    try {
        const result = []
        const eventsSnap = await eventCol.get();
        eventsSnap.forEach(event =>
        {
            result.push({
                eventid: event.id,
                ...event.data(),
                added: new Date(event.createTime.toDate()).toLocaleDateString()
            });
        });
        return result;
    } catch (error) {
        throw error;
    }
}
exports.add = async (data) => {
    try {
        const result = await eventCol.add(data);
        return result.id;
    } catch (error) {
        throw error;
    }
}
exports.edit = async (eventcode,data) => {
    try {
        const result = await eventCol.doc(eventcode).update(data);
        return result.writeTime;
    } catch (error) {
        throw error;
    }
}
exports.deleteEvent = async (eventcode) => {
    try {
        const result = await eventCol.doc(eventcode).delete();
        return result.writeTime;
    } catch (error) {
        throw error;
    }
}
exports. SelectEventById= async (eventcode) => {
    try {
        const result = await eventCol.doc(eventcode).get();
        return{eventid:result.id,...result.data()}
    } catch (error)
    {
        throw error;
    }
}
exports.search = async (searchtext) => {
    try
    {
        const regx = new RegExp(searchtext, 'ig');
        const result = []
        const eventSnap = await eventCol.get();
        eventSnap.forEach(e => result.push({ eventcode: e.id, ...e.data() }));
        return result.filter(e => regx.test(e.name));
    } catch (error) {
        throw error;
    }
}
exports.count = async () => {
    try {
        const result = await eventCol.get();
        return result.size;
    } catch (error) {
        throw error;
    }
}



