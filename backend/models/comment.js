const sequelize = require('sequelize');


module.exports = function (sequelize, DataTypes) {
    var comment = sequelize.define('comment', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    })

    comment.associate = function (models) {
        comment.belongsTo(models.Post)
        comment.hasMany(models.commentedComment, { as: 'reply' })
    }

    return comment;

}


