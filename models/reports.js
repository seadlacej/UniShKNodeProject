const Sequelize = require('sequelize');
const db = require('../core/database');

const Reports = db.define('reports', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    type: Sequelize.STRING,
    geo_coordinates: Sequelize.STRING,
    description: Sequelize.STRING,
    created: Sequelize.STRING,
    updated: Sequelize.STRING,
    status: Sequelize.INTEGER,
    report_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
}, {
    timestamps: false, // Disable automatic timestamp fields
  });

module.exports = Reports;