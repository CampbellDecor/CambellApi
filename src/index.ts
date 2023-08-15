import cambellRouter from './router/routes'
import express,{Request,Response} from 'express';
import timeout from 'connect-timeout';

const campellApiApp=express();
campellApiApp.use(timeout('120s'));
campellApiApp.use(express.json());
// Define your routes and other middleware here

// Error handling for timeout
campellApiApp.use((req:Request, res:Response, next:any) => {
  if (!req.timedout) {
    next();
  } else {
    // Respond with an error message or take other actions
    res.status(503).send('Request timed out');
  }
});

//routing
campellApiApp.use("/api",cambellRouter);
campellApiApp.listen(8808,()=>{
    console.log("Hello");
    
})