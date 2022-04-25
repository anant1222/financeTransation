'use strict';
const addUserService = require('./add-user-services')
const addAdminService = require('./add-admin-services')
const getUserService = require('./get-user-service')
const updateUserService = require('./update-user-service')
const deleteUserService = require('./delete-user-service')
const detailsUserService = require('./details-user-service')
const userWithdrawService = require('./user-withdraw-services')
const userDepositService = require('./user-deposit-services')
const mutualUserTxnService = require('./user-mutual-txn-services')
module.exports = {
    addUserService,
    getUserService,
    addAdminService,
    updateUserService,
    deleteUserService,
    detailsUserService,
    userWithdrawService,
    userDepositService,
    mutualUserTxnService
}