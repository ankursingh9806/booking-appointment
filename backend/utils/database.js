const Sequelize = require('sequelize');

const sequelize = new Sequelize('booking_appointment', 'root', '#Aaa666aaa', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;