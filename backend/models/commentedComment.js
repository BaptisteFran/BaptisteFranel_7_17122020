const sequelize = require('sequelize');


module.exports = function (sequelize, DataTypes) {
    var commentedComment = sequelize.define('commentedComment', {
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
    commentedComment.associate = function (models) {
        commentedComment.belongsTo(models.comment)
    }

    return commentedComment;

}


