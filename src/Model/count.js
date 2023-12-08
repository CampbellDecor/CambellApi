const {usercount}=require('../FireBase/User.js')
const {bookcountall}=require('../FireBase/Booking.js')

const count =async () =>
{
    try {
        const resu =await Promise.all([usercount(), bookcountall()])
        return resu;
    } catch (error) {
throw error
    }
}
count().then(console.log).catch(console.error)
