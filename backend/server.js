'use strict';
const express = require("express");
const app = express();
const db = require("./models")
const helmet = require("helmet");
const path = require('path');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
})

// parse application/json
app.use(helmet());
app.disable("x-powered-by");
app.use(express.json());
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// ########### USERS ##############
require("./routes/user")(app)

// ########## POSTS ###########
require("./routes/post")(app)



//Server listening
// db.sequelize.sync({force: true}) = reset db
db.sequelize.sync().then(() => {
    app.listen(5000, () => {
        console.log('Server started on port http://localhost:5000...');
    });
});
