const data = require('./userData.json')
    , users_controller = require('./usersCtrl')
    , express = require('express')
    , bodyParser = require('body-parser')
    , chalk = require('chalk')

let app = express()

app.use( bodyParser.json() )

app.get( '/api/users', users_controller.getUsers )
app.get( '/api/users/:id', users_controller.getById )
app.get( '/api/admins', users_controller.getAdmins )
app.get( '/api/nonadmins', users_controller.getNonAdmins )
app.get( '/api/user_type/:type', users_controller.getByType )

app.put( '/api/users/:id', users_controller.updateUser )

app.post( '/api/users', users_controller.addUser )

app.delete( '/api/users/:id', users_controller.deleteUser )







const port = 3000;
const portChalk = chalk.cyan.underline
app.listen( port, () => {
    console.log( portChalk(`Eavesdropping on port ${port}`) )
} )