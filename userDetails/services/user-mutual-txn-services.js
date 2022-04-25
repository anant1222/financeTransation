const initModels = require("../../models/init-models");
const sequelize = require('../../utils/db-connection').createPool
const responseCode = require('../../utils/response-code')
const moment = require('moment')
const models = initModels(sequelize);
const mutualUserTxn = async (data) => {
    try {
        var responseObject = {}
        let validateSenderUser = await models.users_balance.findOne({ where: { user_id: data.from_id },raw:true })
        if (!validateSenderUser) {
            responseObject.code = responseCode.USERS_NOT_EXISTS;
            responseObject.data = {};
            return responseObject
        } else {
            if (validateSenderUser.total_balance == 0 || validateSenderUser.total_balance < 0) {
                responseObject.code = responseCode.LOW_BALANCE;
                responseObject.data = {};
                return responseObject
            }
            let validateRecevierUser = await models.users_balance.findOne({ where: { user_id: data.to_id },raw:true })
            if (!validateRecevierUser) {
                responseObject.code = responseCode.USERS_NOT_EXISTS;
                responseObject.data = {};
                return responseObject
            }
            let currTime = moment().unix() * 1000
            let commission = 2 / 100 * data.amount
            let updateSenderAmount = validateSenderUser.total_balance - data.amount
            let updateRecevierAmount = validateRecevierUser.total_balance + (data.amount - commission)
            let validateSenterVersoin = await models.users_balance.findOne({ where: { user_id: data.from_id },raw:true })
            if(validateSenterVersoin.version != validateSenderUser.version){
                mutualUserTxn(data)
            }
            models.users_balance.update({ total_balance: updateSenderAmount, updated_on: currTime,version:validateSenterVersoin.version+1 }, { where: { user_id: data.from_id } })
            let insertSenderData = {
                from_user_id: data.from_id,
                amount: data.amount,
                txn_type: 'DR',
                created_at: currTime,
                status: 'SUCCESS',
                refs_txn_id:currTime/1000
            }
            models.users_transaction.create(insertSenderData)
            models.users.update({ total_balance: updateRecevierAmount, updated_on: currTime,version:validateRecevierUser.version+1 }, { where: { user_id: data.to_id } })
            let insertRecevierData = {
                user_id: data.to_id,
                amount: data.amount,
                txn_type: 'CR',
                created_at: currTime,
                status: 'SUCCESS',
                refs_txn_id:currTime/1000
            }
            models.users_transaction.create(insertRecevierData)
            let adminUserDetails = await models.users_balance.findOne({ where: { user_id: 1 }, raw: true })
            if (adminUserDetails) {
                let admintotalAmount = adminUserDetails.total_balance + commission
                models.users_balance.update({ total_balance: admintotalAmount, updated_on: currTime,version:adminUserDetails.version+1 }, { where: { user_id: 1 } })
                let insertRecevierData = {
                    user_id: 1,
                    amount: commission,
                    txn_type: 'CR',
                    created_at: currTime,
                    status: 'SUCCESS',
                    refs_txn_id:currTime/1000
                }
                models.users_transaction.create(insertRecevierData)
            }
            responseObject.code = responseCode.SUCCESS;
            responseObject.data = {};
            return responseObject
        }
    } catch (error) {
        responseObject.code = responseCode.SOME_INTERNAL_ERROR;
        responseObject.data = {};
    }

    return responseObject
}
module.exports = mutualUserTxn