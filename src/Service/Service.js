const Auth = require("./Firebase/Auth.js");
const  {FireDB}= require("./Firebase/FireDB.js");
const {Store} = require("./Firebase/FireStore.js");
const AsyncFunction =async(fun) =>
{
    try {
        return await fun();
    } catch (error) {
        throw error
    }
}
class Service
{
    constructor (collection,db=undefined)
    {
        this.Db = new FireDB(db??collection);
        this.Auth = new Auth();
        this.Store = new Store(collection);
    }
    async add()
    {

    }
    async edit()
    {

    }
    async all ()
    {

    }
    async delete ()
    {

    }
    async count ()
    {
        return AsyncFunction(async () =>
        {
            return await this.Store.count();
        })
    }
    async search ()
    {

    }
}

module.exports = { Service,AsyncFunction };
