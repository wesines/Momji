'use strict';
const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,

    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models / tables
db.employee = require('../Models/Employee.js')(sequelize, Sequelize);
db.team = require('../Models/Team.js')(sequelize, Sequelize);

db.team.hasMany(db.employee, { onDelete: 'cascade', hooks: true }, { as: "employees" });
db.employee.belongsTo(db.team, { onDelete: 'cascade', hooks: true }, {
    foreignKey: "idTeam",
    as: "team",
});


// db.employee.associate = function (models) {
//     db.employee.belongsTo(models.team, { foreignKey: 'idTeam', as: 'team' })
//     db.team.hasMany(models.employee, { as: "employees" });

// };
module.exports = db;