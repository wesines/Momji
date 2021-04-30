const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Employee = sequelize.define('employee', {
        idEmployee: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: DataTypes.INTEGER
        },
        profile: {
            type: DataTypes.JSON
        },
        email: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        registered: {
            type: DataTypes.STRING
        },
        isActive: {
            type: DataTypes.BOOLEAN
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        }
    });

    return Employee;
}