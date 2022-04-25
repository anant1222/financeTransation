const initModels = require("../../models/init-models");
const sequelize = require('../../utils/db-connection').createPool
const { userDetailsMongoDao } = require('../dao-manager')
const responseCode = require('../../utils/response-code')
const moment = require('moment')
const models = initModels(sequelize);
const addUserDetails = async (req) => {
    try {
        let responseObject = {}
        let currTime = moment().unix() * 1000
        let insertData = {
            user_id: await userDetailsMongoDao.count() + 1,
            user_name: req.user_name,
            first_name: req.first_name,
            last_name: req.first_name,
            mobile: req.mobile,
            desc: req.desc,
            ct: currTime
        }
        // let res = await userDetailsMongoDao.insert(insertData)
        if (res) {
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
module.exports = addUserDetails