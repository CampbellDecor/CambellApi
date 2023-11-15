const Fire = require('./Fire.js')

Fire.firestore().doc("/BookingHistory/etw1Pu4JjXWzbuWmdKq787UOwXz1").get().then(res=>console.log(res.data()))
