const initModels = require("../../models/init-models");
const sequelize = require('../../utils/db-connection').createPool
const { userDetailsMongoDao } = require('../dao-manager')
const responseCode = require('../../utils/response-code')
const models = initModels(sequelize);
const deleteUserDetails = async (req) => {
    try {
        var responseObject = {}
        let res = await models.users.findOne({ where: { id: req.id }, raw: true })
        if (res) {
            responseObject.code = responseCode.SUCCESS;
            responseObject.data = res
        } else {
            responseObject.code = responseCode.NO_DATA_FOUND;
            responseObject.data = {};
        }
        return responseObject
    } catch (error) {
        responseObject.code = responseCode.SOME_INTERNAL_ERROR;
        responseObject.data = {};
    }

    return responseObject
}
module.exports = deleteUserDetails