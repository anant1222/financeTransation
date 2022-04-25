const initModels = require("../../models/init-models");
const sequelize = require('../../utils/db-connection').createPool
const responseCode = require('../../utils/response-code')
const moment = require('moment')
// const {  } = require('../dao-manager')
const models = initModels(sequelize);
const getUser = async () => {
    try {
        var responseObject = {}
        let parametres = {
            attributes: [
                'id',
                'user_name',
                'first_name',
                'last_name'
            ],
            where: {
                is_admin: 0
            },
            raw: true
        }
        let res = await models.users.findAll(parametres)
        if (res && res.length > 0) {
            responseObject.code = responseCode.SUCCESS;
            responseObject.data = res;
        } else {
            responseObject.code = responseCode.USERS_NOT_EXISTS;
            responseObject.data = [];
        }
    } catch (error) {
        throw error
    }

    return responseObject
}
module.exports = getUser