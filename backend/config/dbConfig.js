const mysql = require('mysql');


const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '6X$!L5m3DGQ$r*a',
    database: 'groupomania'
});

conn.connect((err) => {
    if(err) throw err;
    console.log('Mysql Connect...')
});

module.exports = {
    conn
}