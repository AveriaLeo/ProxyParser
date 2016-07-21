/**
 * Created by leonid on 14.07.16.
 */

var Sequelize = require("sequelize");

module.exports = {
    id:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    query_count: Sequelize.INTEGER,
    status: Sequelize.STRING,
    ip: Sequelize.STRING,
    port: Sequelize.STRING,
    userpass: Sequelize.STRING,
    speed: Sequelize.STRING,
    country: Sequelize.STRING,
    type: Sequelize.STRING,
    anonymous: Sequelize.STRING
};