const Firebase = require( "./Fire.js" );
const TodoCol = Firebase.firestore().collection( "todo" );


exports.add = async (todoid,task) =>
{
    try {
        const tasks = await TodoCol.doc( todoid ).collection( "actions" );
        let res=false;
        if ( Array.isArray( task ) )
        {
            if ( task.some( task => typeof ( task ) !== 'object' ) ) throw new TypeError( "Array or object Type is allowed" );
            for ( const tas of task )
            {
                    await tasks.add( tas );
                    res = true;  
            }   
        }
        else if ( typeof ( task ) === 'object' )
        {
            await tasks.add( task );
            res = true;
        } else throw new TypeError( "Array or object Type is allowed" );
        
           
        return res;          
            
    } catch (error) {
        throw error;
    }
};

const all = async (todoid,order="duedate") =>
{
    try
    {
        const Tasks = [];
        const tasks =  await TodoCol.doc( todoid ).collection( "actions" ).orderBy( order );
        const snapshot =  await tasks.get();
        snapshot.forEach( task => Tasks.push( { taskid: task.id, ...task.data() } ) );
        return Tasks;

    } catch (error) {
        throw error;
    }
};
const deletetask = async (todoid,actionid) =>
{
    try
    {
        const tasks = await TodoCol.doc( todoid ).collection( "actions" ).doc( actionid );
        if (! (await tasks.get() ).exists) {
            throw Error( "Not found" );
        }
        await tasks.delete();
        return true;

    } catch (error) {
        throw error;
    }
};
exports.edittask = async (todoid,actionid,data) =>
{
    try
    {
        const tasks = await TodoCol.doc( todoid ).collection( "actions" ).doc( actionid );
        if (! (await tasks.get() ).exists) {
            throw Error( "Not found" );
        }
        if ( typeof ( data ) !== 'object' ) throw TypeError( "Object type is allowed" );
        await tasks.update( data );
        return true;

    } catch (error) {
        throw error;
    }
};


