const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.name.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './upload/');
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
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
