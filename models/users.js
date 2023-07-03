const Sequelize = require('sequelize');
const db = require('../core/database');

const Users = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: Sequelize.STRING,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    email: Sequelize.STRING,
    status: Sequelize.INTEGER,
    created: Sequelize.STRING,
    updated: Sequelize.STRING,
    role: Sequelize.INTEGER,
}, {
    timestamps: false, // Disable automatic timestamp fields
  });

module.exports = Users;