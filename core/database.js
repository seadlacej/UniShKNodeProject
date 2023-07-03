const Sequelize = require('sequelize');
const {PG_DB, PG_USER, PG_PASSWORD, PG_HOST, PG_PORT} = require('./constants');

const sequelize = new Sequelize(
    PG_DB,
    PG_USER,
    PG_PASSWORD,
    {
        host: PG_HOST,
        port: PG_PORT,
        dialect: 'postgres',
    }
);

module.exports = sequelize;
