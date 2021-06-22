const fs = require('fs');
const db = require('../models/index');
const models = require('../models');


exports.getAllPost = (req, res) => {
    return db.Post.findAll({ include: [{ model: models.comment, as: "commentaire", include: [{ model: models.commentedComment, as: "reply" }] }, { model: models.wholiked, as: "wholikes" }] })
        .then((posts) => { res.status(200).json(posts) })
        .catch((error) => { res.status(400).json({ error: error }) })
}

exports.createPost = (req, res) => {
    return db.Post.create({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        authorName: req.body.authorName,
        content: req.body.content,
        "likes": 0,
        postImage: req.file.path,
    })
        .then((db) => res.send(db))
        .catch(error => res.status(400).json({ error }))
}

exports.getOnePost = (req, res) => {
    return db.Post.findAll({ where: { id: req.params.id }, include: [{ model: models.comment, as: "commentaire", include: [{ model: models.commentedComment, as: "reply" }] }, { model: models.wholiked, as: "wholikes" }] })
        .then((posts) => { res.status(200).json(posts) })
        .catch((error) => {
            res.status(400).json({ error: error })
        })
}

exports.deletePost = (req, res) => {
    db.Post.findAll({ where: { id: req.params.id } })
        .then(() => {
            console.log(req.body.postimg)
            let filename = req.body.postimg.split("upload\\")[1];
            fs.unlink(`upload/${filename}`, () => {
                db.Post.destroy({ where: {id: req.params.id }})
                    .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            })
        }).catch((error) => res.status(500).json({ error }))
}




exports.modifyPost = (req, res) => {
    return db.Post.update({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        content: req.body.content,
    },
        { where: { id: req.params.id } },
    )
        .then((db) => res.send(db))
        .catch(error => res.status(400).json({ error }))
}

exports.getUserPosts = (req, res) => {
    return db.Post.findAll({ where: { author: req.params.id }, include: [{ model: models.comment, as: "commentaire" }, { model: models.wholiked, as: "wholikes" }] })
        .then((posts) => { res.status(200).json(posts) })
        .catch((error) => {
            res.status(400).json({ error: error })
        })
}

