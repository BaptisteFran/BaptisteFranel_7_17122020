const db = require('../models/index');



exports.likePost = (req, res) => {
    return db.wholiked.create({
        userId: req.body.userId,
        PostId: req.body.PostId,
    })
        .then((db) => res.send(db))
        .catch(error => res.status(400).json({ error }))
}

exports.unlikePost = (req, res) => {
    return db.wholiked.destroy({where: { id: req.params.id }})
    .then(() => res.status(200).json({message:"Like supprimé"}))
    .catch(error => res.status(400).json({ error }))
}