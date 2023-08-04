const cors = require('cors')
const express = require('express')
const {conectionDB} = require('../database/config')


class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT


        this.paths={
            user:'/api/user',
            auth:'/api/auth'
        }
        this.conectionDb()
        this.middleware()
        this.routes()

    }

    async conectionDb(){
        await conectionDB()
    }
    middleware(){
        this.app.use(cors())
        this.app.use(express.json())
    }
    routes(){
        this.app.use(this.paths.user, require('../routes/user')),
        this.app.use(this.paths.auth, require('../routes/auth'))

    }
    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ', this.port);
        })
    }
}
module.exports = Server