import express  from 'express';
import AdminContoller from '../controller/admin';
const adminController=new AdminContoller();
const Router=express.Router();
Router.post("/all",adminController.getAll);
Router.route("/:id")
        .post(adminController.getById)
        .put(adminController.edit)
        .delete(adminController.delete);

Router.post("/login",adminController.login);
Router.post("/sigout",adminController.logout);

export default Router;