const jwt = require('jsonwebtoken');
const db = require('../models/index');


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            db.User.findOne(({ where: { id: userId } }))
                .then((user) => {
                    if (user.id == userId && user.rights == 768) {
                        next();
                    } else {
                        res.status(401).json({
                            message: 'Requête non autorisée ! Erreur : ' + error
                        });
                    }
                })
        }
    } catch (error) {
        res.status(401).json({
            message: 'Requête non authentifiée ! Erreur : ' + error
        });
    }
};

