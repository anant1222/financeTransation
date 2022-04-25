const initModels = require("../../models/init-models");
const sequelize = require('../../utils/db-connection').createPool
const responseCode = require('../../utils/response-code')
const moment = require('moment')
const models = initModels(sequelize);
const getUser = async (data) => {
    try {
        var responseObject = {}
        let query = {};
        if (data.user_name) {
            let validateUserName = await models.users.findOne({ where: { user_name: data.user_name }, raw: true })
            if (!validateUserName) query.user_name = data.user_name
            else {
                responseObject.code = responseCode.USER_NAME_ALREADY_EXISTS;
                responseObject.data = {};
                return responseObject
            }

        }
        if (data.first_name) query.first_name = data.first_name
        if (data.last_name) query.last_name = data.last_name

        let attributre = {
            where: {
                id: data.id
            }
        }
        let res = await models.users.update(query, attributre)
        if (res) {
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