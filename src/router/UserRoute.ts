import express  from 'express';
import User from '../controller/user';


const UserController=new User();
const Router=express.Router();

Router.post('/',UserController.addUser);
Router.post('/add',UserController.addUser);
export default Router;