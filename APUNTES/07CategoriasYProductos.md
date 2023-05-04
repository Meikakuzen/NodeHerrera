# CATEGORIAS Y PRODUCTOS NODEJS HERRERA

## CRUD Y Rutas de categorías

- El endpoint será http://localhost:8080/api/categorías
- Creo el router y los controladores
- categoria.routes.js

~~~js
import {Router} from 'express'
import categoria from '../controllers/categoria.controller.js'


const router = Router()

router.get('/', categoria.getCategorias) //falta implementar el controlador

export default router
~~~

- categoria.controller.js

~~~js
const getCategorias = (req,res)=>{
    res.json({
        msg: "categorias ok"
    })
}

export default{
    getCategorias
}
~~~

- En el server añado el path, importo el router y lo uso

~~~js
import express from 'express'
import cors from 'cors'
import userRouter from '../routes/user.routes.js'
import dbConnection from '../database/config.js'
import authRouter from '../routes/auth.router.js'
import categoriaRouter from '../routes/categoria.routes.js'

export class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
        this.authPath= '/api/auth'
        //path categorias
        this.categoriasPath = '/api/categorias'

        //conexion a la DB
        this.conectarDB()
        
        //Middlewares ( en el constructor van a ejecutarse al levantar el servidor )
        this.middlewares()

       //Rutas
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        this.app.use(express.static('public')) //Esto servirá lo que haya en la carpeta public en '/'
        this.app.use(express.urlencoded({extended: false})) //parseo el body
        this.app.use(express.json())
        this.app.use(cors())
    }

    routes(){
        
        this.app.use(this.usuariosPath, userRouter)
        this.app.use(this.authPath, authRouter)
        //uso el path con el router de categorias
        this.app.use(this.categoriasPath, categoriaRouter )
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server corriendo en puerto ${this.port}`)
        })
    }
}
~~~

- En el categoria.routes voy a usar también el check y el validarCampos
- Faltan el resto de rutas y controladores (POST, PUT, DELETE) y otro GET para solo una categoría y no todas
- Los creo
- categoria.routes.js

~~~js
import {Router} from 'express'
import categoria from '../controllers/categoria.controller.js'
import {check} from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js'



const router = Router()

router.get('/', categoria.getCategorias)
router.get('/:id', categoria.getCategoria)
router.post('/', categoria.addCategorias)
router.put('/:id', categoria.updateCategorias)
router.delete('/:id', categoria.deleteCategorias)


export default router
~~~

- categoria.controller.js

~~~js


const getCategorias = (req,res)=>{
    res.json({
        msg: "getCategorias ok"
    })
}

const getCategoria = (req,res)=>{
    res.json({
        msg: "getCategoria ok"
    })
}

const addCategorias = (req,res)=>{
    res.json({
        msg: "addCategorias ok"
    })
}

const updateCategorias = (req,res)=>{
    res.json({
        msg: "updateCategorias ok"
    })
}

const deleteCategorias = (req,res)=>{
    res.json({
        msg: "deleteCategorias ok"
    })
}

export default{
    getCategorias,
    addCategorias,
    updateCategorias,
    deleteCategorias,
    getCategoria

}
~~~
------

## Modelo Categoria

- Creo el modelo

~~~js