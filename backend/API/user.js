/* eslint-disable */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/index');

exports.register = (req, res) => {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    function isEmailUnique(email, done) {
        db.User.count({ where: { email: email } })
            .then(count => {
                done(count == 0);
            });
    }

    if (regexEmail.test(req.body.email)) {
        isEmailUnique(req.body.email, function (isUnique) {
            if (isUnique) {
                if (regexPassword.test(req.body.password)) {
                    bcrypt.hash(req.body.password, 10)
                        .then(hash => {
                            let hashPassword = hash
                            return db.User.create({
                                name: req.body.name,
                                surname: req.body.surname,
                                email: req.body.email,
                                password: hashPassword,
                                rights: req.body.rights
                            })
                                .then((db) => res.send(db))
                                .catch(error => res.status(400).json({ error }))
                        })
                } else {
                    res.status(500).json({ message: "Mauvais format de mot de passe" })
                }
            } else {
                res.status(500).json({ message: "L'adresse mail n'est pas unique !" })
            }
        })
    } else {
        res.status(500).json({ message: "Mauvais format d'email'" })
    }
}

exports.login = (req, res, next) => {
    return db.User.findOne({ where: { email: req.body.email } })
        .then((user) => {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (err) {
                    console.log(err);
                    return res.status(401).json({ err })
                }
                if (result) {
                    return res.status(200).json({
                        userId: user.id,
                        surname: user.surname,
                        username: user.surname + "." + user.name,
                        rights: user.rights,
                        token: jwt.sign(
                            { userId: user.id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' })
                    })
                }
            })
        })
}

exports.getusers = (req, res, next) => {
    return db.User.findAll()
        .then((users) => { res.status(200).json(users) })
        .catch((error) => { res.status(400).json({ error: error }) })
}

exports.getOneUser = (req, res) => {
    return db.User.findAll({ where: { id: req.params.id } })
        .then((user) => { res.status(200).json(user) })
        .catch((error) => {
            res.status(400).json({ error: error })
        })
}

exports.deleteUser = (req, res, next) => {
    return db.User.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Element supprimé" }))
        .catch(error => res.status(400).json({ error }))
}

exports.modifyUser = (req, res, next) => {
    return db.User.update({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
        rights: req.body.rights
    },
        { where: { id: req.params.id } },
    )
        .then((db) => res.send(db))
        .catch(error => res.status(400).json({ error }))
}

