const postCtrl = require('../API/post')
const auth = require('../middleware/auth');
const commentCtrl = require('../API/comment');
const likeCtrl = require('../API/wholiked')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname); // fonction pour renommer le fichier
    }
});


const fileFilter = (req, file, cb) => {
    // reject
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        // accept
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter,
});


module.exports = app => {

    app.get('/api/', auth ,postCtrl.getAllPost);
    app.post('/api/', auth, upload.single('postimage'), postCtrl.createPost);
    app.get('/api/:id', auth, postCtrl.getOnePost);
    app.delete('/api/:id', auth, postCtrl.deletePost);
    app.put('/api/:id', auth, postCtrl.modifyPost);

    // USER POSTS
    app.get('/api/userposts/:id', auth, postCtrl.getUserPosts);
   

    // COMMENTS 

    app.post('/api/postcomment/:id', commentCtrl.createComment);
    app.delete('/api/postcomment/:id', commentCtrl.deleteComment);
    

    // LIKES 
    app.post('/api/like/:id', likeCtrl.likePost);
    app.delete('/api/like/:id', likeCtrl.unlikePost);
}