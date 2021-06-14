const sequelize = require('sequelize');


module.exports = function(sequelize, DataTypes) {
    var post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    authorName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
    },
    likes: {
        type: DataTypes.INTEGER,
    },
    postImage: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

post.associate = function(models) {
    post.hasMany(models.comment, {as: 'commentaire'})
    post.hasMany(models.wholiked, {as: 'wholikes'})
}


return post;

};






