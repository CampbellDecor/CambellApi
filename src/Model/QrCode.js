const Qrcode = require( "qrcode" );


exports.genrateQrtxt = (data) =>
{
    let stJSon = JSON.stringify( data );
            Qrcode.toString( stJSon, { type: "terminal" }, ( code, error ) =>
            {
                if ( error ) return console.log( error );
                console.log(error);
            })
        }

exports.genrateQrfile = async (data,filepath="") =>
{
    let stJSon = JSON.stringify( data );

            Qrcode.toFile( filepath, stJSon, ( err ) =>
            {
                if ( err ) return console.log( "error" );
            } );


}
exports.genrateQrUrl =async (data) =>
{
    let stJSon = JSON.stringify( data );
            Qrcode.toDataURL( stJSon, ( code, err ) =>
            {
                if ( err ) return console.log( err );
                return code;
            })
  }
