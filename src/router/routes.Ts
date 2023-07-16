import express  from 'express';
import user from './User';
import chat from './chat';
import admin from './admin'
const Router=express.Router();

Router.use("/user",user);
Router.use("/chatr",chat);
Router.use("/user",admin);
export default Router;