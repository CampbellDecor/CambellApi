const express =require('express');
import user from './user';
// import chat from './chat';
// import admin from './admin'
const Router=express.Router();

Router.use("/user",user);
// Router.use("/chat",chat);
// Router.use("/admin",admin);
export default Router;