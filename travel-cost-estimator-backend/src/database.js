const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'travel_cost',
    'root',
    'sibi2002',
    {
    dialect: 'mysql',
    host: 'localhost'
    }
)

module.exports = sequelize