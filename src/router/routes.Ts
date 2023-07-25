import express  from 'express';
import user from './UserRoute';
import chat from './chat';
import admin from './admin'
const Router=express.Router();

Router.use("/user",user);
Router.use("/chatr",chat);
Router.use("/admin",admin);
export default Router;