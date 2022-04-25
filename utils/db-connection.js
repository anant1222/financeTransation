'use strict';
const Sequelize = require('sequelize');
const config = require("../config/dbconfig").development;
const chalk = require('chalk');
const createPool = new Sequelize(config.database.database, config.database.user,
    config.database.password, {
    //timezone: '+05:30', //here you can pass timezone
    host: config.database.host,
    dialect: 'mariadb',
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
createPool.authenticate()
    .then(() => {
        console.log(chalk.green('Mysql Connection has been established successfully for pool.'));
    })
    .catch(err => {
        console.log(chalk.red('Unable to connect to the pool database: ', err));
        throw new Error('mysql error: Connection Failure');
    })


module.exports = {
    createPool
};
