const express = require('express');
const routes = express.Router();
const validation = require('./requests')
const controller = require('./controllers');

// user's related api's

//users listing
routes.get("/user/list", controller.listUserController);

// update user
routes.post("/user/update",validation.updateUserDetails, controller.updateUserController);

// delete user
routes.get("/user/delete/:id", controller.deleteUserController);

// user details
routes.get("/user/details/:id", controller.detailsUserController);



// admin related api's

// create admin
routes.post("/admin/add",validation.userDetails, controller.addAdminController);

// admin create user
routes.post("/user/add",validation.userDetails, controller.addUserController);



// ******************** transations *******************

// withdraw
routes.post("/user/withdraw", controller.userWithdrawController);

// deposit
routes.post("/user/deposit", controller.userDepositController);

// mutual transaction
routes.post("/user/mutual/txn", controller.mutualTxnUserController);


// login related api

// routes.post("/user/login");
module.exports = routes;