const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Team = sequelize.define('team', {
        idTeam: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        }

    });

    return Team;
}