const initModels = require("../../models/init-models");
const sequelize = require('../../utils/db-connection').createPool
const responseCode = require('../../utils/response-code')
const moment = require('moment')
const models = initModels(sequelize);
const userWithdraw = async (data) => {
    try {
        var responseObject = {}
        let validateUser = await models.users_balance.findOne({ where: { user_id: data.id }, raw: true })
        if ((validateUser && validateUser.total_balance == 0) || (validateUser && validateUser.total_balance < 0)) {
            responseObject.code = responseCode.LOW_BALANCE;
            responseObject.data = {};
        } else {
            let currTime = moment().unix() * 1000
            let updateAmount = validateUser.total_balance - data.amount
            let validateVersion = await models.users_balance.findOne({ where: { user_id: data.id }, raw: true })
            if(validateVersion.version == validateUser.version){
                await models.users_balance.update({ total_balance: updateAmount, updated_on: currTime,version:validateVersion.version+1, }, { where: { user_id: data.id } })
                let insertData = {
                    from_user_id: data.id,
                    amount: data.amount,
                    txn_type: 'DR',
                    created_at: currTime,
                    status: 'SUCCESS',
                    refs_txn_id:currTime/1000
                }
                models.users_transaction.create(insertData)
                responseObject.code = responseCode.SUCCESS;
                responseObject.data = {};
            }else{
                userWithdraw(data)
            }
        }
        return responseObject
    } catch (error) {
        responseObject.code = responseCode.SOME_INTERNAL_ERROR;
        responseObject.data = {};
    }

    return responseObject
}
module.exports = userWithdraw