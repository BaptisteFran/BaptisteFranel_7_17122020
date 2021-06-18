const db = require('../models/index');



exports.createComment = (req, res) => {
    return db.comment.create({
        author: req.body.author,
        authorId: req.body.authorId,
        PostId: req.body.PostId,
        text: req.body.text,
    })
        .then((db) => res.send(db))
        .catch(error => res.status(400).json({ error }))
}

exports.deleteComment = (req, res) => {
    return db.comment.destroy({where: { id: req.params.id }})
    .then(() => res.status(200).json({message:"Element supprimé"}))
    .catch(error => res.status(400).json({ error }))
}


exports.createCommentedComment = (req, res) => {
    return db.commentedComment.create({
        author: req.body.author,
        authorId: req.body.authorId,
        commentId: req.body.commentId,
        text: req.body.text,
    })
        .then((db) => res.send(db))
        .catch(error => res.status(400).json({ error }))
}

exports.deleteCommentedComment = (req, res) => {
    return db.commentedComment.destroy({where: { id: req.params.id }})
    .then(() => res.status(200).json({message:"Element supprimé"}))
    .catch(error => res.status(400).json({ error }))
}