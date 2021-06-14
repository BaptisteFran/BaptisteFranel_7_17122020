const sequelize = require('sequelize');


module.exports = function (sequelize, DataTypes) {
    var wholiked = sequelize.define('wholiked', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
    wholiked.associate = function (models) {
        wholiked.belongsTo(models.Post)
    }

    return wholiked;

}


