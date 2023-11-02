const Firebase = require('./Fire');
const FireStore = Firebase.firestore();
const packagetCol = FireStore.collection('packages');
const all =async () =>
{
    try
    {
        const All = [];
    const packj =await packagetCol.get();
        packj.forEach(pack => All.push({ packid: pack.id, ...pack.data() }));
        
} catch (error) {
    throw error;
}

}

all();
