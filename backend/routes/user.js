const userCtrl = require('../API/user')
//const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

module.exports = app => {

app.post('/api/register', userCtrl.register)
app.post('/api/login', userCtrl.login)

// ADMIN
app.get('/api/admin/users', admin, userCtrl.getusers)
app.get('/api/admin/users/:id', admin, userCtrl.getOneUser);
app.put('/api/admin/users/:id', admin, userCtrl.modifyUser)
app.delete('/api/admin/users/:id', admin, userCtrl.deleteUser)
}