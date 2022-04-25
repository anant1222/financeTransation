'use strict';
const responseMessage = require('./response-message');
const responseCode = require('./response-code');
const moment = require('moment');

module.exports = class utils {
    constructor() {
    }
    static response(code, data, message) {

        let returnObj = {
            code: code
        };
        if (message) {
            returnObj.message = message;
        } else {
            returnObj.message = responseMessage[code]
        }
        if (data) {
            returnObj.data = data;
        }
        return returnObj;
    }

    static responseFormat(code = 200, data = {}, message = "") {
        return {
            code: code,
            data: data,
            message: message
        };
    }

    static mysqlDate() {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    }
};