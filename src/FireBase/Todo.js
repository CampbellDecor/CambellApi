const Firebase = require( "./Fire.js" );
const { FieldValue } = require( "firebase-admin/firestore" );
const TodoCol = Firebase.firestore().collection( "todo" );

exports.add = async ( todoid,todo,tasks=[]) =>
{
    try {
        const todoDoc = await TodoCol.doc( todoid );
        await todoDoc.set( todo );
        const actions = await todoDoc.collection( "actions" );
        tasks.forEach( task =>
        {
            actions.add( task );
        })
        return true;
    } catch (error) {
        throw error;
    }
};

const deletetodo =async ( todoid) =>
{
    try
    {
        const todoDoc = await TodoCol.doc( todoid );
       await todoDoc.delete();
        return true;
    } catch (error) {
        throw error;
    }
};

deletetodo( "efdfdsfdfdsfsdfhjhuhjhjh" ).then( console.log );