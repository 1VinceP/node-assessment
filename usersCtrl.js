const data = require('./userData.json')

module.exports = {

    getUsers: ( req, res, next ) => {
        var result = []

        if( req.query.age ) {
            for( let i = 0; i < data.length; i++ ) {
                if( data[i].age < req.query.age ) {
                    result.push( data[i] )
                }
            }
        }
        else if( req.query.lastname ) {
            for( let i = 0; i < data.length; i++ ) {
                if( data[i].last_name === req.query.lastname ) {
                    result.push( data[i] )
                }
            }
        }
        else if( req.query.email ) {
            for( let i = 0; i < data.length; i++ ) {
                if( data[i].email === req.query.email ) {
                    result.push( data[i] )
                }
            }
        }
        else if( req.query.favorites ) {
            for( let i = 0; i < data.length; i++ ) {
                for( let j = 0; j < data[i].favorites.length; j++ ) {
                    if( data[i].favorites[j] === req.query.favorites ) {
                        result.push( data[i] )
                    }
                }
            }
        }
        else {
            result = data
        }

        res.status(200).send( result )
    },

    getById: ( req, res, next ) => {
        let result = ''

        for( let i = 0; i < data.length; i++ ) {
            if( data[i].id == req.params.id ) {
                result = {}
                result = data[i]
                res.status(200).send( result )
            }
        }
        if( !result )
            res.status(404).json(null)
    },

    getAdmins: ( req, res, next ) => {
        let result = []

        for( let i = 0; i < data.length; i++ ) {
            if( data[i].type === 'admin' ) {
                result.push(data[i])
            }
        }

        res.status(200).send( result )
    },

    getNonAdmins: ( req, res, next ) => {
        let result = []

        for( let i = 0; i < data.length; i++ ) {
            if( data[i].type !== 'admin' ) {
                result.push(data[i])
            }
        }

        res.status(200).send( result )
    },

    getByType: ( req, res, next ) => {
        let result = []

        for( let i = 0; i < data.length; i++ ) {
            if( data[i].type === req.params.type ) {
                result.push(data[i])
            }
        }

        res.status(200).send( result )
    },

    updateUser: ( req, res, next ) => {
        let result = {}

        for( let i = 0; i < data.length; i++ ) {
            if( data[i].id == req.params.id ) {
                data[i] = req.body
            }
        }

        res.status(200).send( data )
    },

    addUser: ( req, res, next ) => {
        let last = data[data.length-1]
        let nextId = last.id + 1

        req.body.id = nextId
        data.push(req.body)
        nextId++

        res.status(200).send( data )
    },

    deleteUser: ( req, res, next ) => {

        for( let i = 0; i < data.length; i++ ) {
            if( data[i].id == req.params.id ) {
                data.splice( i, 1 )
            }
        }

        res.status(200).send( data )
    }

}