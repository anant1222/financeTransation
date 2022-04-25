const initModels = require("../../models/init-models");
const sequelize = require('../../utils/db-connection').createPool
const responseCode = require('../../utils/response-code')
const moment = require('moment')
// const {  } = require('../dao-manager')
const models = initModels(sequelize);
const getUser = async (data) => {
    try {
        var responseObject = {}
        let res = await models.users.destroy({ where: { id: data.id } })
        if (res) {
            models.users_balance.destroy({ where: { user_id: data.id } })
            responseObject.code = responseCode.SUCCESS;
            responseObject.data = {};
        } else {
            responseObject.code = responseCode.SOME_INTERNAL_ERROR;
            responseObject.data = {};
        }
    } catch (error) {
        responseObject.code = responseCode.SOME_INTERNAL_ERROR;
        responseObject.data = {};
    }

    return responseObject
}
module.exports = getUser