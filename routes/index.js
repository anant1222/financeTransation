'use strict';
const userDetails = require('../userDetails');
module.exports = function(app) {
    app.use('/api/v1',userDetails);
    app.get("/api/v1/user/server_time", function (req, res, next) {
        res.json({serverTime: Date.now()});
    });
};
  