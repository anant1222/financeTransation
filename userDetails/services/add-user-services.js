const initModels = require("../../models/init-models");
const sequelize = require('../../utils/db-connection').createPool
const responseCode = require('../../utils/response-code')
const moment = require('moment')
const models = initModels(sequelize);
const addUser = async (data) => {
    try {
        var responseObject = {}
        let validateUserName = await models.users.findOne({ where: { user_name: data.user_name }, raw: true })
        if (validateUserName) {
            responseObject.code = responseCode.USER_NAME_ALREADY_EXISTS;
            responseObject.data = {};
            return responseObject
        }
        let currTime = moment().unix() * 1000
        data.is_admin = 0
        data.updated_on = currTime;
        data.created_at = currTime;
        let res = await models.users.create(data)
        if (res) {
            let balancedata = {
                user_id:res.id,
                total_balance:0,
                version:0,
                updated_on :currTime,
                created_at  :currTime
            }
            models.users_balance.create(balancedata)
            responseObject.code = responseCode.SUCCESS;
            responseObject.data = {};
        } else {
            responseObject.code = responseCode.SOME_INTERNAL_ERROR;
            responseObject.data = {};
        }
        return responseObject
    } catch (error) {
        responseObject.code = responseCode.SOME_INTERNAL_ERROR;
        responseObject.data = {};
    }

    return responseObject
}
module.exports = addUser