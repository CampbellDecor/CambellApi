const Categorydao = require( "../FireBase/ServiceCategory" );

exports.all = async () =>
{
    try {
        const categories = await Categorydao.allCategory();
        if ( categories.length <= 0 ) throw Error( "Categoies Not Found" );
        else return categories;
    } catch (error) {
        throw error;
    }
}

