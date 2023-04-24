import express from 'express'
import cors from 'cors'
import userRouter from '../routes/user.routes.js'

export class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'

        //Middlewares ( en el constructor van a ejecutarse al levantar el servidor )
        this.middlewares()

       //Rutas
        this.routes()
    }

    middlewares(){
        this.app.use(express.static('public')) //Esto es lo que se va a servir en '/'
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(express.json())
        this.app.use(cors())
    }

    routes(){
        
        this.app.use(this.usuariosPath, userRouter)
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server corriendo en puerto ${this.port}`)
        })
    }
}