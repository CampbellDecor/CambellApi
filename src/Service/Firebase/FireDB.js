const {FirebaseDB}=require('./Fire.js')

const FireDB = function (collection)
{
    this.collection = FirebaseDB.ref(collection);
}
FireDB.prototype.addDoc = async function (data)
{
    if(!data) throw new TypeError('Empty Data!')
try {
    const add = this.collection.push(data);
    console.log(add.key);
} catch (error) {
    throw error;
}
}
FireDB.prototype.DeepaddDoc = async function (id,data) {
    if (!data) throw new TypeError('Empty Data!')
    try {
        const add = this.collection.child(id).push(data);
        console.log(add.key);
    } catch (error) {
        throw error;
    }
}
FireDB.prototype.addWithIDDoc = async function (id,data) {
    try {
        const add =await this.collection.child(id);
        add.set(data);
        return true;
    } catch (error) {
        throw error;
    }
}
FireDB.prototype.getAll = async function ()
{
    try {
        const data = await this.collection.once('value');
        data.toJSON();
        const value = Object.entries(data.val());
        return value.map(val =>
        {
            return {
                id: val[0],
                ...val[1]
            }
        })
    } catch (error) {
        throw error;
    }
}
FireDB.prototype.getDeepAll = async function () {
    try {
        const data = await this.collection.once('value');
        const value = Object.entries(data.val());
        return value.map(val =>
        {
            const values = Object.entries(val[1]).map(e => {
                return {
                    id: e[0],
                    ...e[1]
                }
            })
            const id = val[0]
            return {
                [id]:values
            }
        })
    } catch (error) {
        throw error;
    }
}
FireDB.prototype.deleteDoc = async function (id)
{
    try {
        await this.collection.child(id).remove();
        return id;
    } catch (error) {
        throw error;
    }
}

FireDB.prototype.editDoc = async function (id, data)
{
    try {
       await this.collection.child(id).update(data);
        return {id,...data};
    } catch (error) {
        throw error;
    }
}
FireDB.prototype.findById = async function (id)
{
    try
    {
        const data = await this.collection.child(id);
        return {
            ...(await data.get()).val(),
            id
    };
    } catch (error) {
        throw error;
    }
}

