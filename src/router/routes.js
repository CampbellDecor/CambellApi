const service = require( "./Service.js" );
const Router=express.Router();
Router.all("/",(res,req)=>{
    
})
Router.use( "/service",service);

module.exports=Router;