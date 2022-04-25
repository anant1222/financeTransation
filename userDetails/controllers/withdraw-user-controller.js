'use strict';
const services = require('../services')
const utils = require('../../utils/utils')
const responseCode = require('../../utils/response-code')
const userWithdraw = async (req, res) => {
    let responseObject;
    try {
        let response = await services.userWithdrawService(req.body);
        responseObject = utils.response(response.code, response.data, response.message);
    } catch (error) {
        responseObject = utils.response(responseCode.SOME_INTERNAL_ERROR);
    }
    res.json(responseObject);
};
module.exports = userWithdraw;
