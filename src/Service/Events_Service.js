const { Store } = require('./Firebase/FireStore.js');

const EventDao = function ()
{
    this.EventStore = new Store('events');
}

EventDao.prototype.addEvent = async function(data)
{
    try {
      return  await this.EventStore.addDoc(data)
    } catch (error) {
        throw error;
    }
}
module.exports={EventDao}
