const sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true,
            is: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    rights: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
    
});