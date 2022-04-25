var DataTypes = require("sequelize").DataTypes;
var _users = require("./users");
var _users_balance = require("./users_balance");
var _users_transaction = require("./users_transaction");

function initModels(sequelize) {
  var users = _users(sequelize, DataTypes);
  var users_balance = _users_balance(sequelize, DataTypes);
  var users_transaction = _users_transaction(sequelize, DataTypes);


  return {
    users,
    users_balance,
    users_transaction,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
