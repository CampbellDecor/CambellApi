const express = require('express');
const {
<<<<<<< HEAD
    add,
    all,
    remove,
    update
} = require('../controller/Packages.js');

const Router = express.Router();
Router.post("/", add);
Router.get("/", all);
Router.put("/", update);
Router.delete("/", remove);
=======
    all,nameSearch
} = require("../controller/Packages.js");

const Router = express.Router();
Router.get("/", all);
Router.get('/:packname',nameSearch)
>>>>>>> parent of 33d4145 (reset project)
module.exports = Router;
