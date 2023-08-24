const Qrcode = require( "qrcode" );

let data = {
    name: "Thanush",
    email:"thanumahee440@gmail.com"
};
exports.genrateQrtxt = (data) =>
{
    let stJSon = JSON.stringify( data );
            Qrcode.toString( stJSon, { type: "terminal" }, ( code, error ) =>
            {
                if ( error ) return console.log( error );
                console.log(error);
            })
        }

exports.genrateQrfile = (data,filepath="") =>
{
    let stJSon = JSON.stringify( data );

            Qrcode.toFile( filepath, stJSon, ( err ) =>
            {
                if ( err ) return console.log( "error" );
            } );
    

}
exports.genrateQrUrl = (data) =>
{
    let stJSon = JSON.stringify( data );
            Qrcode.toDataURL( stJSon, ( code, err ) =>
            {
                if ( err ) return console.log( err );
                return code;
            })
  }

