import express  from 'express';
import User from '../controller/user';


const UserController=new User();
const Router=express.Router();
export default Router;