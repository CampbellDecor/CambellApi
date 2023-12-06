const {
    FireStore
} = require('./Fire.js')

const Store = function (collection) {
    this.collection = FireStore.collection(collection);
}
Store.prototype.getAll = async function () {
    if (!this.collection) throw new Error("Collection Parameter is must add")
    try {
        const Doc = await this.collection.get();
        const Modules = [];
        Doc.forEach(module => {
            Modules.push({
                id: module.id,
                ...module.data()
            })
        })
        return Modules ?? []
    } catch (error) {
        throw error;
    }
}

Store.prototype.addDoc = async function (data) {
    if (!data) throw new Error("No Data Here");
    try {
        const module = await this.collection.add(data);
        return {
            id: module.id,
            ...data
        }
    } catch (error) {
        throw error
    }
}
Store.prototype.addwithIDDoc = async function (id, data) {
    if (!id) throw new Error("id is Empty")
    if (!data) throw new Error("data is Empty")
    try {
        const module = await this.collection.doc(id);
        module.set(data);
        return {
            id: module.id,
            ...data
        }
    } catch (error) {
        throw error
    }
}
Store.prototype.editDoc = async function (id, data) {
    if (!id) throw new Error("id is Empty")
    if (!data) throw new Error("data is Empty")
    try {

        await this.collection.doc(id).update(data);
        const module = await this.collection.doc(id).get();
        return {
            id,
            ...module.data()
        }
    } catch (error) {
        throw error
    }
}
Store.prototype.deleteDoc = async function (id) {
    if (!id) throw new Error("id is Empty")
    try {
        await this.collection.doc(id).delete();
        return id
    } catch (error) {
        throw error
    }
}
Store.prototype.count = async function ()
{
    try {
        const data = await this.collection.get();
        return data.size??0
    } catch (error) {
        throw error;
    }
}
Store.prototype.find = async function (field, value,operator)
{
    try
    {
        const Data = await this.collection.where(field, operator, value).get();
        const Modules = [];
        Data.forEach(module => {
            Modules.push({
                id: module.id,
                ...module.data()
            })
        })
        return Modules ?? []
    } catch (error) {
        throw error;
    }
}

module.exports = { Store };
