import express  from 'express';
import UserContoller from '../controller/user';
const userConttoller=new UserContoller();

const Router=express.Router();
Router.post("/add",userConttoller.add);
Router.post("/",userConttoller.getAll);
Router.route("/:id")
        .post(userConttoller.getById)
        .delete(userConttoller.delete)
        .put(userConttoller.edit);
        
Router.post("/sigin",userConttoller.login);
Router.post("/sigout",userConttoller.logout);
export default Router;