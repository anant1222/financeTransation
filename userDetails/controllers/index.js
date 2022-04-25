'use strict';
const addAdminController = require('./add-admin-controller')
const addUserController = require('./add-user-controller')
const listUserController = require('./get-user-controller')
const updateUserController = require('./update-user-controller')
const deleteUserController = require('./delete-user-controller')
const detailsUserController = require('./details-user-controller')
const userWithdrawController = require('./withdraw-user-controller')
const userDepositController = require('./deposit-user-controller')
const mutualTxnUserController = require('./mututal-txn-user-controller')
module.exports = {
    addAdminController,
    addUserController,
    listUserController,
    updateUserController,
    deleteUserController,
    detailsUserController,
    userWithdrawController,
    userDepositController,
    mutualTxnUserController
}